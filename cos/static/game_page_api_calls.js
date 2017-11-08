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
