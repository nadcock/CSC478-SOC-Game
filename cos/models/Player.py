import random

class Player(object):
    def __init__(self, name):
        self.player_name = name
        id = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.__player_id = id

    def getPlayerId(self):
        return self.__player_id
