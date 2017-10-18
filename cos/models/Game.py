import random
from Player import Player

class Game(object):

    PLAYER_MAX = 4

    def __init__(self):
        id = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.__game_id = id
        self.__players = [Player(name="Player 1")]

    def getGameId(self):
        return self.__game_id

    def getFirstPlayer(self):
        return self.__players[0]

    def addPlayer(self, name):
        if self.__players.count == self.PLAYER_MAX:
            print "Player maximum has already been reached."
            return None

        new_player = Player(name="Player " + str(self.__players.count))
        self.__players.append(new_player)
        return new_player

class Games(object):
    def __init__(self):
        self.__games = {}

    def addGame(self, game):
        self.__games[game.getGameId()] = game

    def printGames(self):
        for id in self.__games:
            print "ID: " + id + " First Player: " + self.__games[id].getFirstPlayer().getPlayerId()







