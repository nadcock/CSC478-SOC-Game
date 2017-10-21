import random


class Player(object):
    """ Class for defining a Player Object 

            Current Attributes
            ------------------
            id: String
            name: String

            Methods
            -------
            None

        """
    def __init__(self, name):
        id_string = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.id = id_string
        self.name = name

