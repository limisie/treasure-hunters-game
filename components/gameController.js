import { InputController } from './inputController.js';
import { BackgroundObject, CollectableObject, Platform } from './objects.js';
import Player from './player.js';
import paths from '../assets/paths/imagePaths.js';
import crabSprites from '../assets/paths/spritesCrabPaths.js';
import diamondSprites from '../assets/paths/spritesCollectablePath.js';
import { gameOver, youWon } from './UI/ui.js';

const RESOLUTION_X = 800;
const RESOLUTION_Y = 600;

const DEATH_ZONE = RESOLUTION_Y;


class GameController {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.c = this.canvas.getContext('2d');
        
        this.canvas.width = RESOLUTION_X;
        this.canvas.height = RESOLUTION_Y;
        
        this.level_end_offset = 0;
    }
    
    run = () => {
        if (this.gameLooseCondition(DEATH_ZONE)) {
            this.gameOver();
            // this.initLevel1();
        } else if (!this.gameWinCondition(this.level_end_offset)) {
            requestAnimationFrame(this.run);
        } else {
            this.gameEnd();
        }
        
        this.controller.move();
    };
    
    demoLevel = () => {
        this.player = new Player(this.canvas, crabSprites);
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
            new Platform(this.c, paths.platformWide, -32, 550),
            new CollectableObject(this.c, diamondSprites, 400, 410),
            new CollectableObject(this.c, diamondSprites, 500, 410)
        ];
        
        this.controller = new InputController(this.player, this.objects);
        
        requestAnimationFrame(this.run);
    };
    
    initLevel1 = () => {
        this.level_end_offset = 3300;
        
        this.player = new Player(this.canvas, crabSprites, 5000);
        this.objects = [
            new BackgroundObject(this.c, paths.background, 0, 0, 0),
            new BackgroundObject(this.c, paths.backgroundSmallClouds),
            new BackgroundObject(this.c, paths.backgroundSmallClouds, 1000),
            new BackgroundObject(this.c, paths.backgroundBigClouds),
            new BackgroundObject(this.c, paths.backgroundBigClouds, -900),
            new BackgroundObject(this.c, paths.backgroundBigClouds, 900),
            
            new Platform(this.c, paths.platformStandard, 850, 450),
            new Platform(this.c, paths.platformStandard, 600, 450),
            new Platform(this.c, paths.platformStandard, 2100, 450),
            new Platform(this.c, paths.platformThin, 2750, 220),
            
            new Platform(this.c, paths.platformStandard, 5100, 450),
            new Platform(this.c, paths.platformThin, 5750, 220),
            
            new Platform(this.c, paths.platformWide, -32, 550),
            new Platform(this.c, paths.platformWide, 700, 550),
            new Platform(this.c, paths.platformWide, 1450, 550),
            new Platform(this.c, paths.platformWide, 2150, 550),
            new Platform(this.c, paths.platformWide, 2850, 550),
            new Platform(this.c, paths.platformWide, 3550, 550),
            new Platform(this.c, paths.platformWide, 4550, 550),
            new Platform(this.c, paths.platformWide, 6400, 550),
            
            new CollectableObject(this.c, diamondSprites, -100, 300),
            
            new CollectableObject(this.c, diamondSprites, 300, 510),
            new CollectableObject(this.c, diamondSprites, 390, 510),
            new CollectableObject(this.c, diamondSprites, 480, 510),
            
            new CollectableObject(this.c, diamondSprites, 950, 400),
            new CollectableObject(this.c, diamondSprites, 1040, 400),
            new CollectableObject(this.c, diamondSprites, 1130, 400),
            
            new CollectableObject(this.c, diamondSprites, 1550, 220),
            new CollectableObject(this.c, diamondSprites, 1640, 220),
            
            new CollectableObject(this.c, diamondSprites, 2550, 230),
            new CollectableObject(this.c, diamondSprites, 2840, 180),
            new CollectableObject(this.c, diamondSprites, 2930, 180),
            new CollectableObject(this.c, diamondSprites, 3020, 180),
            
            new CollectableObject(this.c, diamondSprites, 3520, 120),
            
            new CollectableObject(this.c, diamondSprites, 3920, 510),
            new CollectableObject(this.c, diamondSprites, 4010, 510),
            new CollectableObject(this.c, diamondSprites, 4100, 510),
            
            new CollectableObject(this.c, diamondSprites, 4410, 300),
            
            new CollectableObject(this.c, diamondSprites, 5000, 300),
            new CollectableObject(this.c, diamondSprites, 5190, 400),
            new CollectableObject(this.c, diamondSprites, 5280, 400),
            new CollectableObject(this.c, diamondSprites, 5370, 400),
            
            new CollectableObject(this.c, diamondSprites, 5840, 180),
            new CollectableObject(this.c, diamondSprites, 5930, 180),
            new CollectableObject(this.c, diamondSprites, 6020, 180),
            
            new CollectableObject(this.c, diamondSprites, 6500, 220),
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
        gameOver(this.player.score);
    };
    
    gameEnd = () => {
        youWon(this.player.score);
    };
}

export default GameController;
