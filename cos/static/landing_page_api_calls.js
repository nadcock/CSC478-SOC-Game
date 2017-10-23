/**
 * Created by nickadcock on 10/18/17.
 */
function create_game() {
    $.ajax({
        url     :   '/api/game/createGame',
        type    :   'POST',
        dataType:   'json',
        success :   function (data) {
            window.location.href = '/game/' + data.game.game_id;
        }
    });
}

function get_players_count() {
    $.ajax({
        url     :   '/api/game/' + data.game.game_id + '/get_player_count',
        type    :   'GET',
        dataType:   'json',
        success :   function (data) {
            window.location.href = '/game/' + data.game.game_id + '/player_count';
        }
    })
}