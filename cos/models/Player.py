import random


class Player(object):
    """ Class for defining a Player Object 

            Current Attributes
            ------------------
            id: String
            name: String
            color: String

            Methods
            -------
            None

        """
    def __init__(self, name, color):
        id_string = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.id = id_string
        self.name = name
        self.color = color
        self.settlements = []

    def add_settlement(self, settlement):
        # type: (Settlement) -> None
        settlement.ownedBy = self
        settlement.color = self.color
        self.settlements.append(settlement)


