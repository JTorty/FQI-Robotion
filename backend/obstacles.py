from shapely.geometry import Polygon

obstacles: list[Polygon] = []

#camera di monitoraggio
obstacles.append(Polygon((
    (41.404126, 2.174184), #lo l
    (41.404142, 2.174174), #llo l
    (41.40416, 2.174174), #llo r
    (41.404176, 2.174184), #lo r
    (41.404176, 2.174198), #up r
    (41.404126, 2.174198), #up le
)))

#stanzino
obstacles.append(Polygon((
    (41.40423, 2.174198), #ul
    (41.404246, 2.174198), #ur
    (41.404246, 2.17417), #lr
    (41.40423, 2.17417), #ll
)))

#colonna in alto a sinistra
obstacles.append(Polygon((
    (41.404088, 2.174171),
    (41.4041, 2.174171),
    (41.4041, 2.174159),
    (41.404088, 2.174159),
)))

#colonna in alto a destra
obstacles.append(Polygon((
    (41.404202, 2.174171),
    (41.404214, 2.174171),
    (41.404214, 2.174159),
    (41.404202, 2.174159),
)))

#colonna in basso a sinistra
obstacles.append(Polygon((
    (41.404088, 2.174114),
    (41.4041, 2.174114),
    (41.4041, 2.174102),
    (41.404088, 2.174102),
)))

#colonna in basso a destra
obstacles.append(Polygon((
    (41.404202, 2.174102), #ll
    (41.404214, 2.174102), #lr
    (41.404214, 2.174114), #ur
    (41.404202, 2.174114), #ul
)))