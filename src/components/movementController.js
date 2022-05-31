const PLAYER_SPEED = 5;
const PLAYER_JUMP = 20;
const BOUNDARY_RIGHT = 400;
const BOUNDARY_LEFT = 70;

const keys = {
    68: {
        direction: 'right',
        pressed: false
    },
    65: {
        direction: 'left',
        pressed: false
    },
    87: {
        direction: 'up',
        pressed: false,
    },
    83: {
        direction: 'down',
        pressed: false
    },
    valid: [65, 68, 87, 83]
};

export class Controller {
    constructor(player, platforms) {
        this.player = player;
        this.platforms = platforms;
    }
    
    move = () => {
        
        if (keys[68].pressed) {
            
            if (this.player.position.x < BOUNDARY_RIGHT) {
                this.movePlayer(PLAYER_SPEED);
            } else {
                this.movePlatform(-PLAYER_SPEED);
            }
            
            this.player.scrollOffset += PLAYER_SPEED;
            
        } else if (keys[65].pressed) {
            if (this.player.position.x > BOUNDARY_LEFT) {
                this.movePlayer(-PLAYER_SPEED);
            } else {
                this.movePlatform(PLAYER_SPEED);
            }
            
            this.player.scrollOffset -= PLAYER_SPEED;
            
        } else {
            
            this.player.stop();
            this.platforms.map(p => p.stop());
            
        }
        
        if (keys[87].pressed) {
            
            if (!this.player.jumping) {
                this.player.addVelocity(0, -PLAYER_JUMP);
                this.player.jumping = true;
            }
        }
        
        this.collisionDetection();
        
        this.player.update();
        this.platforms.map(p => p.update());
        
    };
    
    movePlayer = (speed) => {
        this.player.addVelocity(speed, 0);
        this.platforms.map(p => p.stop());
    };
    
    movePlatform = (speed) => {
        this.player.stop();
        this.platforms.map(p => p.addVelocity(speed));
    };
    
    collisionDetection = () => {
        this.platforms.map(p => {
            p.draw();
            
            if (p.collider.checkForCollisions(this.player)) {
                this.player.velocity.y = 0;
            }
        });
    };
}

export const keyInput = (keyCode) => keys[keyCode].pressed = keys.valid.includes(keyCode);
export const keyUp = (keyCode) => keys[keyCode].pressed = !keys.valid.includes(keyCode);