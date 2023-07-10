import requests
import psycopg2
from time import sleep
from space import *
from robots import ROBOTS, Robot, create_robots

# Milliseconds elapsed between database updates
update_frequency = 600
sleep_time = update_frequency/1000
n_robots = 10

# API hostname
host = "http://localhost:8000"


def populate_database():
    '''
    Initialize table data
    '''
    data_to_insert = [(model, robot.status, robot.battery, *get_robot_location(model),
                       round(robot.center.x), round(robot.center.y)) for model, robot in ROBOTS.items()]
    insert_query = "INSERT INTO robots (model, status, battery, longitude, latitude, x_pixel, y_pixel) VALUES (%s, %s, %s, %s, %s, %s, %s)"

    cursor = conn.cursor()
    try:
        cursor.executemany(insert_query, data_to_insert)
        conn.commit()
        print("Insert successful")
    except (Exception, psycopg2.Error) as error:
        conn.rollback()
        print("Error inserting multiple rows:", error)
        exit(1)

    cursor.close()


def update_database():
    '''
    Update database with new robots' positions
    '''
    data_to_update = [(*get_robot_location(model), round(robot.center.x),
                       round(robot.center.y), model) for model, robot in ROBOTS.items()]
    update_query = "UPDATE robots SET longitude = %s, latitude = %s, x_pixel = %s, y_pixel = %s WHERE model = %s"
    cursor = conn.cursor()
    try:
        for row in data_to_update:
            cursor.execute(update_query, row)
        conn.commit()
        print("Update successful")
    except (Exception, psycopg2.Error) as error:
        conn.rollback()
        print("Error executing multiple updates:", error)
        exit(1)
    cursor.close()



# Reset database and spawn new robots
requests.delete(f'{host}/resetdatabase')
create_robots(n_robots)
initialize_positions()

# Connect to database
conn = psycopg2.connect(database="Robotion",
                        host="localhost",
                        user="postgres",
                        password="password",
                        port="5432")

populate_database()

# Simulation loop

while True:
    sleep(sleep_time)

    for model, robot in ROBOTS.items():
        if robot.status == "operative":            
            move_robot(model, max(robot.speed * sleep_time, 1))
    update_database()
