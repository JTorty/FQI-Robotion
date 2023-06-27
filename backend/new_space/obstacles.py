from shapely import Point, Polygon
from shapely import affinity

# Obstacles have been created starting from the lower left point,
# the obstacles' structure then continues with a anti-clockwise direction

# obstacles
obstacles: list[Polygon] = []

# columns
column_side = 60

# lower-left column
obstacles.append(
    Polygon((
        (160, 122),
        (160+column_side, 122),
        (160+column_side, 122+column_side),
        (160, 122+column_side),
    ))
)

# lower-right column
obstacles.append(
    Polygon((
        (730, 122),
        (730+column_side, 122),
        (730+column_side, 122+column_side),
        (730, 122+column_side),
    ))
)

# upper-right column
obstacles.append(
    Polygon((
        (730, 403),
        (730+column_side, 403),
        (730+column_side, 403+column_side),
        (730, 403+column_side),
    ))
)

# upper-left column
obstacles.append(
    Polygon((
        (160, 403),
        (160+column_side, 403),
        (160+column_side, 403+column_side),
        (160, 403+column_side),
    ))
)

# upper-right desk
desk_width = 80
desk_height = 140
obstacles.append(
    Polygon((
        (870, 460),
        (870+desk_width, 460),
        (870+desk_width, 460+desk_height),
        (870, 460+desk_height),
    ))
)

# monitoring room
minor_axis = 92
major_axis = 250
center = Point(475, 528)
ellipse: Polygon = affinity.scale(center.buffer(
    1, quad_segs=4), major_axis/2, minor_axis/2)
rect_width = 250
rect_height = 72
rect = Polygon((
    (350, 528),
    (350+rect_width, 528),
    (350+rect_width, 528+rect_height),
    (350, 528+rect_height),
))
obstacles.append(ellipse.union(rect))
