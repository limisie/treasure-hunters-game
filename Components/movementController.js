const PLAYER_SPEED = 5;
const PLAYER_JUMP = 20;
const BOUNDARY_RIGHT = 400;
const BOUNDARY_LEFT = 150;

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
        executed: false,
    },
    83: {
        direction: 'down',
        pressed: false
    },
    valid: [65, 68, 87, 83]
};

export const move = (player, platforms) => {
    if (keys[65].pressed && player.position.x > BOUNDARY_LEFT) {
        player.addVelocity(-PLAYER_SPEED, 0);
    } else if (keys[68].pressed && player.position.x < BOUNDARY_RIGHT) {
        player.addVelocity(PLAYER_SPEED, 0);
    } else if (keys[87].pressed) {
        if (!keys[87].executed) {
            player.addVelocity(0, -PLAYER_JUMP);
            keys[87].executed = true;
        }
        // } else if (keys[83].pressed) {
        //     player.addVelocity(0, player.maxVelocity);
    } else {
        player.stop();
        platformMovement(platforms);
    }
    
    player.update();
};

const platformMovement = (platforms) => {
    let movementValue = 0;
    
    if (keys[68].pressed) {
        movementValue = -PLAYER_SPEED;
    } else if (keys[65].pressed) {
        movementValue = PLAYER_SPEED;
    }
    
    platforms.map(p => p.position.x += movementValue);
};

export const keyInput = (keyCode) => {
    if (keys.valid.includes(keyCode)) {
        keys[keyCode].pressed = true;
    }
};

export const keyUp = (keyCode) => {
    if (keys.valid.includes(keyCode)) {
        keys[keyCode].pressed = false;
        if (keyCode === 87) keys[keyCode].executed = false;
    }
};
