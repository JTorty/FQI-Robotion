from matplotlib.colors import TABLEAU_COLORS
from shapely.geometry import Point, Polygon
from random import randint

# pixels
ROBOT_RADIUS = 33
# pixels/second
ROBOT_SPEED = 20

# For plotting, up to 10 colors available
color_keys = list(TABLEAU_COLORS.keys())


class Robot:
    '''
    Data structure used to store robots' data
    '''
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

# Empty dictionary ready to be filled with up to 10 robots
ROBOTS: dict[str, Robot] = {}


def create_robots(n: int):
    '''
    i
        Number of robots to create, for a maximum of 10
    '''
    for i in range(1, n+1):
        new_robot = Robot()
        new_robot.color = TABLEAU_COLORS[color_keys.pop()] #Assign a color from TABLEAU_COLORS
        new_robot.speed = ROBOT_SPEED # Set the speed of the robot
        new_robot.battery = randint(10, 100) # Set a random battery level
        model = f'S-{str(i).zfill(2)}' # Generate a model string
        ROBOTS[model] = new_robot # Add the robot to the ROBOTS dictionary


def debug_print():
    
    for model, robot in ROBOTS.items():
        print(model, ":", robot)

