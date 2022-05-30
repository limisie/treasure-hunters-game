const GRAVITY = 0.8;
const FRICTION = 0.9;

const INITIAL_POSITION_X = 100;
const INITIAL_POSITION_Y = 400;
const INITIAL_WIDTH_Y = 30;
const INITIAL_HEIGHT_Y = 30;
const MAX_VELOCITY = 10;

class Player {
    constructor(canvas) {
        this.maxVelocity = MAX_VELOCITY;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.scrollOffset = 0;
        
        this.position = {
            x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y
        };
        this.velocity = {
            x: 0, y: 0
        };
        
        this.width = INITIAL_WIDTH_Y;
        this.height = INITIAL_HEIGHT_Y;
    }
    
    draw() {
        this.context.fillStyle = 'red';
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    
    update() {
        this.draw();
        
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        
        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            this.velocity.y += GRAVITY;
        } else {
            this.velocity.y = 0;
        }
    }
    
    addVelocity(x, y) {
        if (this.velocity.x < MAX_VELOCITY && this.velocity.x > -MAX_VELOCITY) this.velocity.x += x;
        if (this.velocity.y < MAX_VELOCITY && this.velocity.y > -MAX_VELOCITY) this.velocity.y += y;
    }
    
    stop() {
        this.velocity.x *= FRICTION;
    }
}

export default Player;