/**
 *Created by David Meyer 10/22/17
 */


jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            var $this = $(this);
            $this.toggleClass('disabled', state);
        });
    }
});


/**
 * Landing Page modal: this function checks if start game modal form has a game name. If it has,
 * then the game name is submitted and a new game is started:
 * 1) Game name
  */
$(document).on("click", "#startNewGameModalBtn", function(e){

    e.preventDefault();
    console.log("Start New Game button clicked");

    var gameName = document.startGameForm.game_name.value;

    if (gameName == "") {
        alert("Please enter a game name.");
    }
    else {
        create_game(gameName);

        $("#newGame").modal("hide");

    }
});


/**
 * Player Join Game Modal: this function checks if the modal form has been input. If it has, then the
 * following data is submitted:
 * 1) player name
 * 2) player age
  */
$(document).on("click", "#joinGameBtn", function(e){

    e.preventDefault();
    console.log("Join game button clicked");

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
        // Adds player to game and stores player ID on HTML page for reference
        add_player_to_game(gameID, playerName, playerAge, function(playerID){

            document.getElementById("player_id").innerText = playerID;
        });
        $("#newGame").modal("hide");

        // Call wait for players and prompt modal to show
        wait_for_players_to_join();
    }
});


/**
 * Clicking the start game modal button will begin the game for all players.
 * Modal is dismissed upon click.
 */
$(document).on("click", "#startGameBtn", function(e){

    $("#waitForPlayers").modal("hide");

    var gameID = document.getElementById("game_id").innerText;
    start_game(gameID);
});


/**
 * This function will add players to a game. It will:
 * 1) check if the game is full. If so, the player will be notified. If not, the player will ask to join.
 * 2) show join player modal
 * 3) submit player info to backend so player can be added to game.
 */
function player_join() {

    //var gameId = document.getElementById("game_id").innerText;

    // Call Ajax function to get players in game
    get_is_game_full(function(data){

        var gameFull = data.game_is_full;

        console.log("Is game full? " + gameFull);

        // If game is full, notify the player as such. Otherwise, provide join game form.
        if (gameFull == true) {
            alert("Sorry, game is full. Returning you to the landing page.");

            window.location.replace(window.location.origin + '/');
        }
        else {
            $("#newGame").modal({backdrop: "static"});
        }
    });
}


/**
 *  Waits for other players to join the game
 */
function wait_for_players_to_join() {

    console.log("Called: wait_for_players_to_join()");

    // Show wait for players modal
    $("#waitForPlayers").modal({backdrop: "static"});

    // Disable Start Game button while waiting for players
    $("#startGameBtn").prop('disabled', true);

    var gameID = document.getElementById("game_id").innerText;

    // Check current player count
    get_players_in_game(gameID, function(count){

        console.log("get player returned... count is " + count);

        // If game has 3 or more players, enable 'Start Game' button
        if (count >= 3) {
            $("#startGameBtn").prop('disabled', false);
        }
        else {
            // Wait for 3 or more players to join
            console.log("Current player count: " + count);

            wait_for_new_players(gameID, function(data) {

                $("#startGameBtn").prop('disabled', false);

            });
        }
    });
}
