import psycopg2
from robots import Robot
from fastapi import FastAPI, Path, Query
from fastapi.middleware.cors import CORSMiddleware

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
async def update_status(*, serialNumber: str, newBattery: int):
    update_query = f"UPDATE robots SET battery={int(newBattery)} WHERE id='{serialNumber}'"
    select_query = f"SELECT id FROM robots WHERE id='{serialNumber}'"

    cursor = conn.cursor()
    cursor.execute(select_query)

    if not cursor.fetchone():
        return {"Error": "No such robot"}
    
    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    return {"Success": "Robot battery updated"}

