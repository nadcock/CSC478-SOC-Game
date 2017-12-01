def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('game', '/game/{game_id}')

    api_game_base_url = "api/game/"
    config.add_route('createGame',          api_game_base_url + 'createGame')
    config.add_route('getPlayerFullStatus', api_game_base_url + 'getPlayerFullStatus')
    config.add_route('getPlayersInGame',    api_game_base_url + 'getPlayersInGame')
    config.add_route('addPlayerToGame',     api_game_base_url + 'addPlayerToGame')
    config.add_route('startGame',           api_game_base_url + 'startGame')
    config.add_route('waitForNewPlayers',   api_game_base_url + 'waitForNewPlayers')
    config.add_route('getGameBoard',        api_game_base_url + 'getGameBoard')
    config.add_route('setSessionWithGame',  api_game_base_url + 'setSessionWithGame')

    api_player_base_url = "api/player/"
    config.add_route('getPlayer',           api_player_base_url + 'getPlayer')
    config.add_route('getTurnOptions',      api_player_base_url + 'getTurnOptions')
    config.add_route('performTurnOption',   api_player_base_url + 'performTurnOption')
    config.add_route('waitForTurn',         api_player_base_url + 'waitForTurn')

