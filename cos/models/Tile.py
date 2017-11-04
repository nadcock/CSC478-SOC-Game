class Tile(object):
    """ Class for defining a Tile Object 

            Current Attributes
            ------------------
            id: String (in the form of "r(row),(column)" example: "r1,5"
            location: Tuple (row, column)

            Methods
            -------
            place_tile(int, int)
            get_dict()

    """
    def __init__(self):
        self.location = (None, None)
        self.id = None

    def place_tile(self, row, column):
        """ Sets location to a Tuple of (row, column) and defines id """
        self.location = (row, column)
        self.id = 't' + str(row) + ',' + str(column)

    def get_dict(self):
        """ returns dictionary representation of object that can be used for json """
        tile_dict = {}
        tile_dict["tile_id"] = self.id
        tile_dict["tile_row"] = self.location[0]
        tile_dict["tile_column"] = self.location[1]

        return tile_dict


class TerrainTile(Tile):
    """ Class for defining a TerrainTile Object, inherits from Tile

            Current Attributes
            ------------------
            (Inherited) id: String (in the form of "r(row),(column)" example: "r1,5"
            (Inherited) location: Tuple (row, column)
            token: Token
            resource: Resource

            Methods
            -------
            (Inherited) place_tile(int, int)
            (Inherited) get_dict()

    """
    def __init__(self, resource, token):
        super(TerrainTile, self).__init__()
        self.resource = resource
        self.token = token

    def get_dict(self):
        """ returns dictionary representation of object that can be used for json """
        tile_dict = super(TerrainTile, self).get_dict()
        tile_dict["tile_resource"] = self.resource
        tile_dict["tile_type"] = "terrain"
        tile_dict["tile_token"] = self.token.get_dict()
        return tile_dict


class WaterTile(Tile):
    """ Class for defining a TerrainTile Object, inherits from Tile

            Current Attributes
            ------------------
            (Inherited) id: String (in the form of "r(row),(column)" example: "r1,5"
            (Inherited) location: Tuple (row, column)

            Methods
            -------
            (Inherited) place_tile(int, int)
            (Inherited) get_dict()

    """
    def __init__(self):
        super(WaterTile, self).__init__()

    def get_dict(self):
        """ returns dictionary representation of object that can be used for json """
        tile_dict = super(WaterTile, self).get_dict()
        tile_dict["tile_type"] = "water"
        return tile_dict


class Token(object):
    """ Class for defining a Tile Object 

            Current Attributes
            ------------------
            digit: Int
            color: String
            pips: Int
            

            Methods
            -------
            place_tile(int, int)
            get_token_dict()

    """
    def __init__(self, digit):
        self.digit = digit
        self.color = "black"
        if self.digit == 2 or self.digit == 12:
            self.pips = 1
        elif self.digit == 3 or self.digit == 11:
            self.pips = 2
        elif self.digit == 4 or self.digit == 10:
            self.pips = 3
        elif self.digit == 5 or self.digit == 9:
            self.pips = 4
        elif self.digit == 6 or self.digit == 8:
            self.pips = 5
            self.color = "red"
        else:
            self.pips = 0

    def get_dict(self):
        """ returns dictionary representation of object that can be used for json """
        if self.digit == 0:
            return "None"
        else:
            token_dict = {}
            token_dict["token_digit"] = self.digit
            token_dict["token_pips"] = self.pips
            token_dict["token_color"] = self.color
            return token_dict
