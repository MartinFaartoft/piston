/// <reference path="collidable.ts" />

namespace ps {
    export interface CollisionDetector {
        collides(a: Collidable, b: Collidable);
    }

    export class CircularCollisionDetector implements CollisionDetector {
        
        collides(a: Collidable, b: Collidable) {
            return a.pos.distanceTo(b.pos) < a.radius + b.radius;
        }
    }
}