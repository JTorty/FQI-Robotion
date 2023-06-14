from shapely.geometry import Polygon
from coordinates import Geo_Coordinate


class Obstacle:
    def __init__(self, *coordinates: Geo_Coordinate) -> None:
        self.polygon = Polygon(
            map(lambda coord: coord.get_point(), coordinates))

    @staticmethod
    def create_circle_obstacle(center: Geo_Coordinate, radius=0.0001):
        new_obstacle = Obstacle.__new__(Obstacle)
        new_obstacle.polygon = center.get_point().buffer(radius)
        return new_obstacle

    def get_polygon(self) -> Polygon:
        return self.polygon

    def is_colliding(self, shape: Polygon) -> bool:
        """Returns True if the shape is colliding with this obstacle"""
        return self.get_polygon().intersects(shape)


obstacle1 = Obstacle(
    Geo_Coordinate((2, 10, 26.0), (41, 24, 15.0), decimal=False),
    Geo_Coordinate((2, 10, 27.0), (41, 24, 15.0), decimal=False),
    Geo_Coordinate((2, 10, 27.0), (41, 24, 16.0), decimal=False),
    Geo_Coordinate((2, 10, 26.0), (41, 24, 16.0), decimal=False),
)
obstacle2 = Obstacle(
    Geo_Coordinate(2.174800, 41.404400, decimal=True),
    Geo_Coordinate(2.175000, 41.404400, decimal=True),
    Geo_Coordinate(2.175000, 41.404600, decimal=True),
    Geo_Coordinate(2.174800, 41.404600, decimal=True),
)

obstacle3 = Obstacle.create_circle_obstacle(
    Geo_Coordinate(2.1746, 41.4046, decimal=True))
