/**
 * Created by David Meyer 10/29/2017
 */


/**
 * Landing Page modal: this function checks if start game modal form has a game name. If it has,
 * then the game name is submitted and a new game is started:
 * 1) Game name
  */
$(document).on("click", "#rollDiceBtn", function(e){

    if (document.getElementById("is_turn").innerHTML == "true") {
        var gameID = document.getElementById("game_id").innerText;
        var playerID = document.getElementById("player_id").innerText;


        // Set the dice on the screen to the random values returned from the backend.
        roll_dice(gameID, playerID, function(roll){

            document.getElementById("dice1").innerText = roll.dice_one;
            document.getElementById("dice2").innerText = roll.dice_two;
        });
    }

    console.log("Roll dice clicked");

});