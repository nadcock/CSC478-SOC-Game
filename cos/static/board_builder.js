/**
 * Created by nickadcock on 10/13/17.
 */

function build_board() {
    var stage = new Konva.Stage({
      container: 'container',
      width: 1000,
      height: 1000
    });

    var hex_radius = 53;
    var hex_apothem = hex_radius * Math.sqrt(3) / 2;
    var hex_stroke_width = 1;
    var buffer = 11;
    var max_row_length = 7;
    var board_layout = [4, 5, 6, 7, 6, 5, 4];
    var token_numbers = ['8', '5', '6', '10', '4', '3', '12', '8', '11', "R", '9', '4', '9', '5', '11', '3', '6', '2', '10'];
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
                    fill: 'red',
                    stroke: 'white',
                    strokeWidth: 0
                });

                layer.add(settlement_area_bottom);

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
                    fill: 'red',
                    stroke: 'white',
                    strokeWidth: 0
                });

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

        }
    }


    // add the layer to the stage
    stage.add(layer);
}