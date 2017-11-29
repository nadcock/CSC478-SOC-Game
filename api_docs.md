# API Docs

## Game Methods:

<details> 
<summary>createGame</summary><p>
   
   This should be called on the landing page to create a game.
    
   - URL: ```/api/game/createGame```
   - **Required Parameters**: ```game_name: String```
   - Returns:    
      - ```game_id: String```
   - Example return: 
```javascript 
   { "game": {
                "game_id": "0RCDID"
   }}
```
</p></details>
<details> 
    <summary>getGameBoard</summary><p>
   
  Returns structure of the Game Board 
  
  - URL: ```/api/game/getGameBoard```
  - **Required Parameters**: ```None```
  - Returns:
    - Settlement objects array: 
       - settlement_id:
         - ```settlement_id: String``` 
         - ```settlement_color: String```
         - ```settlement_row: Int```
         - ```settlement_column: Int```
         - ```"nearby_tiles: [ String ]```
    - Road objects array:
       - road_id: 
         - ```road_id: String``` 
         - ```road_color: String```
         - ```road_row: Int```
         - ```road_column: Int```
    - Tile objects array: 
       - tile_id: 
         - ```tile_id: String```
         - ```tile_type: String``` (terrain/water)
         - ```tile_resource: String``` (wool, brick, grain, lumber, ore)
         - ```tile_row: Int```
         - ```tile_column: Int```
         - tile_token object:
            - ```tile_color: String```
            - ```tile_digit: Int```
            - ```tile_pips: Int```
      
  - Example return (not a full board object, just examples of each object type): 
```javascript 
   { "Roads": [ 
          { "r8,4": {
                  "road_column": 4,
                  "road_row": 8,
                  "road_color": "grey",
                  "road_id": "r8,4"
            } },
          { "r8,5": {
                  "road_column": 5,
                  "road_row": 8,
                  "road_color": "grey",
                  "road_id": "r8,5"
           } }],
     "Tiles": [
          { "t6,2": {
                  "tile_type": "terrain",
                  "tile_column": 2,
                  "tile_resource": "wool",
                  "tile_token": {
                               "token_color": "black",
                               "token_digit": 4,
                               "token_pips": 3
                   },
                  "tile_id": "t6,2",
                  "tile_row": 6
          }},
          { "t6,3": {
                  "tile_type": "terrain",
                  "tile_column": 3,
                  "tile_resource": "ore",
                  "tile_token": {
                               "token_color": "red",
                               "token_digit": 8,
                               "token_pips": 5
                   },
                  "tile_id": "t6,3",
                  "tile_row": 6
          }},
          { "t2,5": {
                  "tile_column": 5,
                  "tile_id": "t2,5",
                  "tile_row": 2,
                  "tile_type": "water"
           } }],
     "Settlements": [
          { "s5,6": {
                  "settlement_color": "grey",
                  "settlement_column": 6,
                  "settlement_row": 5,
                  "settlement_id": "s5,6",
                  "nearby_tiles": [
                               "t5,4",
                               "t6,3",
                               "t6,4"
                  ] } },
          { "s5,8": {
                  "settlement_color": "grey",
                  "settlement_column": 8,
                  "settlement_row": 5,
                  "settlement_id": "s5,8",
                  "nearby_tiles": [
                               "t5,5",
                               "t6,4",
                               "t6,5"
                  ] 
          } } 
   ] }
```
</p></details>

<details> 
    <summary>getPlayerFullStatus</summary><p>
   
   This should be called right when a player hits the game page, that way we can see if they are even able to participate or if the game is full
   
   - URL: ```/api/game/getPlayerFullStatus```
   - **Required Parameters**: ```None```
   - Returns:   
      - ```player_count: Int``` 
      - ```game_is_full: Bool```
      
   - Example return: 
```javascript 
    { "player_full_status":  {
                  "player_count": "2", 
                  "game_is_full": "False"
    }}
```
</p></details>
<details> 
    <summary>addPlayerToGame</summary><p>
   
   This adds a player to the game
   
   - URL: ```/api/game/addPlayerToGame```
   - **Required Parameters**:    
      - ```player_name: String```
      - ```player_age: Int```   
   - Returns:    
      - Game object:    
         - ```player_count: Int```     
         - ```game_is_full: Bool```    
      - Player object:    
         - ```player_id: String``` 
         - ```player_name: String```
         
   - Example return: 
```javascript 
   { "game":  {
                  "player_count": "2", 
                  "game_is_full": "False"
     "player":  {
                  "player_id": "XF093D", 
                  "player_name": "Player 3",
                  "player_color": "orange"
   }}
```
</p></details>
<details> 
    <summary>getPlayersInGame</summary><p>
   
   Returns a list of players currently attached to the game
   
   - URL: ```/api/game/getPlayersInGame```
   - **Required Parameters**: ```None```
   - Returns:
      - Game object:
         - ```game_id: String```
         - ```game_player_count: Int```     
         - ```game_has_started: Bool``` 
      - Player array of player objects:    
         - ```player_id: String``` 
         - ```player_name: String```
         - ```owned_settlements: [ String ]```
         - ```player_age: Int```
         
   - Example return: 
