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
            add_settlement(Settlement)

        """
    def __init__(self, name, color):
        id_string = ''.join(random.choice('0123456789ABCDEFGHIJKLMNZQRSTUVWXYZ') for i in range(6))
        self.id = id_string
        self.name = name
        self.color = color
        self.settlements = {}

    def add_settlement(self, settlement):
        """
                    Adds a settlement to the Player's list of settlments dictonary 

                    Parameters
                    ----------
                    settlement : Settlement
                        settlement to be added to settelements list

                    Returns
                    -------
                    None

                """
        # type: (Settlement) -> None
        settlement.ownedBy = self
        settlement.color = self.color
        self.settlements[settlement.id] = settlement


