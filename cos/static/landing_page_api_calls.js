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