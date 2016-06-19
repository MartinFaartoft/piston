/// <reference path="collidable.ts" />

namespace ps {
    export function detectCircularCollision(a: Collidable, b: Collidable) {
        let distance = a.pos.distanceTo(b.pos);
        
        let collision = distance < a.radius + b.radius;

        return collision;
    }
}