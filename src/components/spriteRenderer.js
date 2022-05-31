class SpriteRenderer {
    constructor(sprites) {
        this.sprites = sprites;
        
        this.currentSprite = this.sprites.idleLeft;
        
        this.image = new Image();
        this.image.src = this.currentSprite.path;
        
        this.size = {
            width: this.currentSprite.size.width,
            height: this.currentSprite.size.height,
        };
        this.frames = this.currentSprite.frames - 1;
        this.currentFrame = 0;
        
        this.rightDirection = true;
    }
    
    nextFrame = () => {
        if (this.currentFrame < this.frames) this.currentFrame++;
        else this.currentFrame = 0;
    };
    
    changeSprite = (direction = 0) => {
        if (direction > 0) {
            this.currentSprite = this.sprites.runRight;
            this.rightDirection = true;
        } else if (direction < 0) {
            this.currentSprite = this.sprites.runLeft;
            this.rightDirection = false;
        } else {
            if (this.rightDirection) {
                this.currentSprite = this.sprites.idleRight;
            } else {
                this.currentSprite = this.sprites.idleLeft;
            }
        }
        this.setSpriteDetails();
    };
    
    setSpriteDetails = () => {
        this.image.src = this.currentSprite.path;
        this.size = {
            width: this.currentSprite.size.width,
            height: this.currentSprite.size.height,
        };
        this.frames = this.currentSprite.frames - 1;
        // this.currentFrame = 0;
    };
}

export default SpriteRenderer;