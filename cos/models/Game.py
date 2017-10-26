import random
from Player import Player


class Game(object):
    """ Class for defining a game Object 
    
        Current Attributes
        ------------------
        id: String
        players: [Player]
        
        Methods
        -------
        get_player_count()
        is_game_full()
        add_player(String)
    
    """

    # Maximum Players allowed in the game
    PLAYER_MAX = 4
    # Options for player colors
    PLAYER_COLORS = ["blue", "white", "orange", "red"]

    def __init__(self):
        """ Constructor for Game class:
                - no required params
                - sets private attributes of game_id (random string of alpaha-numeric chars and
                  creates first player object named "Player1" 
        """
        id_string = "BLACK" #''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.id = id_string
        self.players = [Player(name="Player 1", color=self.PLAYER_COLORS[0])]

    def get_player_count(self):
        """ returns number of players currently added to game """
        return len(self.players)

    def is_game_full(self):
        """ returns True if game has reached the maximum, otherwise returns False """
        if self.get_player_count() < self.PLAYER_MAX:
            return False
        else:
            return True

    def add_player(self, name):
        """
            If the players maximum has not been reached, a Player object is created and added to
            the list of players, then that player object is returned. Otherwise, None is returned. 

            Parameters
            ----------
            name : String
                name to be set as the name attribute for Player object

            Returns
            -------
            Player (Player object, or if max has been reached, None)

        """
        if self.get_player_count() == self.PLAYER_MAX:
            print "Player maximum has already been reached."
            return None
        else:
            new_player = Player(name="Player " + str(self.get_player_count() + 1),
                                color=self.PLAYER_COLORS[self.get_player_count()])
            self.players.append(new_player)
            return new_player


class Games(object):
    """ Class for keeping track of all games on the server. This is registered as a global attribute with the
        registry and can be accessed using (in views) request.registry.games or (in config) config.registry.games
         
        Current Attributes
        ------------------
        games: Dictionary {game_id: Game}
        
        Methods
        -------
        add_game(Game)
        get_game_by_id(String)
        print_games()
    """

    def __init__(self):
        """ Initializes the games dictionary with an empty dictionary object """
        self.games = {}

    def add_game(self, game):
        """
            Adds a game to global games dictionary in the form of {game_id: Game} 

            Parameters
            ----------
            game : Game
                game to be added to global games dictionary

            Returns
            -------
            None

        """
        self.games[game.id] = game

    def get_game_by_id(self, game_id):
        """
            Returns a game object based on provided game_id 

            Parameters
            ----------
            game_id : String
                game_id of game in global games dictionary 

            Returns
            -------
            None

        """
        return self.games[game_id]

    def print_games(self):
        """ Prints the current list of games to the console. Used for debugging """
        print "Current Games List:"
        for id in self.games:
            print "'Game ID': " + id + "   'First Player': " + self.games[id].players[0].id
        print ""







