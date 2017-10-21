from Settement import Settlement

class Board(object):
    def __init__(self):
        self.open_settlements = {}
        for row in range(1, 7):
            if (row == 1) or (row == 6):
                for column in range(1, 8):
                    settlement = Settlement(row=row,column=column)
                    self.open_settlements[settlement.id] = settlement
            if (row == 2) or (row == 5):
                for column in range(1, 10):
                    settlement = Settlement(row=row,column=column)
                    self.open_settlements[settlement.id] = settlement
            if (row == 3) or (row == 4):
                for column in range(1, 12):
                    settlement = Settlement(row=row,column=column)
                    self.open_settlements[settlement.id] = settlement
