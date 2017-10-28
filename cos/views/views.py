from pyramid.view import view_config
from pyramid.response import Response
from cos.models.Game import Game
import json


@view_config(route_name='home', renderer='templates/landingpage.jinja2')
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
        request: Request 
            - required JSON parameters: "game_name": String
        
        Returns
        -------
        
        Json object containing "game": {
                                    "game_id: String"
                                }
    """
    json_body = request.json_body
    if 'game_name' in json_body:
        game_name = json_body['game_name']
    else:
        request.response.status = 400
        return {'error': "'game_name' is a required parameter for this request"}
    new_game = Game(game_name)
    request.registry.games.add_game(new_game)
    request.registry.games.print_games()
    return_data = {'game': {
                        'game_id': new_game.id,
                        'game_name': new_game.name
                  }}
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
    if 'game_id' in json_body:
        game_id = json_body['game_id']
    else:
        request.response.status = 400
        return {'error': "'game_id' is a required parameter for this request"}

    if game_id not in request.registry.games.games:
        request.response.status = 400
        return {'error': "Requested Game with id '%s' does not exist." % game_id}

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
                                        "player_age": Int

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
                                    "player_color":     String
                                    "player_age:        Int
                                }

    """
    json_body = request.json_body
    if 'game_id' in json_body:
        game_id = json_body['game_id']
    else:
        request.response.status = 400
        return {'error': "'game_id' is a required parameter for this request"}

    if game_id not in request.registry.games.games:
        request.response.status = 400
        return {'error': "Requested Game with id '%s' does not exist." % game_id}

    if 'player_name' in json_body:
        player_name = json_body['player_name']
    else:
        request.response.status = 400
        return {'error': "'player_name' is a required parameter for this request"}

    if 'player_age' in json_body:
        player_age = json_body['player_age']
    else:
        request.response.status = 400
        return {'error': "'player_age' is a required parameter for this request"}

    game = request.registry.games.games[game_id]
    player = game.add_player(player_name, player_age)
    if player is not None:
        return_data = {'game':
                       {'player_count': str(game.get_player_count()),
                        'game_is_full': str(game.is_game_full())},
                       'player':
                       {'player_id': player.id,
                        'player_name': player.name,
                        'player_age': player.age,
                        'player_color': player.color}
                       }
    else:
        request.response.status = 400
        return {'Error': "Player not created, game is full"}
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
                                        "player_id": String
                                        "player_name": String
                                        "player_color": String
                                        "player_age": Int
                                    } ...
                                ]

    """
    json_body = request.json_body
    if 'game_id' in json_body:
        game_id = json_body['game_id']
    else:
        request.response.status = 400
        return {'error': "'game_id' is a required parameter for this request"}

    if game_id not in request.registry.games.games:
        request.response.status = 400
        return {'error': "Requested Game with id '%s' does not exist." % game_id}

    game = request.registry.games.games[game_id]
    players = []
    if game.players:
        for id, player in game.players.iteritems():
            settlements_list_string = ''
            if player.settlements:
                for key, val in player.settlements.iteritems():
                    settlements_list_string = settlements_list_string + "(" + key + ") "
            else:
                settlements_list_string = 'None'
            players.append({'Player':
                            {'player_id': player.id,
                             'player_name': player.name,
                             'player_age': player.age,
                             'owned_settlements': settlements_list_string,
                             'player_color': player.color
                             }})
    else:
        players.append("None")
    return_data = {'Players': players}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

@view_config(route_name='buySettlement', renderer='json')
def buy_settlement(request):
    """ Assigns the requested settelment to the buying player
        TODO: Deduct resources from player for cost of settlement
        TODO: Verify Settlement is in valid placement

            Parameters
            ----------
            request: Request 
                - required JSON parameters: "game_id": String, "player_id": String, and "settlement_id": String

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
    if 'game_id' in json_body:
        game_id = json_body['game_id']
    else:
        request.response.status = 400
        return {'error': "'game_id' is a required parameter for this request"}

    if game_id not in request.registry.games.games:
        request.response.status = 400
        return {'error': "Requested Game with id '%s' does not exist." % game_id}
    game = request.registry.games.games[game_id]

    if 'player_id' in json_body:
        player_id = json_body['player_id']
    else:
        request.response.status = 400
        return {'error': "'player_id' is a required parameter for this request"}

    if 'settlement_id' in json_body:
        settlement_id = json_body['settlement_id']
    else:
        request.response.status = 400
        return {'error': "'settlement_id' is a required parameter for this request"}

    if player_id not in game.players:
        request.response.status = 400
        return {'error': "Requested Player with id '%s' does not exist in this Game." % player_id}

    if settlement_id not in game.game_board.open_settlements:
        request.response.status = 400
        return {'error': "Requested Settlement with id "
                         "'%s' does not exist, or has already been purchased." % settlement_id}

    game.buy_settlement(player_id=player_id, settlement_id=settlement_id)
    player = game.players[player_id]
    nearby_tiles = str(player.settlements[settlement_id].nearby_tiles).strip('[]')
    return_data = {'status': 'success',
                   'Settlement':
                       {'settlement_id': player.settlements[settlement_id].id,
                        'nearby_tiles': nearby_tiles,
                        'settlement_color': player.settlements[settlement_id].color},
                   'Player':
                       {'player_id': player.id,
                        'player_name': player.name,
                        'player_age:': player.age,
                        'player_color': player.color}
                   }
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

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
    json_body = request.json_body
    if 'game_id' in json_body:
        game_id = json_body['game_id']
    else:
        request.response.status = 400
        return {'error': "'game_id' is a required parameter for this request"}

    if game_id not in request.registry.games.games:
        request.response.status = 400
        return {'error': "Requested Game with id '%s' does not exist." % game_id}
    game = request.registry.games.games[game_id]

    if 'player_id' in json_body:
        player_id = json_body['player_id']
    else:
        request.response.status = 400
        return {'error': "'player_id' is a required parameter for this request"}

    if player_id not in game.players:
        request.response.status = 400
        return {'error': "Requested Player with id '%s' does not exist in this Game." % player_id}

    roll = game.roll_dice(player_id)

    return_data = {"Roll": {
                        "dice_one": str(roll[0]),
                        "dice_two": str(roll[1]),
                        "dice_total": str(roll[0] + roll[1])
                   }}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

# @view_config(route_name='generate_ajax_data', renderer='json')
# def my_ajax_view(request):
#     return {'message': 'Hello World'}
