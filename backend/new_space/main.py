import requests
from time import sleep
from space import *
from robots import ROBOTS, Robot

# time elapsed between 2 updates
update_frequency = 100

host = "http://localhost:8000"

requests.delete(f'{host}/resetdatabase')
initialize_positions()

for model in ROBOTS.keys():
    requests.post(f'{host}/addrobot?model={model}')

while True:
    for model, robot in ROBOTS.items():
        move_robot(model, 4)
        lon, lat = get_robot_location(model)
        requests.put(f'{host}/updateposition?model={model}&longitude={lon}&latitude={lat}')
