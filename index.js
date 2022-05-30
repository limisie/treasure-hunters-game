import Player from './Components/player.js';
import Platform from './Components/platform.js';
import {move, keyUp, keyInput} from './Components/movementController.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas);
const platforms = [new Platform(canvas), new Platform(canvas, 500, 600), new Platform(canvas, 900, 900)];


function endGame() {
    console.log('You Won!');
}


function run() {
    if (player.scrollOffset < 1000) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(run);
    } else {
        endGame();
    }
    
    move(player, platforms);
    
    platforms.map(p => {
        p.draw();
        if (p.collider.checkForCollisions(player)) {
            player.velocity.y = 0;
        }
    });
}


run();

window.addEventListener('keydown', ({keyCode}) => keyInput(keyCode));
window.addEventListener('keyup', ({keyCode}) => keyUp(keyCode));
