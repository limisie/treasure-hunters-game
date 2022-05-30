import Player from './player.js';
import {c, canvas} from './canvas.js';
import {playerMovement, keyUp, keyInput} from './controller.js';

const player = new Player(canvas);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    playerMovement(player);
}

animate();

window.addEventListener('keydown', ({keyCode}) => keyInput(keyCode));
window.addEventListener('keyup', ({keyCode}) => keyUp(keyCode));