/**
 * Created by nickadcock on 10/18/17.
 */
function create_game() {
    $.ajax({
        url     :   '/api/game/createGame',
        type    :   'GET',
        dataType:   'json',
        success :   function (data) {
            var game_data = JSON.parse(data);
            console.log(data)
            window.location.href = '/game/' + game_data.game.game_id;
        }
    });
}