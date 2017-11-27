/**
 * Created by Matthew Polsgrove 11/13/2017
 */

//Called when backend confirms it is player's turn
function start_turn() {
    document.getElementById("is_turn").innerHTML = "true";
    get_turn_options(function (data) {
        if(data.success == "True"){
            console.log("getTurnOptions returned successfully");
            addTurnOptionButtons(data.turn_options);
            showTurnControls();
        }

    });
}

//Called when player chooses to end turn
function end_turn() {
    document.getElementById("is_turn").innerHTML = "false";
    hideTurnControls();
    removeTurnOptionButtons();
    wait_for_turn(start_turn);
}

function showTurnControls() {
    console.log("showTurnControls triggered");
    document.getElementById("turnControls").style.display = "block";
}

function hideTurnControls() {
    document.getElementById("turnControls").style.display = "none";
}

function addTurnOptionButtons(turn_options) {
    for(i=0; i <turn_options.length; i++) {
        if (turn_options[i] == "roll_dice") {
            console.log("showDice triggered");
            showDice();
        } else {
            var turn_option_buttons = document.createElement("DIV");
            turn_option_buttons.id = "turn_option_buttons";
            var brk = document.createElement("BR");
            turn_option_buttons.appendChild(brk);
            if (turn_options[i] == "buy_settlement") {
                var settlement_button = document.createElement("BUTTON");
                settlement_button.id = turn_options[i];
                settlement_button.classList.add(".btn");
                var text = document.createTextNode("Buy Settlement");
                settlement_button.appendChild(text);
                turn_option_buttons.appendChild(settlement_button);
            }
            if (turn_options[i] == "end_turn") {
                var end_turn_button = document.createElement("BUTTON");
                end_turn_button.id = turn_options[i];
                end_turn_button.classList.add(".btn");
                var text = document.createTextNode("End Turn");
                end_turn_button.appendChild(text);
                turn_option_buttons.appendChild(end_turn_button);
            }
            var turn_controls = document.getElementById("turnControls");
            turn_controls.appendChild(turn_option_buttons)
        }
    }
}

function removeTurnOptionButtons() {
    var turn_controls = document.getElementById("turnControls");
    var turn_option_buttons = document.getElementById("turn_option_buttons");
    turn_controls.removeChild(turn_option_buttons);
}

//End turn button functionality
$(document).on("click", "#end_turn", function(e){
    if (document.getElementById("is_turn").innerHTML == "true") {
        complete_turn(end_turn);
    }
});