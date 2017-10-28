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

            //console.log("returned data: " + data);
            var players = data.Players

            //var name = players[0].Player.player_name;
            //name += players.length;

            //print("Number of players in game: " + players.length);

            //document.getElementById("playerName0").textContent = name;
            //document.getElementById("playerName0").textContent = players[0].Player.player_name;

            // Callback function returns number of players
            cbFunc(players.length);
        }
    })
}