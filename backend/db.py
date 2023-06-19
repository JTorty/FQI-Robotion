import psycopg2
from psycopg2 import IntegrityError
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from coordinates import Geo_Coordinate

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

cursor = conn.cursor()

cursor.execute("SELECT model FROM robots WHERE model = 'AAA'")

# print(cursor.execute("SELECT * FROM robots"))
print(cursor.fetchall())

@app.get("/getrobot/{robot_model}")
async def get_robot(robot_model: str):
    select_query = "SELECT * FROM robots WHERE model = %s;"
    cursor = conn.cursor()
    cursor.execute(select_query, (robot_model,))
    robot = cursor.fetchone()
    if robot:
        lon, lat = Geo_Coordinate.from_dd_to_dms(float(robot[4]), float(robot[3]))
        robot_dict = {
            "model": robot[0],
            "status": robot[1],
            "battery": robot[2],
            "position": {
                "latitude": {
                    "degrees": lat[0],
                    "minutes": lat[1],
                    "seconds": lat[2],
                    "decimal": f'{robot[3]:.6f}'
                },
                "longitude": {
                    "degrees": lon[0],
                    "minutes": lon[1],
                    "seconds": lon[2],
                    "decimal": f'{robot[4]:.6f}'
                }
            }
        }
        return robot_dict
    else:
        return {"message": "Robot not found."}
    
@app.get("/getallrobots")
async def get_all_robots():
    
    select_query = "SELECT * FROM robots;"
    cursor = conn.cursor()
    cursor.execute(select_query)
    robots = cursor.fetchall()
    print(robots)
    robot_list = []
    for robot in robots:
        lon, lat = Geo_Coordinate.from_dd_to_dms(float(robot[4]), float(robot[3]))
        robot_dict = {
            "model": robot[0],
            "status": robot[1],
            "battery": robot[2],

            "position": {
                "latitude": {
                    "degrees": lat[0],
                    "minutes": lat[1],
                    "seconds": lat[2],
                    "decimal": f'{robot[3]:.6f}'
                },
                "longitude": {
                    "degrees": lon[0],
                    "minutes": lon[1],
                    "seconds": lon[2],
                    "decimal": f'{robot[4]:.6f}'
                }
            }
        }
        robot_list.append(robot_dict)

    return robot_list

@app.put("/updatestatus")
async def update_status(serialNumber: str, newStatus: str):
    update_query = f"UPDATE robots SET status='{newStatus}' WHERE model='{serialNumber}'"
    select_query = f"SELECT model FROM robots WHERE model='{serialNumber}'"
    
    if newStatus not in {'idle', 'online', 'offline'}:
        return {"error": "Status not valid"}

    cursor = conn.cursor()
    cursor.execute(select_query)

    if not cursor.fetchone():
        return {"Error": "No such robot"}
    
    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    return {"Success": "Robot status updated"}


@app.put("/updateposition")
async def update_position(serialNumber: str, newLatitude: float, newLongitude: float):
    update_query = f"UPDATE robots SET latitude={newLatitude}, longitude={newLongitude} WHERE model='{serialNumber}'"
    select_query = f"SELECT model FROM robots WHERE model='{serialNumber}'"
    cursor = conn.cursor()
    cursor.execute(select_query)
    if not cursor.fetchone():
        return {"Error": "No such robot"}
    cursor.execute(update_query)
    conn.commit()
    cursor.close()
    return {"Success": "Robot position updated"}

@app.put("/updatebattery")
async def update_status(serialNumber: str, newBattery: int):
    update_query = f"UPDATE robots SET battery={int(newBattery)} WHERE model='{serialNumber}'"
    select_query = f"SELECT model FROM robots WHERE model='{serialNumber}'"

    if not (0 <= newBattery <= 100):
        return {"Error": "Battery level not in [0, 100]"}
    
    cursor = conn.cursor()
    cursor.execute(select_query)

    if not cursor.fetchone():
        return {"Error": "No such robot"}
    
    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    return {"Success": "Robot battery updated"}

@app.post("/addrobot")
async def add_robot(serialNumber: str, status: str, battery: int, longitude: float, latitude: float):
    count_query = "SELECT COUNT(*) FROM robots"
    insert_query = "INSERT INTO robots (model, status, battery, latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
    cursor = conn.cursor()
    cursor.execute(count_query)

    if cursor.fetchone()[0] >= 10:
        return {"Error": "Robot limit reached"}
    
    try:
        cursor.execute(insert_query, (serialNumber, status, battery, round(latitude, 6), round(longitude, 6)))
        conn.commit()
    except IntegrityError as err:
        print(err)
        return {"Error": "Primary key violation"}
    
    return {"Success": "Robot added"}

@app.delete("/deleterobot/{serialNumber}")
async def delete_robot(serialNumber: str):
    delete_query = f"DELETE FROM robots WHERE model='{serialNumber}'"
    select_query = f"SELECT model FROM robots WHERE model='{serialNumber}'"
    cursor = conn.cursor()
    cursor.execute(select_query)
    if not cursor.fetchone():
        return {"Error": "No such robot"}
    cursor.execute(delete_query)
    conn.commit()
    cursor.close()
    return {"Success": "Robot deleted"}

