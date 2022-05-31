import Player from './Components/player.js';
import Platform from './Components/platform.js';
import {keyUp, keyInput, Controller} from './Components/movementController.js';
import paths from './components/imagePaths.js';
import GameController from './components/gameController.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = new Player(canvas);
const platforms = [new Platform(c, paths.standardPlatform, -64, 448),
    new Platform(c, paths.standardPlatform),
    new Platform(c, paths.standardPlatform, 512, 256)];
const controller = new Controller(player, platforms);
const gameController = new GameController(player, 1000);


function run() {
    if (!gameController.endCondition()) {
        c.fillStyle = 'white';
        c.fillRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(run);
    } else {
        gameController.endGame();
    }
    
    controller.move();
}


run();

window.addEventListener('keydown', ({keyCode}) => keyInput(keyCode));
window.addEventListener('keyup', ({keyCode}) => keyUp(keyCode));
