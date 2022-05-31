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
        
        this.velocity = {
            x: 0,
            y: 0
        };
    }
    
    update() {
        this.draw();
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    
    draw() {
        this.context.drawImage(this.image, this.position.x, this.position.y);
    }
    
    addVelocity(x, y = 0) {
        if (-MAX_VELOCITY < this.velocity.x && this.velocity.x < MAX_VELOCITY) this.velocity.x += x;
        if (-MAX_VELOCITY < this.velocity.y && this.velocity.y < MAX_VELOCITY) this.velocity.y += y;
    }
    
    stop() {
        this.velocity.x *= FRICTION;
    }
}

export class BackgroundObject extends GenericObject {
    constructor(context,
                {path, scrollSpeed},
                x = 0,
                y = 0,
                constVelocity = -2) {
        super(context, path, x, y);
        
        this.scrollSpeed = scrollSpeed;
        this.constVelocity = constVelocity;
    }
    
    update() {
        this.draw();
        
        this.position.x += (this.velocity.x + this.constVelocity) * this.scrollSpeed;
        this.position.y += this.velocity.y * 0.1;
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
    }
    
    update(player = null) {
        super.update();
        
        if (player != null) {
            if (this.collider.checkForCollisions(player)) {
                player.velocity.y = 0;
            }
        }
    }
}
