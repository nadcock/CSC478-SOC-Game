def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('game', '/game/{game_id}')
    config.add_route('createGame',          '/api/game/createGame')
    config.add_route('getPlayerFullStatus', '/api/game/getPlayerFullStatus')
    config.add_route('getPlayersInGame',    '/api/game/getPlayersInGame')
    config.add_route('addPlayerToGame',     '/api/game/addPlayerToGame')
    config.add_route('startGame',           '/api/game/startGame')
    config.add_route('waitForNewPlayers',   '/api/game/waitForNewPlayers')
    config.add_route('getGameBoard',        '/api/game/getGameBoard')
    config.add_route('setSessionWithGame',  '/api/game/setSessionWithGame')

    config.add_route('buySettlement',       '/api/player/buySettlement')
    config.add_route('waitForTurn',         '/api/player/waitForTurn')
    config.add_route('rollDice',            '/api/player/rollDice')
    config.add_route('completeTurn',        '/api/player/completeTurn')
