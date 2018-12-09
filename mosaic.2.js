"use strict"

//Canvas Properties
var canvas, ctx, canvas_width, canvas_height;

//Background Colour
var bg_colour;

//Tile Properties
var tile_size, tile_border, tile_qty, colours;

//Globals
const FPS = 30; //Frames Per Second
var tiles = []; //Empty Tile Array
var interval; //Global Interval

class Mosaic {

    //Constructor
    constructor (canvas_ID, bg_COLOUR = "#000000", tile_SIZE, tile_BORDER, tile_QTY, COLOURS) {

        //Canvas variables
        canvas = document.getElementById(canvas_ID); //Get Canvas ID
        ctx = canvas.getContext("2d"); //Get Context
        canvas_width = canvas.width; //Canvas Width
        canvas_height = canvas.height; //Canvas Height

        //Background Colour
        bg_colour = bg_COLOUR;

        //Tile Properties
        tile_size = tile_SIZE;
        tile_border = tile_BORDER;
        tile_qty = tile_QTY;
        colours = COLOURS;

        /*
            Sets up grid and draws tiles on to canvas
                - Draws Background colour
                - 
        */
        this.createGrid = function() {
            console.log(tile_qty);
            createBackground();

            insertTiles();

            drawGrid();

        }

        this.createGrid();
    

    }
    // move(time) {
    //     var tiles  = this.tiles;
    //     var ctx = this.ctx;
    //     this.interval = setInterval(function() { 
    //         moveTiles(time, tiles, ctx) 
    //     }, 1000 / this.FPS);
    // }

    // pause() {
    //     clearInterval(this.interval);
    // }
}

function createBackground() {
    ctx.fillStyle = bg_colour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function insertTiles() {
    console.log(tile_qty);
    var x, y;
    for (let i = 0; i < tile_qty; i++) {
        x = (tile_size + tile_border) * Math.floor(Math.random() * (canvas_width / tile_size)),
        y = (tile_size + tile_border) * Math.floor(Math.random() * (canvas_height / tile_size)),
        console.log("fff");
        tiles.push(newTile(x, y, colours));
    }
}

function newTile(x, y, colours) {
    var tile = {
        x: x,
        y: y,
        c: colours[Math.floor(Math.random() * colours.length)],
        o: Math.round(Math.random() * 10) / 10,
        up: true,
    };
    return tile;
}


function drawGrid() {
    //Draw Mosaic
    console.log(tiles);
    for (let i = 0; i < tiles.length; i++) {

        ctx.globalAlpha = tiles[i].o;
        ctx.fillStyle = tiles[i].c;
        ctx.fillRect(tiles[i].x, tiles[i].y, tile_size, tile_size);

        ctx.globalAlpha = 1;

        ctx.strokeStyle = "white";
        ctx.lineWidth   = 1;
        ctx.strokeRect(tiles[i].x, tiles[i].y, tile_size, tile_size);    
    }
}

var grid = new Mosaic("mosaic_canvas", "#000000", 40, 2, 400, ['#FFFFFF', '#5B95D8', '#E66A87']);
console.log(Mosaic.width);
// function moveTiles(time, tiles, ctx) {


//     var increment = 1;
//     var ceiling = 1;
//     var value = 0;

//     for (let i = 0; i < tiles.length; i++) {
//         if (tiles[i].up == true && value <= ceiling) {
//             tiles[i].o += increment / 30;

//             if (tiles[i].o >= ceiling) {
//                 tiles[i].up = false;
//             }

//         } else {
//             tiles[i].up = false;

//             tiles[i].o -= increment / 30;

//             if (tiles[i].o <= 0) {
//                 tiles[i].up = true;
//                 //changeColour(tiles[i]);
//             }
//         }

//     }

// }




// // var tiles = [];

// // //createMosaic(); 

// // // function createMosaic() {
// // //     tiles = [];
// // //     var x, y;
// // //     for (let i = 0; i < BOX_QTY; i++) {
// // //         x = (BOX_SIZE + BOX_BORDER) * Math.floor(Math.random() * (canvas.width / BOX_SIZE)),
// // //         y = (BOX_SIZE + BOX_BORDER) * Math.floor(Math.random() * (canvas.height / BOX_SIZE)),
// // //         tiles.push(newTile(x, y));
// // //     }
// // // }




// // function animate() {
// //     //Canvas Background
// //     ctx.fillStyle = "black";
// //     ctx.fillRect(0, 0, canvas.width, canvas.height);

// //     //Draw Mosaic
// //     for (let i = 0; i < tiles.length; i++) {

// //         ctx.globalAlpha = tiles[i].o;
// //         ctx.fillStyle = tiles[i].c;
// //         ctx.fillRect(tiles[i].x, tiles[i].y, BOX_SIZE, BOX_SIZE);

// //         ctx.globalAlpha = 1;

// //         ctx.strokeStyle = "white";
// //         ctx.lineWidth   = 1;
// //         ctx.strokeRect(tiles[i].x, tiles[i].y, BOX_SIZE, BOX_SIZE);    

// //     }

// //     var increment = 1;
// //     var ceiling = 1;
// //     var value = 0;

// //     // //Move Mosaic
// //     // for (let i = 0; i < tiles.length; i++) {
// //     //     if (tiles[i].up == true && value <= ceiling) {
// //     //         tiles[i].o += increment / FPS;

// //     //         if (tiles[i].o >= ceiling) {
// //     //             tiles[i].up = false;
// //     //         }

// //     //     } else {
// //     //         tiles[i].up = false;

// //     //         tiles[i].o -= increment / FPS;

// //     //         if (tiles[i].o <= 0) {
// //     //             tiles[i].up = true;
// //     //             changeColour(tiles[i]);
// //     //         }
// //     //     }

// //     // }

// // }

// // function changeColour(tile) {
// //     tile.c = colours[Math.floor(Math.random() * colours.length)];
// // }