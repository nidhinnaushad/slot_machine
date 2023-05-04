// deposit amount 
// lines
// bet
// spin 
// win 
// update amount 

const prompt = require("prompt-sync")();

const ROW_C = 3;
const COL_C = 3; 

const SYMBOL_COUNT = {

    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {

    "A": 10,
    "B": 7,
    "C": 6,
    "D": 5
}

const spin = () => {

    const symbol_array = [];
    for(const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        //console.log(symbol, count);
        for(let i = 0; i < count; i++){
            symbol_array.push(symbol);
        }
    }
    //console.log(symbol_array);

    const reels = [];
    for(let i = 0; i < COL_C; i++){

        reels.push([]);
        
        const reel_symbols = [...symbol_array]; // temperory array

        for(let j = 0; j < ROW_C; j++){

            const random_value = Math.floor(Math.random() * reel_symbols.length);
            const selected_symbol =  reel_symbols[random_value];
            reels[i].push(selected_symbol);
            reel_symbols.splice(random_value, 1);

        }
    }

    return reels; 
};


function initial_amount(){

    while(true){

    const initial_deposit = prompt("enter the amount of money you want to deposit: ");
    const amount = parseFloat(initial_deposit)

    if (isNaN(amount) || amount <= 0){
        console.log("deposit amount invalid, please try again");
    }
    else{
        return amount;
    }
    }
};

const lines_to_bet = () => {

    while(true){

        const number_of_lines = prompt("enter the number of lines you want to bet on (1-3): ");
        const number = parseFloat(number_of_lines)
    
        if (isNaN(number) || number <= 0 || number > 3){
            console.log("number of lines out of range, please try again");
        }
        else{
            return number;
        }
        }

};

function get_betting_amount(balance, lines){
    
    while(true){

        const enter_bet = prompt("enter the amount you want to bet per line: ");
        const bet_amount = parseFloat(enter_bet)
    
        if (isNaN(bet_amount) || bet_amount <= 0 || bet_amount > balance/lines){
            console.log("bet amount invalid, please try again");
        }
        else{
            return bet_amount;
        }
        }

};

const transpose = (reels) => {

    const rows = [];

    for(let i=0; i<ROW_C; i++){

        rows.push([]);
        
        for(let j=0; j<COL_C; j++){

            rows[i].push(reels[j][i]);
        }
    }

    return rows; 
}

const printing_slot_machine = (rows) => {

    for(const row of rows){
        
        let row_string = "";

        for(const [i, symbol] of row.entries()){
            row_string += symbol;
            if(i != row.length - 1){
                row_string += " | ";
            }
        }

        //row_string += "\n";
        console.log(row_string);

    }

}

const calculate_winnings = (rows, bet, lines) => {

    let credit = 0;

    for(let row = 0; row < lines; row++){

        const symbols = rows[row];
        let same = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                same = false;
                break;
            }
        }

        if(same){
            credit += bet * SYMBOL_VALUES[symbols[0]];
        }

    }

    return credit;

}

const game = () => {
    
    let balance = initial_amount(); //let stores variable data
    //console.log(balance);

    while(true){

        console.log("Your current balance is " + balance);
        const lines = lines_to_bet(); // constant 
        //console.log(lines);
        const bet = get_betting_amount(balance, lines);
        //console.log(bet);
        balance -= bet * lines;
        const reels = spin();
        //console.log(reel);
        const rows = transpose(reels);
        //console.log(rows); 
        printing_slot_machine(rows);
        const winnings = calculate_winnings(rows, bet, lines);
        balance += winnings;
        console.log("You have won " + winnings + "!");

        if(balance<=0){
            console.log("You have used up all your money");
            break;
        }

        const play_again = prompt("Would you like to play again? (y/n) ");

        if(play_again != 'y'){
            break;
        }
    }
}

game();
