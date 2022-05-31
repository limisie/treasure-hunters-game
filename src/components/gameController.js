import Player from './player.js';
import { BackgroundObject, Platform } from './objects.js';
import paths from './imagePaths.js';
import { InputController } from './inputController.js';

const RESOLUTION_X = 800;
const RESOLUTION_Y = 600;

const GAME_END_OFFSET = 1000;
const DEATH_ZONE = RESOLUTION_Y;


class GameController {
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
        
        this.controller.move();
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
        
        this.controller = new InputController(this.player, this.objects);
        
        requestAnimationFrame(this.run);
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

export default GameController;