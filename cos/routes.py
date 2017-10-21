def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('game', '/game/{game_id}')
    config.add_route('createGame',          '/api/game/createGame')
    config.add_route('getPlayerFullStatus', '/api/game/getPlayerFullStatus')
    config.add_route('getPlayersInGame', '/api/game/getPlayersInGame')
    config.add_route('addPlayerToGame', '/api/game/addPlayerToGame')
    config.add_route('buySettlement', '/api/player/buySettlement')


