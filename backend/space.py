from robots import Robot, robot1, robot2, robot3, robot4, robot5
from coordinates import Geo_Coordinate
from obstacles import Obstacle, obstacle1, obstacle2, obstacle3
from shapely.geometry import Polygon, Point
import shapely.affinity
import matplotlib.pyplot as plt
import random
import math

robots: dict[str, Robot] = {}
obstacles: list[Obstacle] = []
travel_space: Polygon = None


def set_travel_space(*coordinates: Geo_Coordinate):
    global travel_space
    travel_space = Polygon(map(lambda coord: coord.get_point(), coordinates))


def add_robot(robot: Robot):
    global robots
    robots[robot.serial_number] = robot


def add_obstacle(obstacle: Obstacle):
    global obstacles
    obstacles.append(obstacle)
    

def is_robot_valid(serial_number: str) -> bool:
    shape = robots[serial_number].get_shape()
    if not travel_space.covers(shape):
        return False
    for obstacle in obstacles:
        if obstacle.is_colliding(shape):
            return False
    for other_robot in robots.values():
        if (other_robot.serial_number != serial_number) and (other_robot.is_colliding(shape)):
            return False
    return True


def is_position_valid(serial_number: str, new_coordinate: Geo_Coordinate) -> bool:
    """Return true if this coordinate would be a valid position for this robot"""
    shape = new_coordinate.get_point().buffer(
        robots[serial_number].get_radius())
    if not travel_space.covers(shape):
        return False
    for obstacle in obstacles:
        if obstacle.is_colliding(shape):
            return False
    for other_robot in robots.values():
        if (other_robot.serial_number != serial_number) and (other_robot.is_colliding(shape)):
            return False
    return True


def draw_space():
    _, ax = plt.subplots()
    ax.set_aspect('equal')
    ax.get_xaxis().get_major_formatter().set_useOffset(False)
    ax.get_yaxis().get_major_formatter().set_useOffset(False)

    # draw space
    ax.plot(*travel_space.exterior.xy, color='black', linewidth=3)

    # draw robots
    for robot in robots.values():
        point = robot.get_point()
        circle = robot.get_shape()
        if is_robot_valid(robot.serial_number):
            ax.scatter(point.x, point.y, s=10, facecolor='black')
        else:
            ax.scatter(point.x, point.y, s=30, facecolor='black', marker='x')
        ax.fill(*circle.exterior.xy, alpha=0.3, edgecolor='none', color='grey')
        ax.text(point.x, point.y, f'{robot.serial_number}',
                ha='center', va='bottom', fontsize=7)

    # draw obstacles
    for obstacle in obstacles:
        ax.fill(*obstacle.get_polygon().exterior.xy,
                alpha=0.3, edgecolor='none', color='red')
    plt.show()


def move_robot(robot: Robot, distance: float):
    current_position = robot.coordinate.get_dec_coord()
    angle = random.uniform(0, 360)  # angolo random in gradi
    angle_radians = math.radians(angle)  # conversione in radianti
    delta_lon = distance * math.cos(angle_radians)  # calcolo del cambio della long
    delta_lat = distance * math.sin(angle_radians)  # calcolo del cambio della lat
    new_lon = current_position[0] + delta_lon
    new_lat = current_position[1] + delta_lat
    new_coordinate = Geo_Coordinate(new_lon, new_lat)
    
    while not is_position_valid(robot.serial_number, new_coordinate):
        # check della posizione, se non è utilizzabile ci sta il ricalcolo
        angle = random.uniform(0, 360)
        angle_radians = math.radians(angle)
        delta_lon = distance * math.cos(angle_radians)
        delta_lat = distance * math.sin(angle_radians)
        new_lon = current_position[0] + delta_lon
        new_lat = current_position[1] + delta_lat
        new_coordinate = Geo_Coordinate(new_lon, new_lat)
    
    # update della posizione del robot
    robot.update_position(new_lon, new_lat)


set_travel_space(
    Geo_Coordinate(41.404056, 2.173778, decimal=True),
    Geo_Coordinate(41.404151, 2.173778, decimal=True),
    Geo_Coordinate(41.404151, 2.173838, decimal=True),
    Geo_Coordinate(41.404056, 2.173838, decimal=True)
)

#colonna in alto a sinistra
add_obstacle(
    Obstacle
    (
        Geo_Coordinate(41.404073, 2.173820, decimal=True),
        Geo_Coordinate(41.404077, 2.173820, decimal=True),
        Geo_Coordinate(41.404077, 2.173824, decimal=True),
        Geo_Coordinate(41.404073, 2.173824, decimal=True)
    )
)

#colonna in alto a destra
add_obstacle(
    Obstacle
    (
        Geo_Coordinate(41.404130, 2.173820, decimal=True),
        Geo_Coordinate(41.404134, 2.173820, decimal=True),
        Geo_Coordinate(41.404134, 2.173824, decimal=True),
        Geo_Coordinate(41.404130, 2.173824, decimal=True)
    )
)

#colonna in basso a sinistra
add_obstacle(
    Obstacle
    (
        Geo_Coordinate(41.404073, 2.173788, decimal=True),
        Geo_Coordinate(41.404077, 2.173788, decimal=True),
        Geo_Coordinate(41.404077, 2.173792, decimal=True),
        Geo_Coordinate(41.404073, 2.173792, decimal=True)
    )
)

#colonna in basso a destra
add_obstacle(
    Obstacle
    (
        Geo_Coordinate(41.404130, 2.173788, decimal=True),
        Geo_Coordinate(41.404134, 2.173788, decimal=True),
        Geo_Coordinate(41.404134, 2.173792, decimal=True),
        Geo_Coordinate(41.404130, 2.173792, decimal=True)
    )
)

#scrivania in alto a destra
add_obstacle(
    Obstacle
    (
        Geo_Coordinate(41.404143, 2.173824, decimal=True),
        Geo_Coordinate(41.404151, 2.173824, decimal=True),
        Geo_Coordinate(41.404151, 2.173838, decimal=True),
        Geo_Coordinate(41.404143, 2.173838, decimal=True)
    )
)

#pedana di monitoraggio
add_obstacle(
    Obstacle
    (
        Geo_Coordinate(41.404091, 2.173831, decimal=True),
        Geo_Coordinate(41.4041035, 2.173827, decimal=True),
        Geo_Coordinate(41.404116, 2.173831, decimal=True),
        Geo_Coordinate(41.404116, 2.173838, decimal=True),
        Geo_Coordinate(41.404091, 2.173838, decimal=True)
    )
)


draw_space()


