from pyramid.httpexceptions import HTTPNotFound
from pyramid.view import view_config
from pyramid.response import Response
from cos.models.Game import Game
import time
import json


@view_config(route_name='home', renderer='templates/landingpage.jinja2')
def my_view(request):
    return {'project': 'Catan Board'}


@view_config(route_name='game', renderer='templates/game.jinja2')
def game_view(request):
    """ Returns Game Play page based on ID
        
        This implements requirements:
        3.2.1
    """
    if "game_id" in request.session:
        if request.matchdict['game_id'] != request.session["game_id"]:
            if request.matchdict['game_id'] in request.registry.games.games:
                request.session.invalidate()
                request.session["game_id"] = request.matchdict['game_id']
            else:
                raise HTTPNotFound
    else:
        if request.matchdict['game_id'] in request.registry.games.games:
            request.session["game_id"] = request.matchdict['game_id']
        else:
            raise HTTPNotFound

    if "player_id" not in request.session:
        player_id = "None"
    else:
        player_id = request.session['player_id']

    game = request.registry.games.get_game_by_id(request.session['game_id']).get_dictionary()

    return {'game_id': request.session['game_id'],
            'player_id': player_id,
            'game_name': game['game_name']}


@view_config(route_name='help', renderer='templates/user_manual.jinja2')
def help_view(request):
    return {'help': 'User Manual'}