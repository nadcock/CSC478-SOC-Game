/**
 *Created by David Meyer 10/22/17
 */


/**
 * This function adds ability to JQuery to toggle a control as
 * 'disabled == true'
 * 'disabled == false'
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
        add_player_to_game(playerName, playerAge, function(playerID){

            document.getElementById("player_id").innerText = playerID;

             $("#newGame").modal("hide");

            // Call wait for players and prompt modal to show
            wait_for_players_to_join();
        });
    }
});


/**
 * Clicking the start game modal button will begin the game for all players.
 * Modal is dismissed upon click.
 */
$(document).on("click", "#startGameBtn", function(e){
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
    // Call Ajax function to get players in game
    get_is_game_full(function(data){

        var gameFull = data.game_is_full;

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
 *
 * @param playerCount
 */
function update_player_wait_ui(playerCount) {
    var joinCountStr = "Players joined: " + playerCount;

    document.getElementById('playerJoinCount').innerHTML = joinCountStr;

    if (playerCount >= 3) {
        $("#startGameBtn").prop('disabled', false);
    }
}

/**
 *
 * @param data
 */
function wait_for_additional_players(data) {
    var current_player_count = data.Game.game_player_count;

    // Update player UI to reflect current player count
    update_player_wait_ui(current_player_count);

    // Check if there is still room for more players and stop if game has started
    if ((current_player_count < 4) && !data.Game.game_has_started) {

        wait_for_new_players(current_player_count, wait_for_additional_players);
    }
    else {
        $("#waitForPlayers").modal("hide");

        get_player_info(function(data){
                update_player_resources_table(data);
        });
        // Initialize the player area
        init_game_driver();
    }
}


/**
 *  Waits for other players to join the game
 */
function wait_for_players_to_join() {

    // Show wait for players modal
    $("#waitForPlayers").modal({
        backdrop: "static",
        show: true
    });

    // Disable Start Game button while waiting for players
    $("#startGameBtn").prop('disabled', true);

    // Check current player count
    get_players_in_game(function(data){

        var current_player_count = data.Players.length;

        update_player_wait_ui(current_player_count);

        // Wait for 3 or more players to join
        wait_for_new_players(current_player_count, wait_for_additional_players);
    });
}
