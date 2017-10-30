
//Gets information about players from the backend
function get_player_info (cb_func,stage,layer) {
    $.ajax({
        url: '/api/game/getPlayersInGame',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({"game_id": "BLACK"}),
        contentType: "application/json",
        success: function (data) {
            cb_func(data, stage, layer);
        }
    })
}