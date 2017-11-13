/**
 * Created by David Meyer 11/12/17
 *
 * The purpose of DRIVER is to bring game elements together and
 * sequence specific actions to achieve game functionality.
 *
 */


/**
 * This function supports a player joining the game and waiting for other players to join.
 *
 * The sequence Starts as follows:
 * - Checks if player can join.
 * - If YES: prompts player to join.
 * - Upon joining, player then waits for additional players.
 * - Once at least 3 players have joined a game, the players can start the game
 *
 * Sequence Ends on Start Game
 *
 * Note: portions of sequence is async and event driver from UI.
 */
function player_join_driver() {

    // Call function to check if player can join game. If true, player gets prompt to join.
    player_join();

    // Player inputs player data.

    // Player clicks Join Game button.

    // Wait for players to join.



}


/**
 * This function initializes the game screen components following all of the players joining.
 */
function init_game_driver() {

    // Create the game board
    build_board();

    // Generate the game stats area
    display_score();
    display_resources();
    display_players();
    display_devcards();
    display_road_and_army();

    // Generate game action center


}


/**
 * This function creates the player turn cycle and calls all of the individual actions.
 */
function game_play_driver() {

}