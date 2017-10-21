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
    """ Creates game object
        
        Parameters
        ----------
        request: Request (does not get used)
        
        Returns
        -------
        
        Json object containing "game": {
                                    "game_id: String"
                                    "player_id: String"
                                }
        
    """
    new_game = Game()
    request.registry.games.add_game(new_game)
    request.registry.games.print_games()
    return_data = {'game': {'game_id': new_game.id,
                            'player_id': new_game.players[0].id}}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )


@view_config(route_name='getPlayerFullStatus', renderer='json')
def get_player_full_status_view(request):
    """ Determines how many players are in specified game and if the game is full

        Parameters
        ----------
        request: Request 
            - required JSON parameters: "game_id": String

        Returns
        -------

        Json object containing "player_full_status": {
                                    "player_count": Int
                                    "game_is_full": Bool
                                    }
    """
    json_body = request.json_body
    game_id = json_body['game_id']
    game = request.registry.games.games[game_id]
    return_data = {'player_full_status':
                   {'player_count': str(game.get_player_count()),
                    'game_is_full': str(game.is_game_full())}
                   }
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )


@view_config(route_name='addPlayerToGame', renderer='json')
def add_player_to_game(request):
    """ Creates a player and then adds it to the game's list of players

        Parameters
        ----------
        request: Request 
            - required JSON parameters: "game_id":      String
                                        "player_name":  String

        Returns
        -------

        Json object containing: "game": 
                                {
                                    "player_count":     Int
                                    "game_is_full":     Bool
                                }
                                "Player": 
                                {
                                    "player_id":        String
                                    "player_name":      String
                                }

    """
    json_body = request.json_body
    game_id = json_body['game_id']
    player_name = json_body['player_name']
    game = request.registry.games.games[game_id]
    player = game.add_player(player_name)
    if player is not None:
        return_data = {'game':
                       {'player_count': str(game.get_player_count()),
                        'game_is_full': str(game.is_game_full())},
                       'player':
                       {'player_id': str(player.id),
                        'player_name': str(player.name)}
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
    """ Returns a list of all players currently in specified game

        Parameters
        ----------
        request: Request 
            - required JSON parameters: "game_id": String

        Returns
        -------

        Json object containing: "Players": [
                                    "Player": 
                                    {
                                        "player_id"
                                        "player_name"
                                    } ...
                                ]

    """
    json_body = request.json_body
    game_id = json_body['game_id']
    game = request.registry.games.games[game_id]
    players = []
    for player in game.players:
        players.append({'Player':
                        {'player_id': str(player.id),
                         'player_name': str(player.name)}})
    return_data = {'Players': players}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

# @view_config(route_name='generate_ajax_data', renderer='json')
# def my_ajax_view(request):
#     return {'message': 'Hello World'}
