from shapely.geometry import Point


class Geo_Coordinate:
    @staticmethod
    def from_dms_to_dd(lon: tuple[int, int, float], lat: tuple[int, int, float]) -> tuple[float, float]:
        """
        Convert a geographical location from <DD°MM'SS.SS"> format to <DD.DDDDDD°> format

        Decimal degrees are rounded up to their 6th decimal
        """
        lon_seconds = round(lon[2], 2)
        lat_seconds = round(lat[2], 2)
        decimal_longitude = round(lon[0] + lon[1]/60 + lon_seconds/3600, 6)
        decimal_latitude = round(lat[0] + lat[1]/60 + lat_seconds/3600, 6)
        return decimal_longitude, decimal_latitude

    def from_dd_to_dms(dec_lon: float, dec_lat: float) -> tuple[tuple[int, int, float], tuple[int, int, float]]:
        """
        Convert a geographical location from <DD.DDDDDD°> format to <DD°MM'SS.SS"> format

        Seconds are rounded up to their 2nd decimal
        """
        dec_lon = round(dec_lon, 6)
        dec_lat = round(dec_lat, 6)
        lon_degrees = int(dec_lon)
        lon_minutes = int((dec_lon - lon_degrees) * 60)
        lon_seconds = round((dec_lon - lon_degrees - lon_minutes/60) * 3600, 2)
        lat_degrees = int(dec_lat)
        lat_minutes = int((dec_lat - lat_degrees) * 60)
        lat_seconds = round((dec_lat - lat_degrees - lat_minutes/60) * 3600, 2)
        return ((lon_degrees, lon_minutes, lon_seconds), (lat_degrees, lat_minutes, lat_seconds))

    def __init__(self, longitude: float | tuple[int, int, float], latitude: float | tuple[int, int, float], decimal=True) -> None:
        if not decimal:
            (longitude, latitude) = Geo_Coordinate.from_dms_to_dd(longitude, latitude)
        else:
            (longitude, latitude) = (round(longitude, 6), round(latitude, 6))
        self.point = Point(longitude, latitude)

    def __str__(self) -> str:
        lon, lat = self.get_coord()
        lon_str = f"{lon[0]}°{lon[1]}'{lon[2]}\""
        lat_str = f"{lat[0]}°{lat[1]}'{lat[2]}\""
        dec_lon_str = f'{self.point.x:.6f}°'
        dec_lat_str = f'{self.point.y:.6f}°'
        return f'GEO_COORD(conventional: ({lon_str}, {lat_str}), decimal: ({dec_lon_str}, {dec_lat_str})))'

    def get_coord(self) -> tuple[tuple[int, int, float], tuple[int, int, float]]:
        """Return the coordinates of this instance as ((DD, MM, SS.SS), (DD, MM, SS.SS))"""
        return Geo_Coordinate.from_dd_to_dms(self.point.x, self.point.y)

    def get_dec_coord(self) -> tuple[float, float]:
        """Return the coordinates of this instance as (DD.DDDDDD, DD.DDDDDD)"""
        return (self.point.x, self.point.y)

    def get_json(self) -> dict:
        """Get the coordinates in a JSON format as requested by the front-end"""
        lon, lat = self.get_coord()
        return {
            'longitude': {
                'degrees': lon[0], 'minutes': lon[1], 'seconds': lon[2],
                'decimal': f'{self.point.x:.6f}'},
            'latitude': {
                'degrees': lat[0], 'minutes': lat[1], 'seconds': lat[2],
                'decimal': f'{self.point.y:.6f}'}}
    def get_point(self) -> Point:
        return self.point
