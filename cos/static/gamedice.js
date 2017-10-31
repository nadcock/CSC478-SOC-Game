/**
 * Created by David Meyer 10/29/2017
 */


/**
 * This function renders two dice on the game board
 *
 * The render will appear as two separate elements initialized to '0'
 *  --------------
 * |      |       |
 * |  5   |   3   |
 * |      |       |
 *  --------------
 *   <Roll Dice>
 */
function display_dice() {

    // Generate dice structure
    var body = document.getElementById("gamedice");
    var playerTable = document.createElement("table");
    playerTable.style.width = '100%';
    playerTable.setAttribute('border', '1');
}