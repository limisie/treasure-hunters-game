import { CollectibleCollider, PlatformCollider } from './collider.js';
import { SpriteRenderer } from './spriteRenderer.js';
import soundPaths from '../assets/paths/soundPaths.js';

const INITIAL_POSITION_X = 200;
const INITIAL_POSITION_Y = 400;
const MAX_VELOCITY = 8;
const FRICTION = 0.8;

export class GenericObject {
    constructor(context,
                {path, size},
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
        
        this.size = {
            width: size.width,
            height: size.height
        };
    }
    
    update() {
        this.draw();
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    
    draw() {
        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height);
    }
    
    addVelocity(x, y = 0) {
        if (-MAX_VELOCITY < this.velocity.x && this.velocity.x < MAX_VELOCITY) this.velocity.x += x;
        if (-MAX_VELOCITY < this.velocity.y && this.velocity.y < MAX_VELOCITY) this.velocity.y += y;
    }
    
    stop() {
        this.velocity.x *= FRICTION;
    }
}

export class AnimatedObject extends GenericObject {
    constructor(context, sprites, x = 0, y = 0) {
        super(context, sprites.def, x, y);
        this.sr = new SpriteRenderer(sprites);
    }
    
    draw() {
        this.context.drawImage(
            this.sr.image,
            
            this.sr.size.width * this.sr.currentFrame,
            0,
            this.sr.size.width,
            this.sr.size.height,
            
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height);
    }
    
    update() {
        this.sr.nextFrame();
        
        this.draw();
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

export class CollectableObject extends AnimatedObject {
    constructor(context, sprites, x = 0, y = 0) {
        super(context, sprites, x, y);
        
        this.collider = new CollectibleCollider(this);
        
        this.floatPosition = 0;
        this.FLOAT_SPEED = 0.2;
        this.FLOAT_MAX = 5;
        
        this.velocity.y = this.FLOAT_SPEED;
        
        this.collectAudio = new Audio(soundPaths.collect.path);
    }
    
    update(player = null) {
        if (this.collider != null) {
            super.update();
            
            if (player != null) {
                if (this.collider.checkForCollisions(player)) {
                    this.collectAudio.play();
                    player.score += 1;
                    delete this.collider;
                }
            }
            
            this.float();
        }
    }
    
    float() {
        if ((this.velocity.y > 0 && this.floatPosition > this.FLOAT_MAX) ||
            (this.velocity.y < 0 && this.floatPosition < -this.FLOAT_MAX)) {
            this.velocity.y = -this.velocity.y;
        }
        
        this.floatPosition += this.velocity.y;
    }
}

export class BackgroundObject extends GenericObject {
    constructor(context,
                {path, size, scrollSpeed},
                x = 0,
                y = 0,
                constVelocity = -2,
                jumpRatio = 0.05) {
        super(context, {path, size}, x, y);
        
        this.scrollSpeed = scrollSpeed;
        this.constVelocity = constVelocity;
        this.jumpRatio = jumpRatio;
    }
    
    update(player = null) {
        this.draw();
        
        this.position.x += (this.velocity.x + this.constVelocity) * this.scrollSpeed;
        
        if (this.position.x <= -this.size.width * 2 + 1) {
            this.position.x = this.size.width;
        }
        
        if (player != null) {
            this.position.y = -player.position.y * this.jumpRatio;
        }
        
    }
}

export class Platform extends GenericObject {
    constructor(context,
                {path, size},
                x = INITIAL_POSITION_X,
                y = INITIAL_POSITION_Y) {
        super(context, {path, size}, x, y);
        
        this.collider = new PlatformCollider(this);
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
