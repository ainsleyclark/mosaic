"use strict"

//Globals
const FPS = 60; //Frames Per Second
var interval;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

class Mosaic {

    constructor ({
        canvas_id, 
        bg_colour = "#000000", 
        tile_size, 
        tile_border, 
        tile_qty, 
        tile_stroke,
        tile_stroke_colour,
        colours
    }) {
        //Canvas variables
        this._canvas = document.getElementById(canvas_id); //Get Canvas ID
        this._ctx = this._canvas.getContext("2d"); //Get Context
        this._canvas_width = this._canvas.width; //Canvas Width
        this._canvas_height = this._canvas.height; //Canvas Height

        //Background Colour
        this._bg_colour = bg_colour;

        //Tile Properties
        this._tile_size = tile_size;
        this._tile_border = tile_border;
        this._tile_qty = tile_qty;
        this._tile_stroke = tile_stroke;
        this._tile_stroke_colour = tile_stroke_colour;
        this._colours = colours;

        //Main Tile Array
        this.tiles = [];
    }

    /*
        Sets up grid and draws tiles on to canvas
            - Draws Background colour
            - 
    */
    createGrid() {
        //Draw Background
        this._ctx.fillStyle = this._bg_colour;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

        for (let i = 0; i < this._tile_qty; i++) {
            this.pushTiles();
        }
    }

    pushTiles() {
        var x, y;
        x = (this._tile_size + this._tile_border) * Math.floor(Math.random() * (this._canvas_width / this._tile_size)),
        y = (this._tile_size + this._tile_border) * Math.floor(Math.random() * (this._canvas_height / this._tile_size)),
        this.tiles.push(newTile(x, y, this._colours));
    }

    drawGrid() {
        
        // //Draw Mosaic
        // for (let i = 0; i < this.tiles.length; i++) {

        //     //this._ctx.rotate(25*Math.PI/180);
        //     this._ctx.globalAlpha = this.tiles[i].o;

        //     this._ctx.fillStyle = this.tiles[i].c;
        //     this._ctx.fillRect(this.tiles[i].x, this.tiles[i].y, this._tile_size, this._tile_size);

        //     if(this._tile_stroke > 0) {
        //         this._ctx.globalAlpha = 1;
        //         this._ctx.strokeStyle = this._tile_stroke_colour;;
        //         this._ctx.lineWidth  = this._tile_stroke;
        //         //this._ctx.strokeRect(this.tiles[i].x, this.tiles[i].y, this._tile_size, this._tile_size);  
        //     }

        // }
    }
    
    move(timestamp) {

        this._ctx.clearRect(0, 0, innerWidth, innerHeight);
        this._ctx.fillStyle = this._bg_colour;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        
        for (let i = 0; i < this.tiles.length; i++) {
            
           
            if (this.tiles[i].o <= 0) {
                this.tiles.splice(i, 1);
                this.pushTiles();
                
            }

            if (i % (Math.floor(this._tile_qty / 100))  == 0) {
                if (this.tiles[i].up == false) {
                    
                }
                this.tiles[i].up = false;
                this.tiles[i].o -= Math.random() / FPS / 20;
    
            }

            //Shadow
            this._ctx.shadowOffsetX = 4;
            this._ctx.shadowOffsetY = 4;
            this._ctx.shadowBlur = 4;
            this._ctx.shadowColor="black";


            this._ctx.fillStyle = "rgba(" + hexToRgb(this.tiles[i].c) + this.tiles[i].o + ")";
            this._ctx.fillRect(this.tiles[i].x, this.tiles[i].y, this._tile_size, this._tile_size);
            
            if(this._tile_stroke > 0) {
                this._ctx.strokeStyle = "rgba(" + hexToRgb(this._tile_stroke_colour) + this.tiles[i].o + ")";
                this._ctx.lineWidth  = this._tile_stroke;
                this._ctx.strokeRect(this.tiles[i].x, this.tiles[i].y, this._tile_size, this._tile_size);  
            }

            //this._ctx.rotate(45*Math.PI/180);

        }

        setInterval(this.move.bind(this), 1000 / FPS);
        //interval = requestAnimationFrame(this.move.bind(this));
    }


    pause() {
        cancelAnimationFrame(interval);    
    }

    play() {
        this.move();
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

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    // var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    // hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    //     return r + r + g + g + b + b;
    // });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ", ";
}




var grid = new Mosaic({
    canvas_id: "mosaic_canvas", 
    bg_colour: "#000000", 
    tile_size: 50, 
    tile_border: 0, 
    tile_qty: 500, 
    tile_stroke: 0,
    tile_stroke_colour: ['#FFFFFF'],
    colours:['#FFFFFF', '#5B95D8', '#E66A87']
});

grid.createGrid();
grid.drawGrid();
grid.move(3);

// setTimeout(function(){ 
//     grid.pause();
// }, 3000);

// setTimeout(function(){ 
//     grid.play();
// }, 6000);
//grid.move(10);
