from pyramid.view import view_config
from pyramid.response import Response
from cos.models.Game import Game
from cos.models.Game import Games
from cos.models.Player import Player

import json


@view_config(route_name='home', renderer='templates/mytemplate.jinja2')
def my_view(request):
    return {'project': 'Catan Board'}


@view_config(route_name='game', renderer='templates/game.jinja2')
def game_view(request):
    """ Returns Game Play page based on ID"""
    return {'project': 'Catan Board: Game_ID = ' + request.matchdict['game_id']}


@view_config(route_name='createGame', renderer='json')
def create_game_view(request):
    new_game = Game()
    request.registry.games.addGame(new_game)
    request.registry.games.printGames()
    return_data = {'game': {'game_id': new_game.getGameId(),
                            'player_id': new_game.getPlayer(1).getPlayerId()}}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )


@view_config(route_name='getPlayerFullStatus', renderer='json')
def get_player_full_status_view(request):
    json_body = request.json_body
    game_id = json_body['game_id']
    game = request.registry.games.getGameByID(game_id)
    return_data =   {'player_full_status':
                       {'player_count': str(game.getPlayerCount()),
                        'game_is_full': str(game.getIsGameFull())}
                    }
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )


@view_config(route_name='addPlayerToGame', renderer='json')
def add_player_to_game(request):
    json_body = request.json_body
    game_id = json_body['game_id']
    player_name = json_body['player_name']
    game = request.registry.games.getGameByID(game_id)
    player = game.addPlayer(player_name)
    if player is not None:
        return_data = {'Game':
                           {'player_count': str(game.getPlayerCount()),
                            'game_is_full': str(game.getIsGameFull())},
                       'Player':
                           {'player_id': str(player.getPlayerId()),
                            'player_name': str(player.getPlayerName())}
                       }
    else:
        return_data = {'Error': "Player not created, game is full"}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

@view_config(route_name='getPlayersInGame', renderer='json')
def get_players_in_game(request):
    json_body = request.json_body
    game_id = json_body['game_id']
    game = request.registry.games.getGameByID(game_id)
    players = []
    for player in game.getPlayers():
        players.append({'Player':
                        {'player_id': str(player.getPlayerId()),
                         'player_name': str(player.getPlayerName())}})
    return_data = {'Players': players
                   }
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

# @view_config(route_name='generate_ajax_data', renderer='json')
# def my_ajax_view(request):
#     return {'message': 'Hello World'}
