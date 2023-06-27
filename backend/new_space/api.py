from robots import ROBOTS, Robot, debug_print
from space import get_robot_location, initialize_positions, move_robot, get_pixels
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
    decimal_lon, decimal_lat = (float(robot_data[3]), float(robot_data[4]))
    lon, lat = from_dd_to_dms(decimal_lon, decimal_lat)
    x, y = get_pixels(decimal_lon, decimal_lat)
    robot_dict = {
        "model": robot_data[0],
        "status": robot_data[1],
        "battery": robot_data[2],
        "position": {
            "latitude": {
                "degrees": lat[0],
                "minutes": lat[1],
                "seconds": lat[2],
                "decimal": f'{round(decimal_lat, 6):.6f}',
                "pixel": y
            },
            "longitude": {
                "degrees": lon[0],
                "minutes": lon[1],
                "seconds": lon[2],
                "decimal": f'{round(decimal_lon, 6):.6f}',
                "pixel": x
            }
        }
    }
    return robot_dict


@app.get("/getrobot")
async def get_robot(model: str):
    select_query = "SELECT * FROM robots WHERE model = %s;"
    cursor = conn.cursor()
    cursor.execute(select_query, (model,))
    robot_data = cursor.fetchone()
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
    for robot_data in robots:
        robot_list.append(get_robot_info(robot_data))

    return robot_list

@app.put("/updatestatus")
async def update_status(model: str, newStatus: str):
    ROBOTS[model].status = newStatus
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
    ROBOTS[model].battery = newBattery
    update_query = f"UPDATE robots SET battery={int(newBattery)} WHERE model='{model}'"
    select_query = f"SELECT model FROM robots WHERE model='{model}'"
    
    cursor = conn.cursor()
    cursor.execute(select_query)

    if not cursor.fetchone():
        return {"Error": "No such robot"}
    
    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    return {"Success": "Robot battery updated"}

@app.delete("/deleterobot")
async def delete_robot(model: str):
    delete_query = f"DELETE FROM robots WHERE model='{model}'"
    select_query = f"SELECT model FROM robots WHERE model='{model}'"
    cursor = conn.cursor()
    cursor.execute(select_query)
    # if model in ROBOTS:
    #     del ROBOTS[model]
    if not cursor.fetchone():
        return {"Error": "No such robot"}
    cursor.execute(delete_query)
    conn.commit()
    cursor.close()
    return {"Success": "Robot deleted"}

@app.delete("/resetdatabase")
async def reset_database():
    delete_query = f"DELETE FROM robots"
    cursor = conn.cursor()
    cursor.execute(delete_query)
    conn.commit()
    cursor.close()
    return {"Success": "All rows deleted"}

@app.post("/addrobot")
async def add_robot(model: str):
    robot = ROBOTS[model]
    count_query = "SELECT COUNT(*) FROM robots"
    insert_query = "INSERT INTO robots (model, status, battery, latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
    cursor = conn.cursor()
    cursor.execute(count_query)

    if cursor.fetchone()[0] >= 10:
        return {"Error": "Robot limit reached"}
    
    try:
        longitude, latitude = get_robot_location(model)
        cursor.execute(insert_query, (model, robot.status, robot.battery, latitude, longitude))
        conn.commit()
    except IntegrityError as err:
        print(err)
        return {"Error": "Primary key violation"}
    
    return {"Success": "Robot added"}

@app.put("/updateposition")
async def update_position(model: str, longitude: float, latitude: float):
    try:
        # Retrieve the robot coordinates from the database using the provided ID
        cursor = conn.cursor()
        cursor.execute("SELECT longitude, latitude FROM robots WHERE model = %s", (model,))

        # Fetch the first row of the result
        result = cursor.fetchone()

        if result:
            cursor.execute(
                "UPDATE robots SET longitude = %s, latitude = %s WHERE model = %s",
                (longitude, latitude, model)
            )
            conn.commit()

            # Return the updated robot coordinate as the response
            return {"new_coordinate": [round(longitude,6), round(latitude,6)]}
        else:
            return {"error": "Robot not found."}
    except IntegrityError:
        conn.rollback()
        return {"error": "IntegrityError occurred. Failed to update robot coordinates."}
    finally:
        cursor.close()
        
initialize_positions()
print(ROBOTS.keys())
debug_print()