/// <reference path="collidable.ts" />

namespace ps {
    export function detectCircularCollision(a: Collidable, b: Collidable, state: BaseGameState) {
        // circle collision
        let dx = a.pos[0] - b.pos[0];
        let dy = a.pos[1] - b.pos[1];

        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let collision = distance < a.radius + b.radius;

        if (collision) {
            a.collideWith(b, state);
            b.collideWith(a, state);
        }

        return collision;
    }
}