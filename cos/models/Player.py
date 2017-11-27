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
        self.turn_state = None
        self.resources = {
            "brick":    2,
            "grain":    2,
            "ore":      2,
            "wool":     2,
            "lumber":   2
        }

        self.resources_by_roll = {}
        for num in range(1,13):
            self.resources_by_roll[num] = None

    def buy_settlement(self, settlement, game_board):
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

    def remove_resources_for_settlement(self):
        self.resources["brick"] -= 1
        self.resources["wool"] -= 1
        self.resources["lumber"] -= 1
        self.resources["grain"] -= 1

    def set_next_turn_state(self):
        if self.turn_state is None:
            self.turn_state = "waiting_for_turn"
            return

        if self.turn_state == "waiting_for_turn":
            print("setting turn state to rolling")
            self.turn_state = "rolling"
            print("New turn state is " + self.turn_state)
            return

        if self.turn_state == "rolling":
            self.turn_state = "main_turn"
            return

        if self.turn_state == "main_turn":
            self.turn_state = "waiting_for_turn"
            return

    def get_turn_options(self):
        turn_options = []

        if self.turn_state is None:
            self.set_next_turn_state()

        if self.turn_state == "waiting_for_turn":
            self.set_next_turn_state()

        if self.turn_state == "rolling":
            turn_options.append("roll_dice")

        if self.turn_state == "main_turn":
            if self.can_buy_settlement():
                turn_options.append("buy_settlement")
            turn_options.append("end_turn")

        print(turn_options)
        return {"turn_options": turn_options}

    def perform_turn_option(self, turn_option, game, data):
        if turn_option == "buy_initial_settlements":
            settlement_to_buy = game.game_board.open_settlements.pop(data["settlement_id"])
            self.buy_settlement(settlement_to_buy, game.game_board)
            return {"success": "True",
                    "player": self.get_dictionary(owned_settlements=True, player_resources=True)}

        if turn_option == "buy_settlement":
            settlement_to_buy = game.game_board.open_settlements.pop(data["settlement_id"])
            self.buy_settlement(settlement_to_buy, game.game_board)
            self.remove_resources_for_settlement()
            return {"success": "True",
                    "player": self.get_dictionary(owned_settlements=True, player_resources=True)}

        if turn_option == "end_turn":
            game.set_next_players_turn()
            self.set_next_turn_state()
            return {"success": "True",
                    "next_player": game.current_player_id}

        if turn_option == "roll_dice":
            self.set_next_turn_state()
            roll = self.roll_dice()
            return{ "success": "True",
                    "player": self.get_dictionary(owned_settlements=True, player_resources=True),
                    "roll": roll}

    def give_resources_for_roll(self, roll):
        if self.resources_by_roll[roll] is not None:
            for resource in self.resources_by_roll[roll]:
                self.resources[resource] += 1

    def roll_dice(self):
        """
            Rolls 2 "dice" and then assigns the total to the current_roll attribute of the player, then returns
             a tuple of the dice rolls

            Parameters
            ----------
            player_id : String
                id string of player object

            Returns
            -------
            (Integer, Integer)
        """
        dice_one = self.roll()
        dice_two = self.roll()
        self.current_roll = dice_one + dice_two
        return {
                    "dice_one":     str(dice_one),
                    "dice_two":     str(dice_two),
                    "dice_total":   str(self.current_roll)
                }

    def can_buy_settlement(self):
        if all(x >= 1 for x in (self.resources["brick"],
                                self.resources["wool"],
                                self.resources["lumber"],
                                self.resources["grain"])):
            return True
        else:
            return False

    def get_dictionary(self, player_age=False, player_color=False, owned_settlements=False, player_resources=False):
        """ returns dictionary representation of object that can be used for json """
        player_dict = {}
        player_dict["player_id"] = self.id
        player_dict["player_name"] = self.name
        if player_age:
            player_dict["player_age"] = self.age
        if player_color:
            player_dict["player_color"] = self.color
        settlements_list = []
        if self.settlements:
            for key, val in self.settlements.iteritems():
                settlements_list.append(key)
        if owned_settlements:
            player_dict["owned_settlements"] = settlements_list
        else:
            player_dict["owned_settlements"] = "None"

        if player_resources:
            player_dict["resources"] = self.resources
        return player_dict

    @staticmethod
    def roll():
        return random.choice(range(1, 7))
