### deprecated


from coordinates import Geo_Coordinate
from shapely.geometry import Polygon, Point


class Robot:
    def __init__(self, serial_number: str, lon: float | tuple[int, int, float], lat: float | tuple[int, int, float], battery: int = 100, status: str = 'offline', radius=0.00005, decimal=True) -> None:
        """
        radius: 
            has to be in <DD.DDDDDD°> format and will be rounded to its 6th decimal
        decimal:
            if True, then lon; lat are interpreted as <DD.DDDDDD°>, otherwise as <DD°MM'SS">
        lon:
            initial longitude
        lat:
            initial latitude
        serial_number:
            do not modify after creation, this will be the immutable key to find the robot
        """
        flag = decimal
        self.coordinate = Geo_Coordinate(lon, lat, decimal=flag)
        self.radius = radius
        self.serial_number = serial_number
        self.status = status
        self.battery = battery

    def get_radius(self) -> float:
        return self.radius

    def get_json(self):
        """Get the robot data in a JSON format as requested by the front-end"""
        return {
            'serialNumber': self.serial_number,
            'status': self.status,
            'battery': self.battery,
            'position': self.coordinate.get_json(),
        }

    def __str__(self) -> str:
        return f'ROBOT(serial_number: {self.serial_number}, radius: {self.radius:.6f}, status: {self.status}, coordinate: {self.coordinate}, battery: {self.battery})'

    def update_position(self, new_lon: float | tuple[int, int, float], new_lat: float | tuple[int, int, float], decimal=True) -> None:
        flag = decimal
        self.coordinate = Geo_Coordinate(new_lon, new_lat, decimal=flag)

    def get_shape(self) -> Polygon:
        """Return the area occupied by this robot as a Polygon"""
        return self.coordinate.get_point().buffer(self.radius)

    def set_battery(self, new_battery: int):
        self.battery = max(min(new_battery, 100), 0)

    def set_status(self, new_status: str):
        self.status = str(new_status)

    def get_point(self) -> Point:
        return self.coordinate.get_point()

    def is_colliding(self, shape: Polygon) -> bool:
        """Returns True if the shape is colliding with this robot"""
        return self.get_shape().intersects(shape)


robot1 = Robot('AAA', 2.1740, 41.4043, decimal=True, radius=0.000035)
robot2 = Robot('BBB', 2.1747, 41.4048, decimal=True, radius=0.000035)
robot3 = Robot('CCC', 2.1752, 41.4045, decimal=True, radius=0.000035)
robot4 = Robot('DDD', 2.1749, 41.4045, decimal=True, radius=0.000035)
robot5 = Robot('EEE', 2.1738, 41.4045, decimal=True, radius=0.000035)



