from matplotlib.colors import TABLEAU_COLORS
from shapely.geometry import Point, Polygon
from random import randint

# for now all robots have the same radius(in px) and the same speed(in px/s)
ROBOT_RADIUS = 33
ROBOT_SPEED = 20


color_keys = list(TABLEAU_COLORS.keys())


class Robot:
    model: str = None
    center: Point = None
    radius = ROBOT_RADIUS
    color = None
    status = "operative"
    battery = None
    direction = None
    speed = None
    def __str__(self) -> str:
        return f'ROBOT<center: {self.center}, radius: {self.radius}, color: {self.color}, direction: {self.direction}, battery: {self.battery}>'

ROBOTS: dict[str, Robot] = {}


def create_robots(i: int):
    for i in range(i):
        new_robot = Robot()
        new_robot.color = TABLEAU_COLORS[color_keys.pop()]
        new_robot.speed = ROBOT_SPEED
        new_robot.battery = randint(10, 100)
        model = f'S-{str(i).zfill(2)}'
        ROBOTS[model] = new_robot


def debug_print():
    for model, robot in ROBOTS.items():
        print(model, ":", robot)

