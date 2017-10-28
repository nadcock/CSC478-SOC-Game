/**
 *Created by David Meyer 10/22/17
 */

/**
 * This function checks if the modal form has been input. If it has, then the following data is submitted:
 * 1) player name
 * 2) player age
  */

$("#startGameBtn").on("click", function(e){

    console.log("start game button clicked");

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
        document.joinForm.submit();

    }
});





/**
 * Submits the join player to add player to game
 * @param name
 * @param age
 */
function submit_join_player_modal() {

    var gameId = document.getElementById("game_id").innerText;

    var form = $('#joinForm').serializeArray();

    console.log(form[0]);
    console.log(form[1]);

    add_player_to_game(gameId, "David");
}


$(document).ready(function () {
   $("#joinForm").submit(function(event) {
       event.preventDefault();

       var gameID = document.getElementById("game_id").innerText;
       var playerName = $('#player_name').val();

       console.log(gameID + " " + playerName);

       add_player_to_game(gameID, playerName);

    });
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

        //count +=3;
        // If game is full, notify the player as such. Otherwise, provide join game form.
        if (count >= 4) {
            alert("Sorry, game is full. Returning you to the landing page.");
            window.location.replace(window.location.origin + '/');

        }
        else {
            alert("Current player count: " + count);

            var modal = document.getElementById("newGame");
            modal.style.display = "block"
        }
    });
}
