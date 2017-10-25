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
        self.nearby_tiles = []
        if row < 4:
            if column % 2 != 0:
                self.nearby_tiles.append((row, int((column / 2.0) + 0.5)))
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
