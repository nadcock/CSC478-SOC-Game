/**
 *Created by David Meyer 10/22/17
 */

/**
 * This function checks if the modal form has been input. If it has, then the following data is submitted:
 * 1) player name
 * 2) player age
  */
$(document).on("click", "#startGameBtn", function(e){

    e.preventDefault();
    console.log("start game button clicked");

    var gameID = document.getElementById("game_id").innerText;
    var playerName = document.joinForm.player_name.value;
    var playerAge = document.joinForm.player_age.value;

    if (playerName == "") {
        alert("Please enter player name.");
    }
    else if (playerAge < 5 || playerAge > 120) {
        alert("Please enter an age between 5 and 120.")
    }
    else {
        //document.joinForm.submit();
        add_player_to_game(gameID, playerName);
        $("#newGame").modal("hide");
    }
});

/**
 * This function will add players to a game. It will:
 * 1) check if the game is full. If so, the player will be notified. If not, the player will ask to join.
 * 2) show join player modal
 * 3) submit player info to backend so player can be added to game.
 */
function player_join() {

    var gameId = document.getElementById("game_id").innerText;

    // Call Ajax function to get players in game
    get_players_in_game(gameId, function(count){

        // If game is full, notify the player as such. Otherwise, provide join game form.
        if (count >= 4) {
            alert("Sorry, game is full. Returning you to the landing page.");

            window.location.replace(window.location.origin + '/');
        }
        else {
            console.log("Current player count: " + count);

            $("#newGame").modal({backdrop: "static"});
        }
    });
}
