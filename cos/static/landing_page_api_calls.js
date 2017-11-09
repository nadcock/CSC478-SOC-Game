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
        url     :   '/api/game/getPlayersInGame',
        type    :   'POST',
        dataType:   'json',
        data    :   JSON.stringify({"game_id":gameID}),
        contentType :   "application/json",
        success :   function (data) {

            var players = data.Players;

            // Callback function with player count
            cbFunc(players.length);
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
 * This function waits for players to join game and returns afterward
 * @param gameID
 * @param cbFunc
 */
function wait_for_new_players(gameID, cbFunc) {
    $.ajax({
        url     :   '/api/game/waitForNewPlayers',
        type    :   'POST',
        datatype:   'json',
        data    :   JSON.stringify({"game_id":gameID}),
        contentType :   "application/json",
        success :   function(data) {

            // Callback function to update player UI upon return
            cbFunc(data);

            console.log("Player joined game.")
        }
    });
}


/**
 * This function calls the start game endpoint to initiate the start of the
 * game.
 * @param gameID
 */
function start_game(gameID) {
    $.ajax({
        url     :   '/api/game/startGame',
        type    :   'POST',
        datatype:   'json',
        data    :   JSON.stringify({"game_id":gameID}),
        contentType :   "application/json",
        success :   function(data) {

            console.log("Game has started.")
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
        url     :   '/api/player/rollDice',
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