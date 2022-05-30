const gravity = 0.5;

class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        
        this.position = {
            x: 100, y: 100
        };
        this.velocity = {
            x: 0, y: 0
        };
        
        this.width = 30;
        this.height = 30;
    }
    
    draw() {
        this.context.fillStyle = 'red';
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    
    update() {
        this.draw();
        this.position.y += this.velocity.y;
        
        if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}

export default Player;