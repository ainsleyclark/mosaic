
/****************************************
        
CONSTANTS! USE THIS TO MODIFY THE GRID

****************************************/

//Constants
const FPS = 30; //Frames Per Second
const BOX_SIZE = 40; //How big each box between 0.1 & 1
const BOX_BORDER = 2; //Space between boxes in pixels
const BOX_QTY = 400; //Amount of boxes on canvas at once

var colours = ['#FFFFFF', '#5B95D8', '#E66A87'];
//var colours = ['#FFFFFF'];


class Mosaic {
    constructor (canvas_id, bg_colour = "#000000", tile_size, tile_border, tile_quantity, {colours}) {

        this.canvas_id = canvas_id;
        this.bg_colour = bg_colour;
        this.tile_size = tile_size;
        this.tile_border = tile_border;
        this.tile_quantity = tile_quantity;
        this.colours = colours;
        this.tiles = [];

        this.createGrid = function() {
            //Set up properties
            var canvas = document.getElementById("mosaic_canvas");
            var ctx = canvas.getContext("2d");
            var height = canvas.height;
            var width = canvas.width;

            this.tiles = [];
            var x, y;
            for (let i = 0; i < BOX_QTY; i++) {
                x = (BOX_SIZE + BOX_BORDER) * Math.floor(Math.random() * (canvas.width / BOX_SIZE)),
                y = (BOX_SIZE + BOX_BORDER) * Math.floor(Math.random() * (canvas.height / BOX_SIZE)),
                this.tiles.push(newTile(x, y));
            }
        }

        this.createGrid();
    }

    animate() {
        //Canvas Background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Draw Mosaic
        for (let i = 0; i < this.tiles.length; i++) {

            ctx.globalAlpha = this.tiles[i].o;
            ctx.fillStyle = this.tiles[i].c;
            ctx.fillRect(this.tiles[i].x, this.tiles[i].y, BOX_SIZE, BOX_SIZE);

            ctx.globalAlpha = 1;

            ctx.strokeStyle = "white";
            ctx.lineWidth   = 1;
            ctx.strokeRect(this.tiles[i].x, this.tiles[i].y, BOX_SIZE, BOX_SIZE);    

        }
    }
}

var grid = new Mosaic("mosaic_canvas", "#000000", 40, 2, 400, ['#FFFFFF', '#5B95D8', '#E66A87']);



//setInterval(animate, 1000 / FPS);


var tiles = [];

//createMosaic(); 

// function createMosaic() {
//     tiles = [];
//     var x, y;
//     for (let i = 0; i < BOX_QTY; i++) {
//         x = (BOX_SIZE + BOX_BORDER) * Math.floor(Math.random() * (canvas.width / BOX_SIZE)),
//         y = (BOX_SIZE + BOX_BORDER) * Math.floor(Math.random() * (canvas.height / BOX_SIZE)),
//         tiles.push(newTile(x, y));
//     }
// }

function newTile(x, y) {
    var tile = {
        x: x,
        y: y,
        c: colours[Math.floor(Math.random() * colours.length)],
        o: Math.round(Math.random() * 10) / 10,
        up: true,
    };
    return tile;
}

function animate() {
    //Canvas Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Draw Mosaic
    for (let i = 0; i < tiles.length; i++) {

        ctx.globalAlpha = tiles[i].o;
        ctx.fillStyle = tiles[i].c;
        ctx.fillRect(tiles[i].x, tiles[i].y, BOX_SIZE, BOX_SIZE);

        ctx.globalAlpha = 1;

        ctx.strokeStyle = "white";
        ctx.lineWidth   = 1;
        ctx.strokeRect(tiles[i].x, tiles[i].y, BOX_SIZE, BOX_SIZE);    

    }

    var increment = 1;
    var ceiling = 1;
    var value = 0;

    // //Move Mosaic
    // for (let i = 0; i < tiles.length; i++) {
    //     if (tiles[i].up == true && value <= ceiling) {
    //         tiles[i].o += increment / FPS;

    //         if (tiles[i].o >= ceiling) {
    //             tiles[i].up = false;
    //         }

    //     } else {
    //         tiles[i].up = false;

    //         tiles[i].o -= increment / FPS;

    //         if (tiles[i].o <= 0) {
    //             tiles[i].up = true;
    //             changeColour(tiles[i]);
    //         }
    //     }

    // }

}

function changeColour(tile) {
    tile.c = colours[Math.floor(Math.random() * colours.length)];
}