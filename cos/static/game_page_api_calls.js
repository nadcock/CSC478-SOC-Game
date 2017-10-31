//Gets information about players from the backend
function get_player_info (cb_func,stage,layer) {
    $.ajax({
        url: '/api/game/getPlayersInGame',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"game_id": "GAME1"}),
        contentType: "application/json",
        success: function (data) {
            cb_func(data, stage, layer);
        }
    })
}