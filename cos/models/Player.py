import random
from Tile import TerrainTile

class Player(object):
    """ Class for defining a Player Object 

        Current Attributes
        ------------------
        id: String
        name: String
        color: String
        settlements: {settlement_id: Settlement}

        Methods
        -------
        add_settlement(Settlement)

    """
    def __init__(self, name, color, age):
        id_string = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.id = id_string
        self.name = name
        self.color = color
        self.settlements = {}
        self.age = age
        self.current_roll = 0

        self.resources_by_roll = {}
        for num in range(1,13):
            self.resources_by_roll[num] = None

    def add_settlement(self, settlement, game_board):
        """
            Adds a settlement to the Player's list of settlments dictonary 

            Parameters
            ----------
            settlement : Settlement
                settlement to be added to settlements list
            game_board : Board

            Returns
            -------
            None

        """
        # type: (Settlement) -> None
        settlement.ownedBy = self
        settlement.color = self.color
        self.settlements[settlement.id] = settlement
        nearby_tiles = settlement.nearby_tiles
        for tile_id in nearby_tiles:
            tile = game_board.tiles[tile_id]
            if isinstance(tile, TerrainTile):
                token_digit = tile.token.digit
                tile_resource = tile.resource
                if self.resources_by_roll[token_digit] is not None:
                    self.resources_by_roll[token_digit].append(tile_resource)
                else:
                    self.resources_by_roll[token_digit] = [tile_resource]


