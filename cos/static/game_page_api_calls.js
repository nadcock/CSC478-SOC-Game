//Gets information about players from the backend
function get_player_info (cb_func) {
    $.ajax({
        url: '/api/game/getPlayersInGame',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            cb_func(data);
        }
    })
}


//Posts information about newly constructed settlements to backend
function buy_settlement (settlement_ID, x, y, settlementX, settlementY, stage, layer, cb_func) {
    $.ajax({
        url: '/api/player/performTurnOption',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"turn_option": "buy_settlement", "settlement_id": settlement_ID}),
        contentType: "application/json",
        success: function () {
            cb_func(x, y, settlementX, settlementY, stage, layer);
        }
    })
}

//Called at the end of every turn and when player enters the game.
//Sets the turn state to true when backend returns that it is player's turn
//cb_func enters start turn state on front end
function wait_for_turn(cb_func) {
    console.log("waiting for turn");
    $.ajax({
        url: '/api/player/waitForTurn',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        success: function () {
            console.log("turn begun");
            cb_func();
        }
    })
}

//Called when player chooses to end turn
//Notifies backend that player has ended turn
//cb_func enters end turn state on front end
function complete_turn(cb_func){
    $.ajax({
        url: '/api/player/performTurnOption',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"turn_option": "end_turn"}),
        contentType: "application/json",
        success: function () {
            console.log("turn ended");
            cb_func();
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
        dataType:   'json',
        data    :   JSON.stringify({"player_name":playerName,
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
 * @param cbFunc
 */
function wait_for_new_players(cbFunc) {
    $.ajax({
        url     :   '/api/game/waitForNewPlayers',
        type    :   'POST',
        dataType:   'json',
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
function start_game() {
    $.ajax({
        url     :   '/api/game/startGame',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function(data) {

            console.log("Game has started.");
        }
    });
}

function get_turn_options(cbfunc) {
    $.ajax({
        url     :   '/api/player/getTurnOptions',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function(data) {

            cbfunc(data);
            console.log("getting_turn_options.");
        }
    });
}



/**
 * This function calls the roll dice endpoint to get two randomly selected dice.
 * @param gameID
 * @param playerID
 * @param cbFunc
 */
function roll_dice(cbFunc) {
    $.ajax({
        url     :   '/api/player/performTurnOption',
        type    :   'POST',
        dataType:   'json',
        data    :   JSON.stringify({"turn_option": "roll_dice"}),
        contentType :   "application/json",
        success :   function(data) {

            var roll = data.roll;

            cbFunc(roll);

            console.log("Player  rolled: " + roll.dice_one + " " + roll.dice_two);
        }
    });
}


/**
 * This function calls the API that returns the Game Board layout.
 * @param cbFunc
 */
function get_game_board(cbFunc) {
    console.log("call get_game_board"),
    $.ajax({
        url     :   '/api/game/getGameBoard',
        type    :   'POST',
        datatype:   'json',
        contentType :   "application/json",
        success :   function(data) {

            cbFunc(data);
        }
    });
}
