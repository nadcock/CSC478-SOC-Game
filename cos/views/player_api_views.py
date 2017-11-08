from pyramid.httpexceptions import HTTPBadRequest
from pyramid.view import view_config
from pyramid.response import Response
from cos.models.Game import Game
import time
import json

@view_config(route_name='buySettlement', renderer='json')
def buy_settlement(request):
    """ Assigns the requested settelment to the buying player
        TODO: Deduct resources from player for cost of settlement
        TODO: Verify Settlement is in valid placement

        Parameters
        ----------
        request: Request
            - required JSON parameters: "game_id": String, 
                                        "player_id": String,  
                                        "settlement_id": String

        Returns
        -------
        Json object containing: "status": "success",
                                "Player":
                                    {
                                        "player_id": String
                                        "player_name": String
                                        "player_color": String
                                    },
                                "Settlement":
                                    {
                                        "settlement_id": String
                                        "settlement_color": String
                                    }
    """
    json_body = request.json_body
    if 'game_id' in request.session:
        game_id = request.session['game_id']
        game = request.registry.games.games[game_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested game not found. Session may have expired"})

    if 'player_id' in request.session:
        player_id = request.session['player_id']
        if player_id not in game.players:
            raise HTTPBadRequest(json_body={'error': 'Player found in request but not found in game.'})
        if game.current_player_id != player_id:
            raise HTTPBadRequest(json_body={'error': "Requested Player with id "
                                                     "'%s' cannot do this action when it is not their turn." % player_id})
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    if 'settlement_id' in json_body:
        settlement_id = json_body['settlement_id']
    else:
        raise HTTPBadRequest(json_body={'error': "'settlement_id' is a required parameter for this request"})

    if game.game_started is False:
        raise HTTPBadRequest(json_body={'error': "Game has not started. Settlements cannot be purchased before "
                                                 "game has started."})

    if settlement_id not in game.game_board.open_settlements:
        raise HTTPBadRequest(json_body={'error': "Requested Settlement with id "
                                                 "'%s' does not exist, or has already been purchased." % settlement_id})

    game.buy_settlement(player_id=player_id, settlement_id=settlement_id)
    player = game.players[player_id]
    return_data = {'status': 'success',
                   'Settlement': player.settlements[settlement_id].get_dictionary(),
                   'Player': player.get_dictionary(owned_settlements=True)}
    json_return = json.dumps(return_data)
    return Response(content_type='json', body=json_return)

@view_config(route_name='rollDice', renderer='json')
def roll_dice(request):
    """ Returns two dice rolls and their total

        Parameters
        ----------
        request: Request
            - required JSON parameters: "game_id": String, "player_id": String

        Returns
        -------
        Json object containing: "Roll": {
                                    "dice_one": "2",
                                    "dice_total": "5",
                                    "dice_two": "3"
                                }
    """
    if 'game_id' in request.session:
        game_id = request.session['game_id']
        game = request.registry.games.games[game_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested game not found. Session may have expired"})

    if 'player_id' in request.session:
        player_id = request.session['player_id']
        if player_id not in game.players:
            raise HTTPBadRequest(json_body={'error': 'Player found in request but not found in game.'})
        if game.current_player_id != player_id:
            raise HTTPBadRequest(json_body={'error': "Requested Player with id "
                                                     "'%s' cannot do this action when it is not their turn." % player_id})
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    roll = game.roll_dice(player_id)

    return_data = {"Roll": {
                        "dice_one":     str(roll[0]),
                        "dice_two":     str(roll[1]),
                        "dice_total":   str(roll[0] + roll[1])
                   }}
    json_return = json.dumps(return_data)
    return Response(content_type='json', body=json_return)





@view_config(route_name='completeTurn', renderer='json')
def complete_turn(request):
    """ Completes requested player's turn and sets next turn to the next player in iterator.
        Returns ploayer_id of next player in iterator

        Parameters
        ----------
        request: Request 
            - required JSON parameters: "game_id": String, "player_id": String

        Returns
        -------

        Json object containing: {"Success": Bool,
                                 "New_current_player": String}
    """
    if 'game_id' in request.session:
        game_id = request.session['game_id']
        game = request.registry.games.games[game_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested game not found. Session may have expired"})

    if 'player_id' in request.session:
        player_id = request.session['player_id']
        if player_id not in game.players:
            raise HTTPBadRequest(json_body={'error': 'Player found in request but not found in game.'})
        if game.current_player_id != player_id:
            raise HTTPBadRequest(json_body={'error': "Requested Player with id "
                                                     "'%s' cannot do this action when it is not their turn." % player_id})
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    game.take_turn()

    return_data = {"success": "True",
                   "new_current_player": game.current_player_id}
    json_return = json.dumps(return_data)
    return Response(content_type='json', body=json_return)


@view_config(route_name='waitForTurn', renderer='json')
def wait_for_turn(request):
    """ This checks if it is the requested player's turn and if so returns True, otherwise it sleeps until
        it is the players turn, at which point it returns True.

        Parameters
        ----------
        request: Request 
            - required JSON parameters: "game_id": String, "player_id": String

        Returns
        -------

        Json object containing: {"MyTurn": Bool}
    """
    if 'game_id' in request.session:
        game_id = request.session['game_id']
        game = request.registry.games.games[game_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested game not found. Session may have expired"})

    if 'player_id' in request.session:
        player_id = request.session['player_id']
        if player_id not in game.players:
            raise HTTPBadRequest(json_body={'error': 'Player found in request but not found in game.'})
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    while player_id != game.current_player_id:
        time.sleep(5)

    return_data = {"my_turn": "True"}
    json_return = json.dumps(return_data)
    return Response(content_type='json', body=json_return)