```javascript 
   { "Players":  [ 
           { "player":  {
                  "player_id": "XF093D", 
                  "player_name": "Nick",
                  "player_age": "32",
                  "owned_settlements": ["s4,5", "s5,7", "s2,7", "s2,6"],
                  "player_color": "white"
            },
            { "player":  {
                  "player_id": "IIZ892", 
                  "player_name": "Tom",
                  "player_age": "30",
                  "owned_settlements": ["s2,4"],
                  "player_color": "blue"
            },
            { "player":  {
                  "player_id": "3FD745", 
                  "player_name": "Harry",
                  "player_age": "43",
                  "owned_settlements": ["s6,2", "s3,7"],
                  "player_color": "orange"
            }
   ]}
```
</p></details>
<details> 
    <summary>waitForNewPlayers</summary><p>
   
   Waits for new players to join the game, or for the game to start, then calls /game/getPlayersInGame
   
   - URL: ```/api/game/waitForNewPlayers```
   - **Required Parameters**: ```None```
   - Returns:
      - Game object:
         - ```game_id: String```
         - ```game_player_count: Int```     
         - ```game_has_started: Bool``` 
      - Player array of player objects:    
         - ```player_id: String``` 
         - ```player_name: String```
         - ```owned_settlements: [ String ]```
         - ```player_age: Int```
         
   - Example return: 
```javascript 
   { "Game": {
          "game_id": "0RCDID",
          "game_has_started": "false",
          "game_player_count": "3"
     "Players":  [ 
           { "player":  {
                  "player_id": "XF093D", 
                  "player_name": "Nick",
                  "player_age": "32",
                  "owned_settlements": ["s4,5", "s5,7", "s2,7", "s2,6"],
                  "player_color": "white"
            },
            { "player":  {
                  "player_id": "IIZ892", 
                  "player_name": "Tom",
                  "player_age": "30",
                  "owned_settlements": ["s2,4"],
                  "player_color": "blue"
            },
            { "player":  {
                  "player_id": "3FD745", 
                  "player_name": "Harry",
                  "player_age": "43",
                  "owned_settlements": ["s6,2", "s3,7"],
                  "player_color": "orange"
            }
   ]}
```
</p></details>
<details> 
    <summary>startGame</summary><p>
   
   This should be called when all players are ready to start the game, once game is started players cannot be added
   
   - URL: ```/api/game/startGame```
   - **Required Parameters**: ```None```
   - Returns
     - ```success: Bool``` 

   - Example return: 
```javascript 
   { 
       "success": "True" 
   }
```
</p></details>
<details> 
    <summary>setSessionWithGame</summary><p>
   
   This should be called when all players are ready to start the game, once game is started players cannot be added
   
   - URL: ```/api/game/setSessionWithGame```
   - **Required Parameters**: ```game_id: String```
   - Optional Parameters: ```player_id: String```
   - Returns
     - Game object:    
         - ```player_count: Int```     
         - ```game_is_full: Bool```    
      - Player object (if player_id is included in request):    
         - ```player_id: String``` 
         - ```player_name: String```

   - Example return: 
```javascript 
   { "Game":  {
                  "player_count": "2", 
                  "game_is_full": "False"
     "Player":  {
                  "player_id": "XF093D", 
                  "player_name": "Player 3",
                  "player_color": "orange"
   }}
```
</p></details>

## Player Methods:
<details> 
    <summary>waitForTurn</summary><p>
   
   This should be called directly after a player's turn has completed or at the start of the game. It notifies the player when their turn is ready. **NOTE: This should be checked for a timeout, and if that is the case, resubmitted.** 
   
   - URL: ```/api/player/waitForTurn```
   - **Required Parameters**: ```None```
   - Returns
     - ```my_turn: Bool``` 

   - Example return: 
```javascript 
   { 
       "my_turn": "True" 
   }
```
</p></details>
<details> 
    <summary>getTurnOption</summary><p>
   
   This is called to get the turn options available for a player in a particular turn state
   
   - URL: ```/api/player/getTurnOption```
   - **Required Parameters**: ```None```
   - Returns
     - ```"turn_options": [String]```
   - Example return: 
```javascript 
   { "turn_options": [
           "roll_dice",
           "buy_settlement",
           "end_turn"]
   }
```
</p></details>
<details> 
    <summary>performTurnOption</summary><p>
   
   This should be called when buying (or assigning) a settlement to a player
   
   - URL: ```/api/player/performTurnOption```
   - **Required Parameters**:
      - ```turn_option: String```
   - Optional Parameters (may be required for some turn options):
      - If turn_option is "buy_settlement":
         - ```settlement_id: String```
   - Returns:
      - success object
         - ```success: Bool``` ("True" or "False")
      - Other optional return params depend on the turn_option specified in request
      
</p></details>
<details> 
    <summary>getPlayer</summary><p>
   
   This returns the player object of the player that requested it
   
   - URL: ```/api/player/getPlayer```
   - **Required Parameters**: ```None```
   - Returns
     - player object:    
         - ```player_id: String``` 
         - ```player_name: String```
         - ```owned_settlements: [ String ]```
         - ```player_age: Int```

   - Example return: 
```javascript 
   { "player":  {
                  "player_id": "XF093D", 
                  "player_name": "Nick",
                  "player_age": "32",
                  "owned_settlements": ["s4,5", "s5,7", "s2,7", "s2,6"],
                  "player_color": "white"
   }}
```
</p></details>
