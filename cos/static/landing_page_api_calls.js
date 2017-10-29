/**
 * Created by nickadcock on 10/18/17.
 */
function create_game() {
    $.ajax({
        url     :   '/api/game/createGame',
        type    :   'POST',
        dataType:   'json',
        success :   function (data) {
            window.location.href = '/game/' + data.game.game_id;
        }
    });
}

/**
 * This function returns the count of players in the game. cbFunc is a callback.
 * @param gameID
 * @param cbFunc
 */
function get_players_in_game(gameID, cbFunc) {
    $.ajax({
        url     :   '/api/game/getPlayersInGame',
        type    :   'POST',
        dataType:   'json',
        data    :   JSON.stringify({"game_id":gameID}),
        contentType :   "application/json",
        success :   function (data) {

            var players = data.Players;

            // Callback function with player count
            cbFunc (players.length);
        }
    });
}

/**
 * This function passes in player information to the backend to add new player
 * to the game. It takes in the following parameters:
 * @param gameID
 * @param playerName
 */
function add_player_to_game(gameID, playerName) {
    $.ajax({
        url     :   '/api/game/addPlayerToGame',
        type    :   'POST',
        datatype:   'json',
        data    :   JSON.stringify({"game_id":gameID, "player_name":playerName}),
        contentType :   "application/json",
        success :   function(data) {

            console.log("Player added to game: " + playerName);

        }
    });
}