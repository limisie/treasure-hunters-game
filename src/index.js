import Player from './Components/player.js';
import {Platform, BackgroundObject} from './components/objects.js';
import {keyUp, keyInput, Controller} from './Components/movementController.js';
import paths from './components/imagePaths.js';
import GameController from './components/gameController.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = new Player(canvas, paths.player.path);
const objects = [
    new BackgroundObject(c, paths.background, 0, 0, 0),
    new BackgroundObject(c, paths.backgroundSmallClouds),
    new BackgroundObject(c, paths.backgroundSmallClouds, 1000),
    new BackgroundObject(c, paths.backgroundBigClouds),
    new BackgroundObject(c, paths.backgroundBigClouds, -900),
    new BackgroundObject(c, paths.backgroundBigClouds, 900),
    new BackgroundObject(c, paths.backgroundBigClouds, 1800),
];
const platforms = [
    new Platform(c, paths.platformThin, 650, 288),
    new Platform(c, paths.platformStandard, 200, 450),
    new Platform(c, paths.platformWide, 1500, 550),
    new Platform(c, paths.platformWide, -32, 550)];
const controller = new Controller(player, platforms, objects);
const gameController = new GameController(player, 1000);


function run() {
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    if (!gameController.endCondition()) {
        requestAnimationFrame(run);
    } else {
        gameController.endGame();
    }
    
    controller.move();
}


run();

window.addEventListener('keydown', ({keyCode}) => keyInput(keyCode));
window.addEventListener('keyup', ({keyCode}) => keyUp(keyCode));
