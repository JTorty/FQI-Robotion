import psycopg2
from psycopg2 import IntegrityError
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from coordinates import Geo_Coordinate
from space import is_position_valid
import math, random
from obstacles import obstacles
from shapely.geometry import Point
from space import min_distance

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
    
    if newStatus not in {'idle', 'operative', 'offline', 'online'}:
        return {"error": "Status not valid"}

    cursor = conn.cursor()
    cursor.execute(select_query)

    if not cursor.fetchone():
        return {"Error": "No such robot"}
    
    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    return {"Success": "Robot status updated"}

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


def is_position_valid(longitude: float, latitude: float):
    # Check rectangle bounds
    min_latitude = 2.174078
    max_latitude = 2.174198
    min_longitude = 41.404056
    max_longitude = 41.404246

    if not (min_longitude < longitude < max_longitude):
        return False
    if not (min_latitude < latitude < max_latitude):
        return False

    # Check obstacles
    
    point = Point(longitude, latitude)
    for obstacle in obstacles:
        if obstacle.distance(point) < min_distance:
            return False

    return True

MAX_ATTEMPTS = 300

def move_robot(robot_coordinate):
    current_position = (float(robot_coordinate[0]), float(robot_coordinate[1]))  # Convert to float
    min_distance = 0.000007
    angle = random.uniform(0, 360)  # random angle in degrees
    angle_radians = math.radians(angle)  # conversion to radians
    delta_lon = min_distance * math.cos(angle_radians)  # change in longitude
    delta_lat = min_distance * math.sin(angle_radians)  # change in latitude
    new_lon = float(current_position[0]) + delta_lon  # Convert to float
    new_lat = float(current_position[1]) + delta_lat  # Convert to float
    new_coordinate = (new_lon, new_lat)

    attempts = 1
    while not is_position_valid(new_lon, new_lat) and attempts <= MAX_ATTEMPTS:
        # check the position; if not valid, recalculate
        angle = random.uniform(0, 360)
        angle_radians = math.radians(angle)
        delta_lon = min_distance * math.cos(angle_radians)
        delta_lat = min_distance * math.sin(angle_radians)
        new_lon = float(current_position[0]) + delta_lon  # Convert to float
        new_lat = float(current_position[1]) + delta_lat  # Convert to float
        new_coordinate = (new_lon, new_lat)
        attempts += 1

    if attempts > MAX_ATTEMPTS:
        return {"error": "valid position not found"}

    return new_coordinate

@app.put("/robot_coordinates/{model}")
def update_robot_coordinates(model: str):
    try:
        # Retrieve the robot coordinates from the database using the provided ID
        cursor = conn.cursor()
        cursor.execute("SELECT longitude, latitude FROM robots WHERE model = %s", (model,))

        # Fetch the first row of the result
        result = cursor.fetchone()

        if result is not None:
            # Retrieve the latitude and longitude from the result tuple
            robot_coordinate = (result[0], result[1])

            # Call the move_robot function to calculate the new coordinate
            new_coordinate = move_robot(robot_coordinate)

            # Update the robot's coordinate in the database
            cursor.execute(
                "UPDATE robots SET longitude = %s, latitude = %s WHERE model = %s",
                (new_coordinate[0], new_coordinate[1], model)
            )
            conn.commit()

            # Return the updated robot coordinate as the response
            return {"new_coordinate": [round(new_coordinate[0],6), round(new_coordinate[1],6)]}
        else:
            return {"error": "Robot not found."}
    except IntegrityError:
        conn.rollback()
        return {"error": "IntegrityError occurred. Failed to update robot coordinates."}
    finally:
        cursor.close()

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
