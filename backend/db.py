import psycopg2
from psycopg2 import IntegrityError
from robots import Robot
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

cursor.execute("SELECT id FROM robots WHERE id = 'AAA'")

# print(cursor.execute("SELECT * FROM robots"))
print(cursor.fetchall())

@app.put("/updatestatus")
async def update_status(serialNumber: str, newStatus: str):
    print(serialNumber)
    update_query = f"UPDATE robots SET status='{newStatus}' WHERE id='{serialNumber}'"
    select_query = f"SELECT id FROM robots WHERE id='{serialNumber}'"
    
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


@app.put("/updatebattery")
async def update_status(serialNumber: str, newBattery: int):
    update_query = f"UPDATE robots SET battery={int(newBattery)} WHERE id='{serialNumber}'"
    select_query = f"SELECT id FROM robots WHERE id='{serialNumber}'"

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
    insert_query = "INSERT INTO robots (id, status, battery, latitude, longitude) VALUES (%s, %s, %s, %s, %s)"
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
    

    

    

    





