from Settement import Settlement

class Board(object):
    def __init__(self):
        self.open_settlements = {}
        # Creates settlement objects and adds them to the open_settlement dict as {settlement_id: Settlement}
        # There are 6 rows of settlements that have 7, 9, 11, 11, 9, and 7 settlements to each row, respectively
        # Each settlement in a row represents a column, and all columns begin at 1, regardless of where it exists on
        # the actual board.
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
