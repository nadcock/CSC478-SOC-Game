/**
 * Created by nickadcock on 10/13/17.
 */

var stage;
var layer;


/**
 *
 * This is passed in to the server call as a call back function.
 *
 */
function board_maker(data) {

    // Create the stage for hosting the game board
    stage = new Konva.Stage({
      container: 'gameBoard',
      width: 1300,
      height: 1000
    });

    // Data returned from the backend includes:
    // - number and row of each element
    // - whether the element is a road, tile, or settlement
    // - the locations of each element
    // - tile type: water or terrain

    var hex_radius = 53;
    var hex_apothem = hex_radius * Math.sqrt(3) / 2;
    var hex_stroke_width = 1;
    var buffer = 11;
    var max_row_length = 7;
    var board_layout = [4, 5, 6, 7, 6, 5, 4];
    var settlementX = 1000;
    var settlementY = 400;

    //tileData = data.Tiles; // An array of tile data returned from the server

    layer = new Konva.Layer();

    // Create game hex board layout on a row-column basis
    // Board structure is a jagged array based on the board_layout
    for (var rowNum = 0; rowNum < board_layout.length; rowNum++) {

        var columnCount = board_layout[rowNum];

        for (var colNum = 0; colNum < columnCount; colNum++) {

            //var tileFillColor = tile_fill_color()

            var hexagon = new Konva.RegularPolygon({
                x: ((max_row_length - columnCount) * (hex_apothem + (buffer / 2))) + (colNum * (hex_apothem * 2)) + (colNum * buffer) + hex_apothem + hex_stroke_width,
                y: (rowNum * 1.5 * hex_radius) + (rowNum * buffer) + hex_radius + hex_stroke_width,
                sides: 6,
                radius: hex_radius,
                fill: "grey", //tileFillColor,
                stroke: 'black',
                strokeWidth: hex_stroke_width
                });

            layer.add(hexagon);
        }
    }

    // Add the layer to the stage
    stage.add(layer);
}


/**
 * This function returns the fill color of the tile based on the tile and/or resource type
 *
 * @param hexTile
 * @returns {string}
 */
function get_tile_fill_color(hexTile) {

    var color;

    // Tile type is either water or terrain
    // If water, default to blue
    if (hexTile.tile_type == "water") {
        color = "blue";
    }
    else {
        // Assign color based on terrain resource type
        switch(hexTile.tile_resource) {

            // Hills --> brick
            case "brick":
                color = "red";
                break;

            // Desert
            case "desert":
                color = "tan";
                break;

            // Pasture --> wool
            case "wool":
                color = "black";
                break;

            // Forest --> lumber
            case "lumber":
                color = "brown";
                break;

            // Mountains --> ore
            case "ore":
                color = "gray";
                break;

            // Fields --> grain
            case "grain":
                color = "yellow";
                break;
        };
    }

    return color;
}

/**
 * This function returns a specified Tile with all property data.
 *
 * Of note: this search function is, from a performance perspective, OK but not great.
 * The JSON returned for the Game Board is in random order and must be iterated over to
 * locate the desired hex square. Big-O worst case scenario is 37x37 loops.
 *
 * @param data (pass full JSON data object)
 * @param row
 * @param col
 * @returns {*}
 */
function get_hex_tile_data(data, row, col) {

    var result;

    // Iterate through the array to find the match
    for (var i = 0; i < data.Tiles.length; i++) {

        var lookup = "t" + row + "," + col;

        // Check for a match
        if (data.Tiles[i][lookup]) {

            result = data.Tiles[i][lookup];

            break;
        }
    }

    return result;
}

/**
 * This function initiates the game board render sequence
 */
function show_board() {

    get_game_board(function(data) {

        var hexData = get_hex_tile_data(data, 6, 2);

        console.log(hexData.tile_type);
        console.log(hexData.tile_resource);

        var color = get_tile_fill_color(hexData);
        console.log("color is: " + color);
    });
}


