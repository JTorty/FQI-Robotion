from coordinates import Geo_Coordinate
from shapely.geometry import Polygon, Point
import matplotlib.pyplot as plt
import random
import math
from obstacles import obstacles

travel_space: Polygon = None

positions: list[Point] = []

# positions.append(Point(41.404123, 2.173999))

min_distance = 0.000007

#generatore posizioni iniziali random
def generate_position():

    
    for i in range(10):
        position_found = False
        while position_found == False:
            x = round(random.uniform(41.404056 + min_distance, 41.404246 - min_distance), 6)
            y = round(random.uniform(2.174078 + min_distance, 2.174198 - min_distance), 6)
            point = Point(x, y)
            is_colliding = False
            for obstacle in obstacles:
                if obstacle.distance(point) < min_distance:
                    is_colliding = True
                    break
                else:
                    pass
            if is_colliding == True:
                continue
            for position in positions:
                if position.distance(point) < min_distance * 2:
                    is_colliding = True
                    break
                else:
                    pass                
            if is_colliding == False:
                positions.append(point)
                position_found = True
            else:
                pass
            
generate_position()
for position in positions:
   print(position.x, position.y)

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



def draw_space():
    _, ax = plt.subplots()
    ax.set_aspect('equal')
    ax.get_xaxis().get_major_formatter().set_useOffset(False)
    ax.get_yaxis().get_major_formatter().set_useOffset(False)

    # draw space
    ax.plot(*travel_space.exterior.xy, color='black', linewidth=3)

    # draw robots
    for position in positions:
        ax.scatter(position.x, position.y, s=10, facecolor='black')
        ax.fill(*position.buffer(min_distance).exterior.xy)
        
    # draw obstacles
    for obstacle in obstacles:
        ax.fill(*obstacle.exterior.xy,
                alpha=0.3, edgecolor='none', color='red')
    plt.show()

def move_robot(robot_coordinate):
    distance = 0.000001
    current_position = robot_coordinate
    angle = random.uniform(0, 360)  # random angle in degrees
    angle_radians = math.radians(angle)  # conversion to radians
    delta_lon = distance * math.cos(angle_radians)  # change in longitude
    delta_lat = distance * math.sin(angle_radians)  # change in latitude
    new_lon = current_position[0] + delta_lon
    new_lat = current_position[1] + delta_lat
    new_coordinate = (new_lon, new_lat)
    
    while not is_position_valid(new_coordinate):
        # check the position; if not valid, recalculate
        angle = random.uniform(0, 360)
        angle_radians = math.radians(angle)
        delta_lon = distance * math.cos(angle_radians)
        delta_lat = distance * math.sin(angle_radians)
        new_lon = current_position[0] + delta_lon
        new_lat = current_position[1] + delta_lat
        new_coordinate = (new_lon, new_lat)
    
    return new_coordinate

# perimetro stanza
travel_space = Polygon((
    (41.404056, 2.174198), #ul
    (41.404246, 2.174198), #ur
    (41.404246, 2.174078), #lr
    (41.404056, 2.174078), #ll
))

draw_space()