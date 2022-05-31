import Player from './player.js';
import { BackgroundObject, Platform } from './objects.js';
import paths from './imagePaths.js';

const RESOLUTION_X = 800;
const RESOLUTION_Y = 600;

const GAME_END_OFFSET = 1000;
const DEATH_ZONE = RESOLUTION_Y;

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


export class GameController {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.c = this.canvas.getContext('2d');
        
        this.canvas.width = RESOLUTION_X;
        this.canvas.height = RESOLUTION_Y;
    }
    
    run = () => {
        if (this.gameLooseCondition(DEATH_ZONE)) {
            this.gameOver();
            this.initLevel1();
        } else if (!this.gameWinCondition(GAME_END_OFFSET)) {
            requestAnimationFrame(this.run);
        } else {
            this.gameEnd();
        }
        
        this.move();
    };
    
    initLevel1 = () => {
        this.player = new Player(this.canvas, paths.player.path);
        this.objects = [
            new BackgroundObject(this.c, paths.background, 0, 0, 0),
            new BackgroundObject(this.c, paths.backgroundSmallClouds),
            new BackgroundObject(this.c, paths.backgroundSmallClouds, 1000),
            new BackgroundObject(this.c, paths.backgroundBigClouds),
            new BackgroundObject(this.c, paths.backgroundBigClouds, -900),
            new BackgroundObject(this.c, paths.backgroundBigClouds, 900),
            new Platform(this.c, paths.platformThin, 650, 288),
            new Platform(this.c, paths.platformStandard, 200, 450),
            new Platform(this.c, paths.platformWide, 1500, 550),
            new Platform(this.c, paths.platformWide, -32, 550)
        ];
        
        requestAnimationFrame(this.run);
    };
    
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
        this.objects.map(o => o.stop());
        
    };
    
    moveObjects = (speed) => {
        this.player.stop();
        this.objects.map(o => o.addVelocity(speed));
    };
    
    stopAllObjects = () => {
        this.player.stop();
        this.objects.map(o => o.stop());
    };
    
    updateObjects = () => {
        this.objects.map(o => o.update(this.player));
        this.player.update();
    };
    
    gameWinCondition = (endOffset) => {
        return this.player.scrollOffset >= endOffset;
    };
    
    gameLooseCondition = (deathZone) => {
        return this.player.position.y > deathZone;
    };
    
    gameOver = () => {
        console.log('You loose!');
    };
    
    gameEnd = () => {
        console.log('You Won!');
    };
}
