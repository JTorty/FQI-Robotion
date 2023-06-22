from shapely.geometry import Polygon, Point

obstacles: list[Polygon] = []

#camera di monitoraggio
obstacles.append(Polygon((
    (41.404231, 2.174043),
    (41.404271, 2.174023),
    (41.404316, 2.174023),
    (41.404356, 2.174043),
    (41.404356, 2.174078),
    (41.404231, 2.174078),
)))

#scrivania nell'angolo in alto a destra
obstacles.append(Polygon((
    (41.404491, 2.174008),
    (41.404531, 2.174008),
    (41.404531, 2.174078),
    (41.404491, 2.174078),
)))

#colonna in alto a sinistra
obstacles.append(Polygon((
    (41.404141, 2.173988),
    (41.404161, 2.173988),
    (41.404161, 2.174008),
    (41.404141, 2.174008),
)))

#colonna in alto a destra
obstacles.append(Polygon((
    (41.404426, 2.173988),
    (41.404446, 2.173988),
    (41.404446, 2.174008),
    (41.404426, 2.174008),
)))

#colonna in basso a sinistra
obstacles.append(Polygon((
    (41.404141, 2.173828),
    (41.404161, 2.173828),
    (41.404161, 2.173848),
    (41.404141, 2.173848),
)))

#colonna in basso a destra
obstacles.append(Polygon((
    (41.404426, 2.173828),
    (41.404446, 2.173828),
    (41.404446, 2.173848),
    (41.404426, 2.173848),
)))