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
    return {'project': request.matchdict['game_id']}


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
    game = request.registry.games.games[game_id]

    if game.game_started:
        request.response.status = 400
        return {'error': "Requested Game has already started. Players cannot be added once a game has started."}

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

    player = game.add_player(player_name, player_age)
    if player is not None:
        return_data = {'game':
                       {'player_count':     str(game.get_player_count()),
                        'game_is_full':     str(game.is_game_full())},
                       'player':
                       {'player_id':        player.id,
                        'player_name':      player.name,
                        'player_age':       player.age,
                        'player_color':     player.color}
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
                            {'player_id':           player.id,
                             'player_name':         player.name,
                             'player_age':          player.age,
                             'owned_settlements':   settlements_list_string,
                             'player_color':        player.color
                             }})
    else:
        players.append("None")
    return_data = {'Players': players,
                   'Game': {
                       'game_id':           game_id,
                       'game_has_started':  game.game_started,
                       'game_player_count': len(game.turn_order)
                   }}
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

    if game.game_started is False:
        request.response.status = 400
        return {'error': "Game has not started. Settlements cannot be purchased before game has started."}

    if game.current_player_id != player_id:
        request.response.status = 400
        return {'error': "Requested Player with id '%s' cannot do this action when it is not their turn." % player_id}

    if settlement_id not in game.game_board.open_settlements:
        request.response.status = 400
        return {'error': "Requested Settlement with id "
                         "'%s' does not exist, or has already been purchased." % settlement_id}

    game.buy_settlement(player_id=player_id, settlement_id=settlement_id)
    player = game.players[player_id]
    return_data = {'status': 'success',
                   'Settlement': player.settlements[settlement_id].get_dict(),
                   'Player':
                       {'player_id':        player.id,
                        'player_name':      player.name,
                        'player_age:':      player.age,
                        'player_color':     player.color}
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

    if game.current_player_id != player_id:
        request.response.status = 400
        return {'error': "Requested Player with id '%s' cannot do this action when it is not their turn." % player_id}

    roll = game.roll_dice(player_id)

    return_data = {"Roll": {
                        "dice_one":     str(roll[0]),
                        "dice_two":     str(roll[1]),
                        "dice_total":   str(roll[0] + roll[1])
                   }}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

@view_config(route_name='startGame', renderer='json')
def start_game(request):
    """ Starts game by setting a turn iterator in game object

            Parameters
            ----------
            request: Request 
                - required JSON parameters: "game_id": String

            Returns
            -------

            Json object containing: {"Success": Bool}
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

    if len(game.turn_order) < 3:
        request.response.status = 400
        return {'error': "You cannot start a game with less than 3 players"}

    if not game.game_started:
        game.start_game()

    return_data = {"success": "True"}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

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

    if player_id != game.current_player_id:
        request.response.status = 400
        return {'error': "Requested Player with id '%s' does not have current turn." % player_id}

    game.take_turn()

    return_data = {"success": "True",
                   "new_current_player": game.current_player_id}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

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

    while player_id != game.current_player_id:
        time.sleep(5)

    return_data = {"my_turn": "True"}
    json_return = json.dumps(return_data)
    return Response(
        content_type='json',
        body=json_return
    )

@view_config(route_name='waitForNewPlayers', renderer='json')
def wait_for_new_players(request):
    """ This returns a list of players when the player count increases.

            Parameters
            ----------
            request: Request 
                - required JSON parameters: "game_id": String

            Returns
            -------

            Same object as in get_players_in_game()
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

    player_count = len(game.turn_order)

    while (player_count < 4) and (player_count == len(game.turn_order)) and not game.game_started:
        time.sleep(5)

    return get_players_in_game(request)

@view_config(route_name='getGameBoard', renderer='json')
def get_game_board(request):
    """ Returns a game board object.

            Parameters
            ----------
            request: Request 
                - required JSON parameters: "game_id": String

            Returns
            -------
            Board object (see object for structure)
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

    json_return = json.dumps(game.game_board.get_dict())
    return Response(
        content_type='json',
        body=json_return
    )
