/**
 * Created by nickadcock on 10/18/17.
 */

/**
 * This function allows a user to create a game from the landing page
 * @param gameName
 *
 * This function implements the following requirements:
 *
 * 3.1.2
 * 3.1.3
 * 3.1.3.1.1
 * 3.1.3.1.2
 */
function create_game(gameName) {
    $.ajax({
        url     :   '/api/game/createGame',
        type    :   'POST',
        dataType:   'json',
        data    :   JSON.stringify({"game_name":gameName}),
        success :   function (data) {
            window.location.href = '/game/' + data.game.game_id;
        }
    });
}

