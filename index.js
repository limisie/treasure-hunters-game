import Player from './Components/player.js';
import Platform from './Components/platform.js';
import {c, canvas} from './Components/canvas.js';
import {move, keyUp, keyInput} from './Components/movementController.js';

const player = new Player(canvas);
const platforms = [new Platform(canvas), new Platform(canvas, 500, 600), new Platform(canvas, 900, 900)];

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    move(player, platforms);
    
    platforms.map(p => {
        p.draw();
        if (p.collider.checkForCollisions(player)) {
            player.velocity.y = 0;
        }
    });
}

animate();

window.addEventListener('keydown', ({keyCode, repeat}) => keyInput(keyCode, repeat));
window.addEventListener('keyup', ({keyCode}) => keyUp(keyCode));