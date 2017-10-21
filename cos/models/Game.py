import random
from Player import Player

class Game(object):
    """ Class for defining a game Object 
    
        Current Attributes
        ------------------
        __game_id: String
        __players: [Player]
        
        Methods
        -------
        getGameId()
        getFirstPlayer()
        getPlayerCount()
        getIsGameFull()
        addPlayer(String)
    
    """

    # Maximum Players allowed in the game
    PLAYER_MAX = 4

    def __init__(self):
        """ Constructor for Game class:
                - no required params
                - sets private attributes of game_id (random string of alpaha-numeric chars and
                  creates first player object named "Player1" 
        """
        id = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.__game_id = id
        self.__players = [Player(name="Player 1")]

    def getGameId(self):
        """ returns game_id set by constructor """
        return self.__game_id

    def getPlayer(self, player_number):
        """ returns Player at selected number """
        return self.__players[player_number - 1]

    def getPlayers(self):
        """ returns list of all Player objects in game """
        return self.__players

    def getPlayerCount(self):
        """ returns number of players currently added to game """
        return len(self.__players)

    def getIsGameFull(self):
        """ returns True if game has reached the maximum, otherwise returns False """
        if self.getPlayerCount() < self.PLAYER_MAX:
            return False
        else:
            return True

    def addPlayer(self, name):
        """
            If the players maximum has not been reached, a Player object is created and added to
            the list of players, then that player object is returned. Otherwise, None is returned. 

            Parameters
            ----------
            name : String
                name to be set as the name attribute for Player object

            Returns
            -------
            Player
                Player object, or if max has been reached, None

        """
        if self.__players.count == self.PLAYER_MAX:
            print "Player maximum has already been reached."
            return None
        else:
            new_player = Player(name="Player " + str(self.getPlayerCount() + 1))
            self.__players.append(new_player)
            return new_player


class Games(object):
    """ Class for keeping track of all games on the server. This is registered as a global attribute with the
        registry and can be accessed using (in views) request.registry.games or (in config) config.registry.games 
    """
    def __init__(self):
        """ Initializes the games dictionary with an empty dictionary object """
        self.__games = {}

    def addGame(self, game):
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
        self.__games[game.getGameId()] = game

    def getGameByID(self, game_id):
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
        return self.__games[game_id]

    def printGames(self):
        """ Prints the current list of games to the console. Used for debugging """
        print "Current Games List:"
        for id in self.__games:
            print "'Game ID': " + id + "   'First Player': " + self.__games[id].getPlayer(1).getPlayerId()
        print ""







