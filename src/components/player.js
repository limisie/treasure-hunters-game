import {GenericObject} from './objects.js';

const GRAVITY = 0.8;

const INITIAL_POSITION_X = 100;
const INITIAL_POSITION_Y = 400;
const INITIAL_WIDTH_Y = 30;
const INITIAL_HEIGHT_Y = 30;

class Player extends GenericObject {
    constructor(canvas, path) {
        super(canvas.getContext('2d'), path, INITIAL_POSITION_X, INITIAL_POSITION_Y);
        this.canvas = canvas;
        this.scrollOffset = 0;
        this.jumping = false;
        
        this.width = INITIAL_WIDTH_Y;
        this.height = INITIAL_HEIGHT_Y;
    }
    
    update() {
        super.update();
        
        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            this.velocity.y += GRAVITY;
        } else {
            this.velocity.y = 0;
        }
        
        if (this.velocity.y === GRAVITY || this.velocity.y === 0) {
            this.jumping = false;
        }
    }
}

export default Player;