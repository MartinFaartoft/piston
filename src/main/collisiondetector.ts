/// <reference path="collidable.ts" />

namespace ps {
    export function detectCircularCollision(a: Collidable, b: Collidable, state: BaseGameState) {
        // circle collision        
        let distance = a.pos.distanceTo(b.pos);
        
        let collision = distance < a.radius + b.radius;

        if (collision) {
            a.collideWith(b, state);
            b.collideWith(a, state);
        }

        return collision;
    }
}