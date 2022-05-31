import { AnimatedObject } from './objects.js';

const GRAVITY = 0.8;

const INITIAL_POSITION_X = 100;
const INITIAL_POSITION_Y = 400;


class Player extends AnimatedObject {
    constructor(canvas, sprites) {
        super(canvas.getContext('2d'), sprites, INITIAL_POSITION_X, INITIAL_POSITION_Y);
        this.canvas = canvas;
        this.scrollOffset = 0;
        this.jumping = false;
    }
    
    update() {
        super.update();
        
        if (this.position.y + this.size.height + this.velocity.y <= this.canvas.height) {
            this.velocity.y += GRAVITY;
        }
        
        if (this.velocity.y === GRAVITY || this.velocity.y === 0) {
            this.jumping = false;
        }
    }
    
    flipSprite = (speed) => {
        this.sr.changeSprite(speed);
    };
}

export default Player;