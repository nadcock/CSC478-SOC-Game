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
        self.remaining_settlements = 10
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
        """
            Removes resources for payment of the settlement 
        """
        self.resources["brick"] -= 1
        self.resources["wool"] -= 1
        self.resources["lumber"] -= 1
        self.resources["grain"] -= 1

    def set_next_turn_state(self):
        """
            Sets the state machine to the current state
        """
        if self.turn_state is None:
            self.turn_state = "waiting_for_turn"
            return

        if self.turn_state == "waiting_for_turn":
            self.turn_state = "rolling"
            return

        if self.turn_state == "rolling":
            self.turn_state = "main_turn"
            return

        if self.turn_state == "main_turn":
            self.turn_state = "waiting_for_turn"
            return

    def get_turn_options(self):
        """
            Returns a list of turn options available during the particular turn state
        """
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
            if self.can_trade_resources():
                turn_options.append("trade_resource")
            turn_options.append("end_turn")

        return {"turn_options": turn_options}

    def perform_turn_option(self, turn_option, game, data):
        """
            Performs turn option specified with data provided
            Parameters
            ----------
            turn_option: String
            game: Game
            data: JSON object from request
                if turn_option is "buy_settlement", "settlement_id" is required in data object

            Returns
            -------
            Dict object depending on turn_option performed
        """
        if turn_option == "buy_settlement":
            settlement_to_buy = game.game_board.open_settlements[data["settlement_id"]]
            self.buy_settlement(settlement_to_buy, game.game_board)
            self.remove_resources_for_settlement()
            self.remaining_settlements -= 1
            return {"success": "True",
                    "remaining_settlement_count": self.remaining_settlements,
                    "player": self.get_dictionary(owned_settlements=True, player_color=True, player_resources=True)}

        if turn_option == "end_turn":
            game.set_next_players_turn()
            self.set_next_turn_state()
            return {"success": "True",
                    "next_player": game.current_player_id}

        if turn_option == "roll_dice":
            self.set_next_turn_state()
            roll = self.roll_dice()
            self.give_resources_for_roll(self.current_roll, game)
            return{ "success": "True",
                    "player": self.get_dictionary(owned_settlements=True, player_resources=True),
                    "roll": roll}

        if turn_option == "trade_resource":
            self.resources[data["resource_to_trade"]] -= 4
            self.resources[data["resource_to_receive"]] += 1
            return {"success": "True",
                    "player": self.get_dictionary(player_resources=True)}

    @staticmethod
    def give_resources_for_roll(roll, game):
        """
            Assigns +1 resources to each/every player based on roll (if they have a nearby settlement)
        """
        if roll == 7:
            return
        for _, player in game.players.iteritems():
            if player.resources_by_roll[roll] is not None:
                for resource in player.resources_by_roll[roll]:
                    player.resources[resource] += 1

    def can_trade_resources(self):
        """
            Returns a boolean as to whether any resources are eligible for trade
        """
        can_trade = False
        for _, value in self.resources.iteritems():
            if value >= 4:
                can_trade = True
        return can_trade

    def get_tradable_resources(self):
        """
            Returns a list of tradable resources for player
        """
        tradable_resources = []
        for resource, value in self.resources.iteritems():
            if value >= 4:
                tradable_resources.append(resource)
        return {"tradable_resources": tradable_resources}

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
        """
            Determines if player can legally purchase a settlement
        """
        if self.remaining_settlements > 0 and all(x >= 1 for x in (self.resources["brick"],
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
            for key, _ in self.settlements.iteritems():
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
