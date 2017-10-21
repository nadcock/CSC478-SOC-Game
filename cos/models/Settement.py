class Settlement(object):
    def __init__(self, row, column):
        self.location = (row, column)
        self.id = "s" + row + "," + column
        self.color = 'grey'
        self.ownedBy = None
        self.nearby_tiles = []
        if row < 4:
            if column % 2 != 0:
                self.nearby_tiles.append((row, round(column / 2)))
                self.nearby_tiles.append((row + 1, round(column / 2)))
                self.nearby_tiles.append((row + 1, round(column / 2) + 1))
            else:
                self.nearby_tiles.append((row, column / 2))
                self.nearby_tiles.append((row, (column / 2) + 1))
                self.nearby_tiles.append((row + 1, (column / 2) + 1))
        else:
            if column % 2 != 0:
                self.nearby_tiles.append((row, round(column / 2)))
                self.nearby_tiles.append((row, round(column / 2) + 1))
                self.nearby_tiles.append((row + 1, round(column / 2)))
            else:
                self.nearby_tiles.append((row, (column / 2) + 1))
                self.nearby_tiles.append((row + 1, (column / 2)))
                self.nearby_tiles.append((row + 1, (column / 2) + 1))
