import Collider from './collider.js';

const INITIAL_POSITION_X = 128;
const INITIAL_POSITION_Y = 512;
const WIDTH = 270;
const MAX_VELOCITY = 8;
const FRICTION = 0.8;

class Platform {
    constructor(context, imagePath, x = INITIAL_POSITION_X, y = INITIAL_POSITION_Y, width = WIDTH) {
        this.collider = new Collider(this);
        this.context = context;
        
        this.image = new Image();
        this.image.src = imagePath;
        
        this.width = WIDTH;
        this.height = 20;
        
        this.position = {
            x: x,
            y: y
        };
        this.velocity = {
            x: 0, y: 0
        };
    }
    
    update() {
        this.position.x += this.velocity.x;
    }
    
    addVelocity(x) {
        if (-MAX_VELOCITY < this.velocity.x && this.velocity.x < MAX_VELOCITY) this.velocity.x += x;
    }
    
    draw() {
        this.context.drawImage(this.image, this.position.x, this.position.y);
    }
    
    stop() {
        this.velocity.x *= FRICTION;
    }
}

export default Platform;