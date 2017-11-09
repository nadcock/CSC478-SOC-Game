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
    """ Returns Game Play page based on ID"""
    if "game_id" in request.session:
        if request.matchdict['game'] != request.session["game_id"]:
            if request.matchdict['game'] in request.registry.games.games:
                request.session.invalidate()
                request.session["game_id"] = request.matchdict['game']
            else:
                raise HTTPNotFound
    else:
        if request.matchdict['game'] in request.registry.games.games:
            request.session["game_id"] = request.matchdict['game']
        else:
            raise HTTPNotFound

    response = {}
    response['game'] = request.session['game_id']
    if "player_id" in request.session:
        response['player_id'] = request.session['player_id']
    else:
        response['player_id'] = "None"
    return response
