//Gets information about players from the backend
function get_player_info (cb_func,stage,layer) {
    $.ajax({
        url: '/api/game/getPlayersInGame',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"game_id": document.getElementById("game_id").innerHTML}),
        contentType: "application/json",
        success: function (data) {
            cb_func(data, stage, layer);
        }
    })
}


//Posts information about newly constructed settlements to backend
function buy_settlement (player_ID, settlement_ID, x, y, settlementX, settlementY, stage, layer, cb_func) {
    $.ajax({
        url: '/api/player/buySettlement',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"game_id": document.getElementById("game_id").innerHTML, "player_id": player_ID, "settlement_id": settlement_ID}),
        contentType: "application/json",
        success: function () {
            cb_func(x, y, settlementX, settlementY, stage, layer);
        }
    })
}

/**
 * This function returns the count of players in the game. cbFunc is a callback.
 * @param cbFunc
 */
function get_players_in_game(cbFunc) {
    $.ajax({
        url     :   '/api/game/getPlayersInGame',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function (data) {

            var players = data.Players;

            // Callback function with player count
            cbFunc(players.length);
        }
    });
}


/**
 * This function looks up how many players are in the game and whether it is full
 *@param cbFunc
 */
function get_is_game_full(cbFunc) {
    $.ajax({
        url     :   '/api/game/getPlayerFullStatus',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function(data) {

            cbFunc(data.player_full_status);
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
function wait_for_new_players(cbFunc) {
    $.ajax({
        url     :   '/api/game/waitForNewPlayers',
        type    :   'POST',
        datatype:   'json',
        contentType :   "application/json",
        success :   function(data) {

            // Callback function to do some action
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
