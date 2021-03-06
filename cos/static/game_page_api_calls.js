
/**
 * This function Posts information about newly constructed settlements to backend
 * @param {function} cbFunc
 * @param {String} settlement_id
 * @param {function} x
 * @param y
 *
 * This function implements the following requirements:
 *
 * 3.4.5
 * 3.6.4
 * 3.6.5
 * 3.6.5.1.1
 * 3.6.5.1.2
 */
function buy_settlement (settlement_id, x, y, cbFunc) {
    $.ajax({
        url: '/api/player/performTurnOption',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"turn_option": "buy_settlement", "settlement_id": settlement_id}),
        contentType: "application/json",
        success: function (data) {
            update_player_resources_table(data);
            cbFunc(x, y, data.player.player_color);
            check_for_winner(end_game);
        }
    })
}

/**
 * This function is called at the end of every turn and when player enters the game.
 * Sets the turn state to true when backend returns that it is player's turn
 * cbFunc enters start turn state on front end.
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.8.1
 * 3.11.1
 */
function wait_for_turn(cbFunc) {
    $.ajax({
        url: '/api/player/waitForTurn',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            if (data.my_turn == "True") {
                displaySnackbar("It is now your turn.");
                cbFunc();
            } else {
                wait_for_turn(cbFunc)
            }
        }
    });
}

/**
 * This function is called when a settlement is placed or when the turn starts
 * Returns the name of the winner when the game ends
 * cbFunc ends game and displays winner
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.9.2
 * 3.9.3
 */
function check_for_winner(cbFunc) {
    $.ajax({
        url: '/api/game/waitForWinner',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            if (data.winner != "none") {
                cbFunc(data.winner);
            }
        }
    });
}

/**
 * This function is called when a player has the option to trade resources. It confirms that a player
 * has sufficient resources to trade and adds any tradable resources to the menu
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.10.2
 * 3.10.5
 */
function get_tradable_resources(cbFunc) {
    $.ajax({
        url: '/api/player/getTradableResources',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            cbFunc(data);
        }
    });
}

/**
 * This function is called when a player has taken the option to trade. It updates the player with the appropriate
 * resources on both the front and back end
 * @param cbFunc
 *
 * This function implements the following requirement:
 *
 * 3.10.6
 */
function perform_trade (to_trade, for_resource, cbFunc) {
    $.ajax({
        url: '/api/player/performTurnOption',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"turn_option": "trade_resource",
                              "resource_to_trade": to_trade,
                              "resource_to_receive": for_resource}),
        contentType: "application/json",
        success: function (data) {
            cbFunc(data);
        }
    })
}

/**
 * This function is called when player chooses to end turn notifies backend that player
 * has ended turn cbFunc enters end turn state on front end
 * @param cbFunc
 */
function complete_turn(cbFunc){
    $.ajax({
        url: '/api/player/performTurnOption',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"turn_option": "end_turn"}),
        contentType: "application/json",
        success: function () {
            cbFunc();
        }
    });
}


/**
 * This function returns the count of players in the game. cbFunc is a callback.
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.2.9
 * 3.2.10
 */
function get_players_in_game(cbFunc) {
    $.ajax({
        url     :   '/api/game/getPlayersInGame',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function (data) {
          // Callback function with player count
            cbFunc(data);
        }
    });
}


/**
 * This function looks up how many players are in the game and whether it is full
 *@param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.2.7
 * 3.2.8
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
 * @param playerName
 * @param playerAge
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.2.1
 * 3.2.2
 * 3.2.3
 * 3.2.4
 */
function add_player_to_game(playerName, playerAge, cbFunc) {
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
        }
    });
}


/**
 * This function waits for players to join game and returns afterward
 * @param cbFunc
 *
 * This function implements the following requirement:
 *
 * 3.2.11
 */
function wait_for_new_players(current_player_count, cbFunc) {
    $.ajax({
        url     :   '/api/game/waitForNewPlayers',
        type    :   'POST',
        dataType:   'json',
        data: JSON.stringify({current_player_count: current_player_count}),
        contentType :   "application/json",
        success :   function(data) {
            if (data.players_added == "True") {
                // Callback function to do some action
                cbFunc(data);
            } else {
                wait_for_new_players(current_player_count, cbFunc);
            }
        }
    });
}


/**
 * This function returns information about players in the game
 * @param cbFunc
 */
function get_player_info(cbFunc) {
    $.ajax({
        url     :   '/api/player/getPlayer',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function(data) {
            // Callback function to do some action
            cbFunc(data);
            update_player_resources_table(data);
        }
    });
}


/**
 * This function calls the start game endpoint to initiate the start of the
 * game.
 *
 * This function implements the following requirement:
 *
 * 3.2.12
 */
function start_game() {
    $.ajax({
        url     :   '/api/game/startGame',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function(data) {
        }
    });
}


/**
 * This function calls the getTurnOptions endpoint to get the available turn
 * options for the player
 * game.
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.8.3
 * 3.8.5
 * 3.8.6
 */
function get_turn_options(cbfunc) {
    $.ajax({
        url     :   '/api/player/getTurnOptions',
        type    :   'POST',
        dataType:   'json',
        contentType :   "application/json",
        success :   function(data) {
            cbfunc(data);
        }
    });
}



/**
 * This function calls the performTurnOptions endpoint to choose the roll dice
 * option to get two randomly selected dice.
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.7.1
 * 3.7.4
 * 3.7.4.1.1
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
            update_player_resources_table(data);
            cbFunc(roll);
        }
    });
}


/**
 * This function calls the API that returns the Game Board layout.
 * @param cbFunc
 *
 * This function implements the following requirements:
 *
 * 3.4.3
 * 3.4.4
 * 3.4.6
 * 3.4.6.1.1
 */
function get_game_board(cbFunc) {
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
