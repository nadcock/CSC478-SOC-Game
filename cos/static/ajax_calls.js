
function get_player_info (){
    $.ajax({
            url     : '/api/game/getPlayersInGame',
            type    : 'POST',
            dataType: 'json',
            data    : JSON.stringify({"game_id" : "BLACK"}),
            contentType: "application/json",
            success : function (data) {

                var players = data.Players;
                for (i = 0; i < 3; i++) {
                    var elm = document.getElementById("player_name" + i);
                    elm.innerText = players[i].Player.player_name;
                    elm.style.color = players[i].Player.player_color;
                }
            }
        })
}

function get_player_color_info (stage, layer){
    $.ajax({
            url     : '/api/game/getPlayersInGame',
            type    : 'POST',
            dataType: 'json',
            data    : JSON.stringify({"game_id" : "BLACK"}),
            contentType: "application/json",
            success : function (data) {

                var players = data.Players;
                var settlements = stage.find('.settlement');
                for (i = 0; i < 5; i++){
                    settlements[i].fill(players[0].Player.player_color);
                    layer.batchDraw();
                }
            }
        })
}