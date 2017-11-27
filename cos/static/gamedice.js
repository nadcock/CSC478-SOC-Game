/**
 * Created by David Meyer 10/29/2017
 */


/**
 * Landing Page modal: this function checks if start game modal form has a game name. If it has,
 * then the game name is submitted and a new game is started:
 * 1) Game name
  */
$(document).on("click", "#rollDiceBtn", function(e){

    document.getElementById("rollDiceBtn").disabled = true;

    if (document.getElementById("rollDiceBtn").innerText == "Roll Dice") {

        // Set the dice on the screen to the random values returned from the backend.
        roll_dice(function(roll){

            document.getElementById("dice1").innerText = roll.dice_one;
            document.getElementById("dice2").innerText = roll.dice_two;
            document.getElementById("rollDiceBtn").innerText = "Done";
            document.getElementById("rollDiceBtn").disabled = false;

        });

    } else {
            hideDice();
            start_turn();
            console.log("Dice Done");
    }

    console.log("Roll dice clicked");

});


function hideDice() {
    document.getElementById("diceControls").style.display = "none";
}

function showDice() {
    document.getElementById("diceControls").style.display = "block";
    document.getElementById("rollDiceBtn").innerText = "Roll Dice";
    document.getElementById("rollDiceBtn").disabled = false;
}

