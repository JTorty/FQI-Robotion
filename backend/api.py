import psycopg2
from psycopg2 import IntegrityError
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def from_dd_to_dms(dec_lon: float, dec_lat: float) -> tuple[tuple[int, int, float], tuple[int, int, float]]:
    """
    Convert a geographical location from <DD.DDDDDD°> format to <DD°MM'SS.SS"> format
    Seconds are rounded up to their 2nd decimal
    """
    lon_degrees = int(dec_lon)
    lon_minutes = int((dec_lon - lon_degrees) * 60)
    lon_seconds = round((dec_lon - lon_degrees - lon_minutes/60) * 3600, 2)
    lat_degrees = int(dec_lat)
    lat_minutes = int((dec_lat - lat_degrees) * 60)
    lat_seconds = round((dec_lat - lat_degrees - lat_minutes/60) * 3600, 2)
    return ((lon_degrees, lon_minutes, lon_seconds), (lat_degrees, lat_minutes, lat_seconds))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:3000",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

conn = psycopg2.connect(database="Robotion",
                        host="localhost",
                        user="postgres",
                        password="password",
                        port="5432")


def get_robot_info(robot_data):
    '''
    Create a JSON compatible dictionary that contains all robots' infos for the FE.
    
    robot_data
        Table raw extracted from the query
    '''
    decimal_lon, decimal_lat = (float(robot_data[3]), float(robot_data[4]))
    lon, lat = from_dd_to_dms(decimal_lon, decimal_lat)
    robot_dict = {
        "model": robot_data[0],
        "status": robot_data[1],
        "battery": robot_data[2],
        "position": {
            "longitude": {
                "degrees": lon[0],
                "minutes": lon[1],
                "seconds": lon[2],
                "decimal": f'{round(decimal_lon, 6):.6f}',
                "pixel": robot_data[5]
            },
            "latitude": {
                "degrees": lat[0],
                "minutes": lat[1],
                "seconds": lat[2],
                "decimal": f'{round(decimal_lat, 6):.6f}',
                "pixel": robot_data[6]
            },
        }
    }
    return robot_dict

@app.get("/getrobot")
async def get_robot(model: str):
    select_query = "SELECT * FROM robots WHERE model = %s;"
    cursor = conn.cursor()
    cursor.execute(select_query, (model,))
    robot_data = cursor.fetchone()
    cursor.close()
    if robot_data:
        return get_robot_info(robot_data)
    else:
        return {"message": "Robot not found."}


@app.get("/getallrobots")
async def get_all_robots():
    select_query = "SELECT * FROM robots;"
    cursor = conn.cursor()
    cursor.execute(select_query)
    robots = cursor.fetchall()
    robot_list = []
    cursor.close()
    for robot_data in robots:
        robot_list.append(get_robot_info(robot_data))

    return robot_list


@app.delete("/deleterobot")
async def delete_robot(model: str):
    delete_query = f"DELETE FROM robots WHERE model='{model}'"
    select_query = f"SELECT model FROM robots WHERE model='{model}'"
    cursor = conn.cursor()
    cursor.execute(select_query)
    if not cursor.fetchone():
        return {"Error": "No such robot"}
    cursor.execute(delete_query)
    conn.commit()
    cursor.close()
    return {"Success": "Robot deleted"}


# for resetting before starting a new session
@app.delete("/resetdatabase")
async def reset_database():
    delete_query = f"DELETE FROM robots"
    cursor = conn.cursor()
    cursor.execute(delete_query)
    conn.commit()
    cursor.close()
    return {"Success": "All rows deleted"}


@app.put("/updatestatus")
async def update_status(model: str, newStatus: str):
    update_query = f"UPDATE robots SET status='{newStatus}' WHERE model='{model}'"
    select_query = f"SELECT model FROM robots WHERE model='{model}'"

    cursor = conn.cursor()
    cursor.execute(select_query)

    if not cursor.fetchone():
        return {"Error": "No such robot"}

    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    return {"Success": "Robot status updated"}


@app.put("/updatebattery")
async def update_status(model: str, newBattery: int):
    update_query = f"UPDATE robots SET battery={newBattery} WHERE model='{model}'"
    select_query = f"SELECT model FROM robots WHERE model='{model}'"

    cursor = conn.cursor()
    cursor.execute(select_query)

    if not cursor.fetchone():
        return {"Error": "No such robot"}

    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    return {"Success": "Robot battery updated"}


@app.post("/addrobot")
async def add_robot(model: str, status: str, battery: int, latitude: float, longitude: float, x_pixel: int, y_pixel: int):
    count_query = "SELECT COUNT(*) FROM robots"
    insert_query = "INSERT INTO robots (model, status, battery, longitude, latitude, x_pixel, y_pixel) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor = conn.cursor()
    cursor.execute(count_query)

    if cursor.fetchone()[0] >= 10:
        return {"Error": "Robot limit reached"}

    try:
        cursor.execute(insert_query, (model, status, battery,
                       latitude, longitude, x_pixel, y_pixel))
        conn.commit()
        cursor.close()
    except IntegrityError as err:
        print(err)
        return {"Error": "Primary key violation"}

    return {"Success": "Robot added"}


@app.put("/updateposition")
async def update_position(model: str, longitude: float, latitude: float, x_pixel: int, y_pixel: int):
    try:
        # Retrieve the robot coordinates from the database using the provided ID
        cursor = conn.cursor()
        cursor.execute("SELECT model FROM robots WHERE model = %s", (model,))

        # Fetch the first row of the result
        result = cursor.fetchone()

        if result:
            cursor.execute(
                "UPDATE robots SET longitude = %s, latitude = %s, x_pixel = %s, y_pixel = %s WHERE model = %s",
                (longitude, latitude, x_pixel, y_pixel, model)
            )
            conn.commit()

            # Return the updated robot coordinate as the response
            return {"new_coordinate": [round(longitude, 6), round(latitude, 6)]}
        else:
            return {"error": "Robot not found."}
    except IntegrityError:
        conn.rollback()
        return {"error": "IntegrityError occurred. Failed to update robot coordinates."}
    finally:
        cursor.close()
