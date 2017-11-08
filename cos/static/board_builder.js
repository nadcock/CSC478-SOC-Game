/**
 * Created by nickadcock on 10/13/17.
 */

var player_ID

function build_board() {
    var stage = new Konva.Stage({
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

    var layer = new Konva.Layer();

    for (var x = 0; x < board_layout.length; x++) {
        var hex_in_row = board_layout[x];

        for (var i = 0; i < hex_in_row; i++) {
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

            if (x == 0 || x == board_layout.length - 1 || i == 0 || i == board_layout[x] - 1) {
                hexagon.fill("blue")
            } else {
                var token = new Konva.Circle({
                    x: hexagon.x(),
                    y: hexagon.y(),
                    radius: hexagon.radius() / 4,
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: 1
                });

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

            var road_width = hex_radius * .78;
            var road_height = 7;

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
                        place_settlement(this.x(),this.y(), settlementX, settlementY, stage, layer, player_ID, this.ID);
                    }
                })


                var road_right_up = new Konva.Rect({
                    // x: hexagon.x() + (hex_apothem / 2) + (buffer / 2) - (road_width / 2),
                    // y: hexagon.y() + (hex_radius / 2) + (buffer / 2) - (road_height / 2),
                    x: hexagon.x() + (hex_apothem / 2) + (buffer * .4) - (road_width / 2),
                    y: settlement_area_bottom.y() - (buffer * .4)- (road_height / 2),
                    width: road_width,
                    height: road_height,
                    rotation: -30,
                    fill: 'yellow',
                    stroke: 'black',
                    strokeWidth: 1

                });

                layer.add(road_right_up);
            }

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

                //determine settlement id (room for cleaning up)
                if (x < 3 ){
                    settlement_area_right.ID = "s" + (x+1) + "," + (2*i + 2) + "";
                }
                else {
                    settlement_area_right.ID = "s" + (x+1) + "," + (2*i + 1) + "";
                }

                var road_right_up = new Konva.Rect({
                    // x: hexagon.x() + (hex_apothem / 2) + (buffer / 2) - (road_width / 2),
                    // y: hexagon.y() + (hex_radius / 2) + (buffer / 2) - (road_height / 2),
                    x: hexagon.x() - (hex_apothem / 2) - (buffer * .15) - (road_width / 2),
                    y: settlement_area_right.y() + (buffer * .15)- (road_height / 2),
                    width: road_width,
                    height: road_height,
                    rotation: 30,
                    fill: 'yellow',
                    stroke: 'black',
                    strokeWidth: 1

                });

                layer.add(road_right_up);

                layer.add(settlement_area_right);
            }
            settlement_area_right.on('mouseup', function(){
                if(settlement_area_right.getFill() == 'red'){
                    initiate_place_settlement(this.x(),this.y(), settlementX, settlementY, stage, layer, player_ID, this.ID);
                }
            })

        }
    }

    //Draws settlements on board
    //5 Settlements are able to be placed
    //Last settlement drawn is a button to trigg4567hyu46ner placing settlements
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

    get_player_info(update_settlement_color,stage, layer);


    // add the layer to the stage
    stage.add(layer);
}


//Redraw settlements with info from backend
function update_settlement_color(data,stage,layer) {
    var players = data.Players;
        var settlements = stage.find('.settlement');
        for (i = 0; i < 6; i++){
            settlements[i].fill(players[0].Player.player_color);
            layer.batchDraw();
        }
}

//Illuminates legal settlement locations for placement
//Legal locations are anywhere without a settlement placed
function mark_settlement_placement(stage,layer,placed, settlementX, settlementY) {
    //check for whether there are are remaining settlements
    var settlements = stage.find('.settlement');
    var remaining = false;
    for (i = 0; i < 5; i++){
        if (settlements[i].x() == settlementX && settlements[i].y() == settlementY){
            remaining = true;
            break;
        }

    }
    if (remaining || placed) {
        var settlement_areas = stage.find('.settlement_area');
        var color = 'red';
        if (placed) {
            color = 'orange';
        }
        for (i = 0; i < settlement_areas.length; i++) {
            settlement_areas.fill(color);
            layer.batchDraw();
        }
    }
}

//Places settlement at appropriate location
function initiate_place_settlement(x, y, settlementX, settlementY, stage, layer, player_ID, settlement_ID){
    buy_settlement(player_ID, settlement_ID, x, y, settlementX, settlementY, stage, layer, place_settlement);
}

function place_settlement(x, y, settlementX, settlementY, stage, layer) {
    var settlements = stage.find('.settlement');
    for (i = 0; i < 5; i++){
        if (settlements[i].x() == settlementX && settlements[i].y() == settlementY){
            settlements[i].x(x);
            settlements[i].y(y);
            mark_settlement_placement(stage,layer,true);
            break;
        }
    }
    layer.batchDraw();
}

function set_player_id() {
    player_ID = document.getElementById("player_id").innerText;
}
