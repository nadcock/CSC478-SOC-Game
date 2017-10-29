class Settlement(object):
    """ Class for defining a Player Object 

                Current Attributes
                ------------------
                id: String (in the form of "s(row),(column)" example: "s1,5"
                location: Tuple (row, column)
                color: String
                ownedBy: Player
                nearby_tiles: [Tuple (row, column)]

                Methods
                -------
                add_settlement(Settlement)

    """
    def __init__(self, row, column):
        self.location = (row, column)
        self.id = "s" + str(row) + "," + str(column)
        self.color = 'grey'
        self.ownedBy = None

        # assigns the nearby tiles based on its location, used to determine resources
        # For the first three rows, settlements in even columns are near 2 tiles in its same row: the tile to its left
        # is equal to half the column of the settlement, while the tile to its right is just +1 to the tile on the left.
        # The tile below the settlement is equal to the tile to the settlement's right, just one additional row below.
        # Settlements have one tile above and one each to its left and right below. The tile above is in the settlement's
        # row, and the tiles column is equal to half the settlement's column, rounded up. The tile below and to the left
        # is just one additional row, and to the right is one additional row and one additional column
        self.nearby_tiles = []
        if row < 4:
            if column % 2 != 0:
                self.nearby_tiles.append((row, int((column / 2.0) + 0.5)))  # 0.5 is added here to round up, as python's rounding function is stupid
                self.nearby_tiles.append((row + 1, int((column / 2.0) + 0.5)))
                self.nearby_tiles.append((row + 1, int((column / 2.0) + 0.5) + 1))
            else:
                self.nearby_tiles.append((row, column / 2))
                self.nearby_tiles.append((row, (column / 2) + 1))
                self.nearby_tiles.append((row + 1, (column / 2) + 1))
        else:
            if column % 2 != 0:
                self.nearby_tiles.append((row, int((column / 2.0) + 0.5)))
                self.nearby_tiles.append((row, int((column / 2.0) + 0.5) + 1))
                self.nearby_tiles.append((row + 1, int((column / 2.0) + 0.5)))
            else:
                self.nearby_tiles.append((row, (column / 2) + 1))
                self.nearby_tiles.append((row + 1, (column / 2)))
                self.nearby_tiles.append((row + 1, (column / 2) + 1))
