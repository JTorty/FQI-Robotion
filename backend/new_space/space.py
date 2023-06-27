from shapely.geometry import Polygon, Point
from obstacles import obstacles
from robots import ROBOTS, Robot
import random
from math import sin, cos, radians

WIDTH = 950
HEIGHT = 600

min_longitude = 41.404056
max_longitude = 41.404246
min_latitude = 2.174078
max_latitude = 2.174198

x_range = WIDTH - 1
y_range = HEIGHT - 1

lon_range = max_longitude - min_longitude
lat_range = max_latitude - min_latitude


def get_location(x, y):
    lon = ((x-1) * lon_range / x_range) + min_longitude
    lat = ((y-1) * lat_range / y_range) + min_latitude
    return lon, lat


def get_pixels(lon, lat):
    x = round(((lon - min_longitude) * x_range / lon_range) + 1)
    y = round(((lat - min_latitude) * y_range / lat_range) + 1)
    return x, y


def get_robot_location(model: str):
    robot = ROBOTS[model]
    return get_location(robot.center.x, robot.center.y)


# define planimetry boundaries
corners = (
    (1, 1),  # lower left corner
    (WIDTH + 1, 1),  # lower right corner
    (WIDTH, HEIGHT),  # upper right corner
    (1, HEIGHT),  # upper left corner
)
space = Polygon(corners)


def initialize_positions():
    min_x, min_y, max_x, max_y = space.bounds
    for robot in ROBOTS.values():

        while (True):
            # select random positions within the boundary considering the robot radius
            x = random.randint(min_x, max_x)
            y = random.randint(min_y, max_y)
            robot.center = Point(x, y)

            if is_position_valid(robot):
                robot.direction = random.choice(range(360))
                break


def is_position_valid(robot: Robot) -> bool:

    if (not robot.center.within(space)) or (robot.center.distance(space.boundary) < robot.radius):
        return False

    for other_robot in ROBOTS.values():
        bad_conditions = [
            # Robot not checking against itself
            other_robot != robot,
            # the other robot already has a position assigned
            other_robot.center,
            # the two robots are overlapping
            robot.center.distance(other_robot.center) < robot.radius + other_robot.radius]

        if all(bad_conditions):
            return False

    for obstacle in obstacles:
        if robot.center.distance(obstacle) < robot.radius:
            return False

    return True


def move_robot(model: str, displacement: int):
    """moves 1 robot of an arbitrary quantity of pixels. Useful if robots have different speeds"""
    robot = ROBOTS[model]

    angles = list(range(360))
    random.shuffle(angles)

    if not robot.direction:
        robot.direction = angles.pop()

    old_center = robot.center

    while True:
        # try to in the current direction, else pop a new angle and try again
        new_x = old_center.x + cos(radians(robot.direction))*displacement
        new_y = old_center.y + sin(radians(robot.direction))*displacement
        robot.center = Point(new_x, new_y)

        if is_position_valid(robot):
            break

        else:
            try:
                robot.direction = angles.pop()
                # no direction avaiable. The robot will stand still
            except IndexError:
                robot.center = old_center
                robot.direction = None
                break


# print(get_pixels(*get_location(1, 1)))
# print(get_pixels(*get_location(950, 600)))
# print(get_pixels(*get_location(300, 431)))
# print(get_pixels(*get_location(200, 431)))
# print(get_pixels(*get_location(888, 500)))
# print(get_pixels(*get_location(81, 359)))
# print(get_pixels(*get_location(72, 3)))