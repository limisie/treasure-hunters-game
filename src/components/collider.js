class Collider {
    constructor(me) {
        this.me = me;
    }
    
    checkForCollisions(other) {
        return other.position.y + other.height <= this.me.position.y
            && other.position.y + other.height + other.velocity.y >= this.me.position.y
            && other.position.x + other.width >= this.me.position.x
            && other.position.x <= this.me.position.x + this.me.width;
    }
}

export default Collider;