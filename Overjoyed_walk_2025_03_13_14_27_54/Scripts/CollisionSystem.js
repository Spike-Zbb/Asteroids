class CollisionSystem {
    checkCollision(obj1, obj2) {
        let d = dist(obj1.x, obj1.y, obj2.x, obj2.y);
        return d < (obj1.size / 2 + obj2.size / 2);  
    }
}