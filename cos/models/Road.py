class Road(object):
    """ Class for defining a Road Object 

            Current Attributes
            ------------------
            id: String (in the form of "r(row),(column)" example: "r1,5"
            location: Tuple (row, column)
            color: String
            ownedBy: Player
            attached_settlement: Settlement
            alignment: String (vertical or horizontal)

            Methods
            -------
            get_dict()

    """
    def __init__(self, row, column, alignment):
        self.location = (row, column)
        self.id = "r" + str(row) + "," + str(column)
        self.color = 'grey'
        self.ownedBy = None
        self.attached_settlement = None
        self.alignment = alignment

    def get_dictionary(self):
        """ returns dictionary representation of object that can be used for json """
        settlement_dict = {}
        settlement_dict["road_id"] = self.id
        settlement_dict["road_row"] = self.location[0]
        settlement_dict["road_column"] = self.location[1]
        settlement_dict["road_color"] = self.color
        if self.ownedBy is not None:
            settlement_dict["road_ownedBy"] = self.ownedBy.id
        if self.attached_settlement is not None:
            settlement_dict["attached_settlement"] = self.attached_settlement.id
        return settlement_dict
