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
function buy_settlement (settlement_ID, x, y, settlementX, settlementY, stage, layer, cb_func) {
    $.ajax({
        url: '/api/player/buySettlement',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"game_id": document.getElementById("game_id").innerHTML,
            "player_id": document.getElementById("player_id").innerHTML, "settlement_id": settlement_ID}),
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
        url: '/api/player/completeTurn',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        success: function () {
            console.log("turn ended");
            cb_func();
        }
    })
}

