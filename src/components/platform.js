import Collider from './collider.js';

const INITIAL_POSITION_X = 200;
const INITIAL_POSITION_Y = 400;
const MAX_VELOCITY = 8;
const FRICTION = 0.8;

export class GenericObject {
    constructor(context,
                path,
                x = 0,
                y = 0) {
        this.context = context;
        
        this.image = new Image();
        this.image.src = path;
        
        this.position = {
            x: x,
            y: y
        };
    }
    
    update() {
        this.draw();
    }
    
    draw() {
        this.context.drawImage(this.image, this.position.x, this.position.y);
    }
}

export class Platform extends GenericObject {
    constructor(context,
                {path, width},
                x = INITIAL_POSITION_X,
                y = INITIAL_POSITION_Y) {
        super(context, path, x, y);
        
        this.collider = new Collider(this);
        
        this.width = width;
        this.height = 20;
        
        this.velocity = {
            x: 0, y: 0
        };
    }
    
    update(player = null) {
        this.draw();
        
        if (player != null) {
            if (this.collider.checkForCollisions(player)) {
                player.velocity.y = 0;
            }
        }
        
        this.position.x += this.velocity.x;
    }
    
    addVelocity(x) {
        if (-MAX_VELOCITY < this.velocity.x && this.velocity.x < MAX_VELOCITY) this.velocity.x += x;
    }
    
    stop() {
        this.velocity.x *= FRICTION;
    }
}
