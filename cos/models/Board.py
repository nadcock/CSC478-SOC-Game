import random

from Settement import Settlement
from Tile import Token
from Tile import WaterTile
from Tile import TerrainTile
from Road import Road

class Board(object):
    def __init__(self):
        self.tiles = {}
        self.open_settlements = {}
        self.roads = {}

        # BEGIN SETUP FOR HEX TILES:
        # First the resource types are defined, except desert
        resource_types = ["brick", "ore", "wool", "lumber", "grain"]

        # Next all possible token digits are defined
        token_numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]

        # Now Token objects are created with each digit
        tokens = []
        for token_number in token_numbers:
            tokens.append(Token(token_number))
        resources = []

        # Now an array of the correct number of resources per resource type is created
        for type in resource_types:
            if type == "brick" or type == "ore":
                resources.extend((type, type, type))
            else:
                resources.extend((type, type, type, type))

        # Shuffle token list (only token list needs to be shuffled because resources will be shuffled later)
        random.shuffle(tokens)
        random.shuffle(resources)

        # Tiles are created with a kind (water or terrain), a now random resource, and now random token
        terrain_tiles = []
        water_tiles = []

        for x in range(0, len(tokens)):
            terrain_tiles.append(TerrainTile(resource=resources[x], token=tokens[x]))

        # the desert terrain with token 7 is added to the list (since this terrain and token are always matched, it
        # must be left out of the randomization process above and be added later
        terrain_tiles.append(TerrainTile(resource="desert", token=Token(7)))

        # shuffle the tiles array (this is only needed because we want the desert in a random place as well)
        random.shuffle(self.tiles)

        # creates 18 water tiles that will surround the terrain board
        for x in range(0, 18):
            water_tiles.append(WaterTile())

        # "Places" each tile in a particular "slot" of the game board. There are 7 rows on the game board, and each row
        # has 4, 5, 6, 7, 6, 5, 4 tiles in each row, respectively. The first and last rows consist only of water tiles,
        # as well as the first and last tile of each row. All other tiles are set to terrain. Tiles can be identified
        # by their id: "t1,1" = "tile at row 1, column 1"
        water_iter = iter(water_tiles)
        terrain_iter = iter(terrain_tiles)
        for row in range(0,7):
            if row == 0 or row == 6:
                for column in range(1, 5):
                    tile = water_iter.next()
                    tile.place_tile(row=row + 1, column=column)
                    self.tiles[tile.id] = tile
            if row == 1 or row == 5:
                for column in range(1, 6):
                    if column == 1 or column == 5:
                        tile = water_iter.next()
                        tile.place_tile(row=row + 1, column=column)
                        self.tiles[tile.id] = tile
                    else:
                        tile = terrain_iter.next()
                        tile.place_tile(row=row + 1, column=column)
                        self.tiles[tile.id] = tile
            if row == 2 or row == 4:
                for column in range(1, 7):
                    if column == 1 or column == 6:
                        tile = water_iter.next()
                        tile.place_tile(row=row + 1, column=column)
                        self.tiles[tile.id] = tile
                    else:
                        tile = terrain_iter.next()
                        tile.place_tile(row=row + 1, column=column)
                        self.tiles[tile.id] = tile
            if row == 3:
                for column in range(1, 8):
                    if column == 1 or column == 7:
                        tile = water_iter.next()
                        tile.place_tile(row=row + 1, column=column)
                        self.tiles[tile.id] = tile
                    else:
                        tile = terrain_iter.next()
                        tile.place_tile(row=row + 1, column=column)
                        self.tiles[tile.id] = tile

        # BEGIN SETUP FOR SETTLEMENTS:
        # Creates settlement objects and adds them to the open_settlement dict as {settlement_id: Settlement}
        # There are 6 rows of settlements that have 7, 9, 11, 11, 9, and 7 settlements to each row, respectively
        # Each settlement in a row represents a column, and all columns begin at 1, regardless of where it exists on
        # the actual board. Settlements can be identified by their id: "s1,1" = "settlement at row 1, column 1"
        for row in range(1, 7):
            if (row == 1) or (row == 6):
                for column in range(1, 8):
                    settlement = Settlement(row=row,column=column)
                    self.open_settlements[settlement.id] = settlement
            if (row == 2) or (row == 5):
                for column in range(1, 10):
                    settlement = Settlement(row=row,column=column)
                    self.open_settlements[settlement.id] = settlement
            if (row == 3) or (row == 4):
                for column in range(1, 12):
                    settlement = Settlement(row=row,column=column)
                    self.open_settlements[settlement.id] = settlement

        # BEGIN SETUP FOR ROADS:
        # The road grid looks like this: The road rows alternate between running horizontal and running vertical. The
        # first row is horizontal (running between hex bottoms and tops) and consists of 6 roads. The next row is
        # vertical (running between hexes vertically) and consists of 4 roads. The process repeats alternating though
        # each row on the board. Roads can be identified by their id: "r1,1" = "settlement at row 1, column 1"
        for row in range(0, 11):
            if row % 2 == 0:
                alignment = "horizontal"
                if row == 0 or row == 10:
                    for column in range(1, 7):
                        road = Road(row=row + 1, column=column, alignment=alignment)
                        self.roads[road.id] = road
                if row == 2 or row == 8:
                    for column in range(1, 9):
                        road = Road(row=row + 1, column=column, alignment=alignment)
                        self.roads[road.id] = road
                if row == 4 or row == 6:
                    for column in range(1, 11):
                        road = Road(row=row + 1, column=column, alignment=alignment)
                        self.roads[road.id] = road
            else:
                alignment = "vertical"
                if row == 1 or row == 9:
                    for column in range(1, 5):
                        road = Road(row=row + 1, column=column, alignment=alignment)
                        self.roads[road.id] = road
                if row == 3 or row == 7:
                    for column in range(1, 6):
                        road = Road(row=row + 1, column=column, alignment=alignment)
                        self.roads[road.id] = road
                if row == 5:
                    for column in range(1, 6):
                        road = Road(row=row + 1, column=column, alignment=alignment)
                        self.roads[road.id] = road

    def get_dictionary(self):
        """ returns dictionary representation of object that can be used for json """
        board_dict = {}

        tiles = []
        for key, val in self.tiles.iteritems():
            tiles.append({key: val.get_dictionary()})
        board_dict["Tiles"] = tiles

        settlements = []
        for key, val in self.open_settlements.iteritems():
            settlements.append({key: val.get_dictionary()})
        board_dict["Settlements"] = settlements

        roads = []
        for key, val in self.roads.iteritems():
            roads.append({key: val.get_dictionary()})
        board_dict["Roads"] = roads

        return board_dict

