from pyramid.httpexceptions import HTTPBadRequest
from pyramid.view import view_config
from pyramid.response import Response
from cos.models.Game import Game
import time
import json


@view_config(route_name='waitForTurn', renderer='json')
def wait_for_turn(request):
    """ This checks if it is the requested player's turn and if so returns True, otherwise it sleeps until
        it is the players turn, at which point it returns True. If it sleeps longer than 50 seconds, it will
        return False and the frontend must resubmit the request.

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

    timeout = 0
    my_turn = "True"
    while player_id != game.current_player_id:
        time.sleep(5)
        timeout += 1
        if timeout > 10:
            my_turn = "False"
            break

    return_data = {"my_turn": my_turn}
    json_return = json.dumps(return_data)
    return Response(content_type='application/json', body=json_return)


@view_config(route_name='getTurnOptions', renderer='json')
def get_turn_options(request):
    """ This returns a list of the available options that the player is allowed to make during
    their particular time of their turn

        Parameters
        ----------
        request: Request

        Returns
        -------

        Json object containing: {"success": Bool
                                 "turn_options: [String]}
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
        player = game.players[player_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    return_data = player.get_turn_options()
    return_data["success"] = "True"
    json_return = json.dumps(return_data)
    return Response(content_type='application/json', body=json_return)


@view_config(route_name='performTurnOption', renderer='json')
def perform_turn_option(request):
    """ Performs the turn option passed in request. Some turn options require further data

        Parameters
        ----------
        request: Request 
            - required JSON parameters: "turn_option": String
            - Depending on the turn option, other parameters may be required.

        Returns
        -------

        Json object containing: Depends on turn option requested
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
        player = game.players[player_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    json_body = request.json_body
    if 'turn_option' in json_body:
        turn_option = json_body['turn_option']
    else:
        raise HTTPBadRequest(json_body={'error': "Required parameter 'turn_option' not included in request"})

    return_data = player.perform_turn_option(turn_option=turn_option, game=game, data=json_body)
    json_return = json.dumps(return_data)
    return Response(content_type='application/json', body=json_return)


@view_config(route_name='getPlayer', renderer='json')
def get_player(request):
    """ Returns full player object of the player that requested it.

        Parameters
        ----------
        request: Request 

        Returns
        -------
        Json object containing: {"Player": Player}
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
        player = game.players[player_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    return_data = {"player": player.get_dictionary(player_age=True,
                                                   player_color=True,
                                                   owned_settlements=True,
                                                   player_resources=True)}
    json_return = json.dumps(return_data)
    return Response(content_type='application/json', body=json_return)


@view_config(route_name='getTradableResources', renderer='json')
def get_tradable_resources(request):
    """ Returns a list of tradable resources of specified player.

        Parameters
        ----------
        request: Request 

        Returns
        -------
        Json object containing: {"tradable_resources": [String]}
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
        player = game.players[player_id]
    else:
        raise HTTPBadRequest(json_body={'error': "Requested player not found. Session may have expired"})

    return_data = player.get_tradable_resources()
    json_return = json.dumps(return_data)
    return Response(content_type='application/json', body=json_return)