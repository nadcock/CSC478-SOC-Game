from pyramid.view import view_config
from cos.models.Game import Game
from cos.models.Game import Games
from cos.models.Player import Player

import json


@view_config(route_name='home', renderer='templates/mytemplate.jinja2')
def my_view(request):
    return {'project': 'Catan Board'}

@view_config(route_name='game', renderer='templates/game.jinja2')
def game_view(request):
    return {'project': 'Catan Board: Game_ID = ' + request.matchdict['game_id']}

@view_config(route_name='createGame', renderer='json')
def create_game_view(request):
    new_game = Game()
    request.registry.games.addGame(new_game)
    request.registry.games.printGames()
    return_data = {'game': {'game_id': new_game.getGameId(),
                   'player_id': new_game.getFirstPlayer().getPlayerId()}}
    json_return = json.dumps(return_data)
    return json_return


# @view_config(route_name='generate_ajax_data', renderer='json')
# def my_ajax_view(request):
#     return {'message': 'Hello World'}
