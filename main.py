import random

LINES_MAX = 3
BET_MAX = 100
BET_MIN = 1

ROW = 3
COL = 3

symbol_count = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

symbol_value = {
    "A": 10,
    "B": 7,
    "C": 6,
    "D": 5
}




def calculate_winnings(columns, lines, bet, values):
    winnings = 0
    winning_lines = []
    for line in range(lines):
        symbol = columns[0][line] #checking with the first symbol in each column
        for column in columns:
            symbol_to_check = column[line] #line denotes row
            if symbol != symbol_to_check: #comparing that with the other symbols in the row 
                break
        else: 
            winnings += values[symbol] * bet
            winning_lines.append(line + 1)
    return winnings, winning_lines




def get_slot_machine_spin(rows, cols, symbols):
    all_symbols = [] #for random selection
    for symbol, symbol_count in symbols.items():
        for _ in range(symbol_count):
            all_symbols.append(symbol)
    columns = []#main slot machine 
    for _ in range(cols):
        column = []#temp to generate different slots
        current_symbols = all_symbols[:]#slicing for the initial symbol list to remain intact
        for _ in range(rows):
            value = random.choice(current_symbols)
            current_symbols.remove(value)#inorder to avoid repetition 
            column.append(value)
        columns.append(column)
    return columns

def print_slot_machine(columns):
    for row in range(len(columns[0])):
        for i, column in enumerate(columns):
            if i != len(columns) - 1:
                print(column[row], end = " | ")
            else: 
                print(column[row], end = "")
        print("")




def cash_deposit():
    while (1==1):
        amount = input("How much money would you like to deposit? ")
        if amount.isdigit():
            amount = int(amount)
            if amount > 0:
                break
            else:
                print("deposit amount too less")
        else: 
            print("Invalid Input")
            print("please enter a number")
    return amount

def collect_number_of_lines():
    while (1==1):
        lines = input("How many lines would you like to bet on (1-" + str(LINES_MAX) +")? ")
        if lines.isdigit():
            lines = int(lines)
            if 1 <= lines <= LINES_MAX:
                break
            else:
                print("Enter number of lines within provided range")
        else: 
            print("Invalid Input")
            print("please enter a number")
    return lines


def collect_bet_value():
    while (1==1):
        amount = input("How much money would you like to bet on each line? ")
        if amount.isdigit():
            amount = int(amount)
            if BET_MIN <= amount <= BET_MAX:
                break
            else:
                print(f"Bet amount should be between {BET_MIN} and {BET_MAX}")
        else: 
            print("Invalid Input")
            print("please enter a number")
    return amount

def spin(balance):
    lines = collect_number_of_lines()
    while True:
        bet = collect_bet_value()
        total = bet * lines
        if total > balance:
            print("You do not have enough balance to bet that amount")
            print(f"Your current balance is {balance}")
        else:
            break
    print(f"You are betting {bet} on {lines} lines. Total bet will be {total}")

    slots = get_slot_machine_spin(ROW, COL, symbol_count)
    print_slot_machine(slots)
    winnings, winning_lines = calculate_winnings(slots, lines, bet, symbol_value)
    print(f"You Won {winnings}!")
    print(f"You won on lines: ", *winning_lines) #unpack operator

    return winnings - total


def main():
    balance = cash_deposit()
    while True:
        print(f"your current balance is {balance}")
        answer = input("press enter to play / Q to quit : ")
        if (answer == 'q' or answer == 'Q'):
            break
        balance += spin(balance)
    print(f"You left with {balance}")

main()