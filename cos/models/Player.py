import random

class Player(object):
    def __init__(self, name):
        id = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.__player_id = id
        self.__player_name = name

    def getPlayerId(self):
        """ returns player_id set by constructor """
        return self.__player_id

    def getPlayerName(self):
        """ returns player_name set by constructor """
        return self.__player_name
