/**
 * Created by David Meyer 10/29/2017
 */


/**
 *  On-click event handler for roll dice button
 *  Calls roll_dice() api caller, and displays the results if successful
 *
 * This function implements the following requirements:
 * 3.7.1
 * 3.7.3
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

/**
 * hides dice controls on game page, also resets dice to '?'
 *
 * This function implements the following requirement:
 *
 * 3.8.6
 *
  */
function hideDice() {
    document.getElementById("diceControls").style.display = "none";
    document.getElementById("dice1").innerText = "?";
    document.getElementById("dice2").innerText = "?";
}

/**
 * shows dice controls on game page
 *
 * This function implements the following requirement:
 *
 * 3.8.3
 *
  */

function showDice() {
    document.getElementById("diceControls").style.display = "block";
    document.getElementById("rollDiceBtn").innerText = "Roll Dice";
    document.getElementById("rollDiceBtn").disabled = false;
}

