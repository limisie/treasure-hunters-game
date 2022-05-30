import Collider from './collider.js';

const INITIAL_POSITION_X = 200;
const INITIAL_POSITION_Y = 800;
const WIDTH = 200;

class Platform {
    constructor(canvas, x = INITIAL_POSITION_X, y = INITIAL_POSITION_Y, width = WIDTH) {
        this.collider = new Collider(this);
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        
        this.position = {
            x: x,
            y: y
        };
        
        this.width = width;
        this.height = 20;
    }
    
    draw() {
        this.context.fillStyle = 'blue';
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default Platform;