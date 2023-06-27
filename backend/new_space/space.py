from shapely.geometry import Polygon, Point
from obstacles import obstacles
from robots import ROBOTS, Robot
import random
from math import sin, cos, radians

# Width and height of the environment in pixels
WIDTH = 950
HEIGHT = 600

# Longitude and latitude boundaries of the environment
min_longitude = 41.404056
max_longitude = 41.404246
min_latitude = 2.174078
max_latitude = 2.174198

x_range = WIDTH - 1
y_range = HEIGHT - 1

lon_range = max_longitude - min_longitude
lat_range = max_latitude - min_latitude

def get_location(x, y):
    '''
    Conversion from pixel coordinates to longitude, latitude
    '''
    lon = ((x-1) * lon_range / x_range) + min_longitude
    lat = ((y-1) * lat_range / y_range) + min_latitude
    return lon, lat

def get_pixels(lon, lat):
    '''
    Conversion from longitude, latitude to pixel coordinates
    '''
    x = round(((lon - min_longitude) * x_range / lon_range) + 1)
    y = round(((lat - min_latitude) * y_range / lat_range) + 1)
    return x, y


def get_robot_location(model: str):
    '''
    Get the current location in longitude and latitude
    '''
    robot = ROBOTS[model]
    return get_location(robot.center.x, robot.center.y)


# Define planimetry boundaries
corners = (
    (1, 1),  # lower left corner
    (WIDTH + 1, 1),  # lower right corner
    (WIDTH, HEIGHT),  # upper right corner
    (1, HEIGHT),  # upper left corner
)
space = Polygon(corners)

def initialize_positions():
    '''
    Initialization of positions of the robots.
    It has to be called only after the function create_robots() from the robot.py module has been called
    '''
    min_x, min_y, max_x, max_y = space.bounds
    for robot in ROBOTS.values():

        while (True):
            # Select random positions within the boundary considering the robot radius
            x = random.randint(min_x, max_x)
            y = random.randint(min_y, max_y)
            robot.center = Point(x, y)

            if is_position_valid(robot):
                robot.direction = random.choice(range(360))
                break

def is_position_valid(robot: Robot) -> bool:
    '''
    Check if the robot is outside and/or too close to the boundary
    '''
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
    """
    Moves 1 robot of an arbitrary quantity of pixels
    """
    robot = ROBOTS[model]

    angles = list(range(360))
    random.shuffle(angles)

    if not robot.direction:
        robot.direction = angles.pop()

    old_center = robot.center

    while True:
        # Try to in the current direction, else pop a new angle and try again
        new_x = old_center.x + cos(radians(robot.direction))*displacement
        new_y = old_center.y + sin(radians(robot.direction))*displacement
        robot.center = Point(new_x, new_y)

        if is_position_valid(robot):
            break

        else:
            try:
                robot.direction = angles.pop()
                # If no other directions are avaiable, the robot will stay in place
            except IndexError:
                robot.center = old_center
                robot.direction = None
                break
