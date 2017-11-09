/**
 * Created by nickadcock on 10/18/17.
 */
function create_game(gameName) {
    $.ajax({
        url     :   '/api/game/createGame',
        type    :   'POST',
        dataType:   'json',
        data    :   JSON.stringify({"game_name":gameName}),
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
        url     :   '/api/game/getPlayerFullStatus',
        type    :   'POST',
        dataType:   'json',
        data    :   JSON.stringify({"game_id":gameID}),
        contentType :   "application/json",
        success :   function (data) {

            var is_full = data.game_is_full;

            // Callback function with player count
            cbFunc(is_full, data.player_count);
        }
    });
}


/**
 * This function passes in player information to the backend to add new player
 * to the game. It takes in the following parameters:
 * @param gameID
 * @param playerName
 */
function add_player_to_game(gameID, playerName, playerAge, cbFunc) {
    $.ajax({
        url     :   '/api/game/addPlayerToGame',
        type    :   'POST',
        datatype:   'json',
        data    :   JSON.stringify({"game_id":gameID,
                                    "player_name":playerName,
                                    "player_age":playerAge}),
        contentType :   "application/json",
        success :   function(data) {

            var player = data.player;

            // Callback function to store player ID
            cbFunc(player.player_id);

            console.log("Player ID added to game: " + player.player_id);
        }
    });
}


/**
 * This function calls the roll dice endpoint to get two randomly selected dice.
 * @param gameID
 * @param playerID
 * @param cbFunc
 */
function roll_dice(gameID, playerID, cbFunc) {
    $.ajax({
        url     :   '/api/game/rollDice',
        type    :   'POST',
        datatype:   'json',
        data    :   JSON.stringify({"game_id":gameID,
                                    "player_id":playerID}),
        contentType :   "application/json",
        success :   function(data) {

            var roll = data.Roll;

            cbFunc(roll);

            console.log("Player " + playerID + " rolled: " + roll.dice_one + " " + roll.dice_two);
        }
    });
}