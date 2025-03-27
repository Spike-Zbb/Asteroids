class CollisionSystem {
    polygonCollision(polygonA, polygonB) {
        for (let polygon of [polygonA, polygonB]) {
            for (let i1 = 0; i1 < polygon.length; i1++) {
                let i2 = (i1 + 1) % polygon.length;
                let p1 = polygon[i1];
                let p2 = polygon[i2];

                let normal = createVector(p2.y - p1.y, p1.x - p2.x);

                let [minA, maxA] = [null, null];
                for (let p of polygonA) {
                    let projected = p.x * normal.x + p.y * normal.y;
                    if (minA === null || projected < minA) minA = projected;
                    if (maxA === null || projected > maxA) maxA = projected;
                }

                let [minB, maxB] = [null, null];
                for (let p of polygonB) {
                    let projected = p.x * normal.x + p.y * normal.y;
                    if (minB === null || projected < minB) minB = projected;
                    if (maxB === null || projected > maxB) maxB = projected;
                }

                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    }

    checkCollision(obj1, obj2) {
        if (obj1.getVertices && obj2.getVertices) {
            return this.polygonCollision(obj1.getVertices(), obj2.getVertices());
        } else {
            let d = dist(obj1.x, obj1.y, obj2.x, obj2.y);
            return d < (obj1.size / 2 + obj2.size / 2);
        }
    }
}