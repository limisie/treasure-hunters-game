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

export const keyInput = (keyCode) => {
    if (keys.valid.includes(keyCode)) {
        keys[keyCode].pressed = true;
    }
};

export const keyUp = (keyCode) => {
    if (keys.valid.includes(keyCode)) {
        keys[keyCode].pressed = false;
    }
};

export class InputController {
    constructor(player, objects) {
        this.player = player;
        this.objects = objects;
    }
    
    move = () => {
        
        if (keys[68].pressed) {
            if (this.player.position.x < BOUNDARY_RIGHT) {
                this.movePlayer(PLAYER_SPEED);
            } else {
                this.moveObjects(-PLAYER_SPEED);
            }
            
            this.player.scrollOffset += PLAYER_SPEED;
            
        } else if (keys[65].pressed) {
            if (this.player.position.x > BOUNDARY_LEFT) {
                this.movePlayer(-PLAYER_SPEED);
            } else {
                this.moveObjects(PLAYER_SPEED);
            }
            
            this.player.scrollOffset -= PLAYER_SPEED;
            
        } else {
            this.stopAllObjects();
        }
        
        if (keys[87].pressed) {
            
            if (!this.player.jumping) {
                this.player.addVelocity(0, -PLAYER_JUMP);
                this.player.jumping = true;
            }
            
        }
        
        this.updateObjects();
    };
    
    movePlayer = (speed) => {
        this.player.addVelocity(speed, 0);
        this.player.flipSprite(speed);
        this.objects.map(o => o.stop());
        
    };
    
    moveObjects = (speed) => {
        this.player.stop();
        this.player.flipSprite(-speed);
        this.objects.map(o => o.addVelocity(speed));
    };
    
    stopAllObjects = () => {
        this.player.stop();
        this.player.flipSprite();
        this.objects.map(o => o.stop());
    };
    
    updateObjects = () => {
        this.objects.map(o => o.update(this.player));
        this.player.update();
    };
}