function build_maker() {

    // Create the stage for hosting the game board
    stage = new Konva.Stage({
      container: 'container',
      width: 1300,
      height: 1000
    });

    var hex_radius = 53;
    var hex_apothem = hex_radius * Math.sqrt(3) / 2;
    var hex_stroke_width = 1;
    var buffer = 11;
    var max_row_length = 7;
    var board_layout = [4, 5, 6, 7, 6, 5, 4];
    var token_numbers = ['8', '5', '6', '10', '4', '3', '12', '8', '11', "R", '9', '4', '9', '5', '11', '3', '6', '2', '10'];
    var settlementX = 1000;
    var settlementY = 400;

    layer = new Konva.Layer();

    // 'x' is a Row
    // 'i' is a Column

    for (var x = 0; x < board_layout.length; x++) {
        var hex_in_row = board_layout[x];

        // Iterate over each row
        for (var i = 0; i < hex_in_row; i++) {

            // ****************** HEX *********************
            var hexagon = new Konva.RegularPolygon({
                x: ((max_row_length - hex_in_row) * (hex_apothem + (buffer / 2))) + (i * (hex_apothem * 2)) + (i * buffer) + hex_apothem + hex_stroke_width,
                y: (x * 1.5 * hex_radius) + (x * buffer) + hex_radius + hex_stroke_width,
                sides: 6,
                radius: hex_radius,
                fill: 'green',
                stroke: 'black',
                strokeWidth: hex_stroke_width
                });

            layer.add(hexagon);

            // If the tile is a water tile, make it blue
            if (x == 0 || x == board_layout.length - 1 || i == 0 || i == board_layout[x] - 1) {
                hexagon.fill("blue")
            } else {

                // ****************** TOKEN TEXT *********************

                // Add a token to the tile
                // Define the token
                var token = new Konva.Circle({
                    x: hexagon.x(),
                    y: hexagon.y(),
                    radius: hexagon.radius() / 4,
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: 1
                });

                // Add text to the token to represent the tile number
                var tokenText = new Konva.Text({
                    x: token.x(),
                    y: token.y(),
                    text: token_numbers.pop(),
                    fontSize: 15,
                    fontFamily: 'Calibri Bold',
                    fontStyle: 'bold',
                    fill: 'black',
                    align: "center"
                });

                tokenText.setOffset( {
                    x: tokenText.getWidth() / 2,
                    y: tokenText.getHeight() / 2
                });

                layer.add(token);
                layer.add(tokenText);
            }


            // ****************** SETTLEMENT CIRCLE *********************
            if ((i == 0 && x < ((board_layout.length / 2) - 1))
                || (i > 0 && x < ((board_layout.length / 2) - 1))
                || (i > 0 && x < (board_layout.length - 1) && i < (hex_in_row - 1))) {

                var settlement_area_bottom = new Konva.Circle({
                    x: hexagon.x(),
                    y: hexagon.y() + hex_radius + (buffer / 2) + (hex_stroke_width / 2),
                    radius: 5,
                    fill: 'orange',
                    stroke: 'white',
                    strokeWidth: 0,
                    name: 'settlement_area'
                });

                //determine settlement id
                if (x < 3 ){
                    settlement_area_bottom.ID = "s" + (x+1) + "," + (2*i + 1) + "";
                }
                else {
                    settlement_area_bottom.ID = "s" + (x+1) + "," + (2*i) + "";
                }

                layer.add(settlement_area_bottom);

                settlement_area_bottom.on('mouseup', function(){
                    if(settlement_area_bottom.getFill() == 'red'){
                        initiate_place_settlement(this.x(),this.y(), settlementX, settlementY, stage, layer, this.ID);
                    }
                })

            }

            // ****************** SETTLEMENT CIRCLE  *********************
            if ((x == 0 && i < (hex_in_row - 1))
                || (x > 0 && x < board_layout.length - 1 && i < (hex_in_row / 2) - 1)
                || (x > 0 && i < (hex_in_row) - 1) && x < (board_layout.length - 1)
            ) {
                var settlement_area_right = new Konva.Circle({
                    x: hexagon.x() + hex_apothem + (buffer / 2),
                    y: hexagon.y() + (hex_radius / 2) + (buffer / 2) - (hex_stroke_width / 2),
                    radius: 5,
                    fill: 'orange',
                    stroke: 'white',
                    strokeWidth: 0,
                    name: 'settlement_area'
                });

                //determine settlement id
                if (x < 3 ){
                    settlement_area_right.ID = "s" + (x+1) + "," + (2*i + 2) + "";
                }
                else {
                    settlement_area_right.ID = "s" + (x+1) + "," + (2*i + 1) + "";
                }

                layer.add(settlement_area_right);
            }
            settlement_area_right.on('mouseup', function(){
                if(settlement_area_right.getFill() == 'red'){
                    initiate_place_settlement(this.x(),this.y(), settlementX, settlementY, stage, layer, this.ID);
                }
            })

        }
    }

    //Draws settlements on board
    //5 Settlements are able to be placed
    //Last settlement drawn is a button to trigger placing settlements
    for (var i = 0; i < 6; i++) {
        var settlement = new Konva.Shape({
                x: settlementX,
                y: settlementY,
           sceneFunc: function (context) {
               context.beginPath();
               context.moveTo(-7, 4);
               context.lineTo(-7, -10);
               context.lineTo(0, -17);
               context.lineTo(7, -10);
               context.lineTo(7, 4);
               context.lineTo(-7, 4);
               context.closePath();

               context.fillStrokeShape(this);
               },
               fill: 'red',
               stroke: 'black',
               strokeWidth: 1,
               name : 'settlement'
        });
        if (i==5) {
            settlement.on('mousedown', function(){
                mark_settlement_placement(stage,layer,false, settlementX, settlementY);
            })
            settlement.id('settlement_button');
        }
        layer.add(settlement);
    }


    // add the layer to the stage
    stage.add(layer);

}