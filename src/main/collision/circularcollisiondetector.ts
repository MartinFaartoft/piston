/// <reference path="collisiondetector.ts" />
/// <reference path="collision.ts" />


namespace ps.collision {
    export class CircularCollisionDetector implements CollisionDetector {
        findCollisions(actors: Actor[]): Collision[] {
            let collidables = this.getCollisionEnabledActors(actors);

            let collisions: Collision[] = [];
            for (let i = 0; i < collidables.length - 1; i++) {
                for (let j = i + 1; j < collidables.length; j++) {
                    if (this.collides(collidables[i], collidables[j])) {
                        collisions.push(new Collision(collidables[i], collidables[j]));
                    }
                }
            }

            return collisions;
        }
        
        collides(a: Actor, b: Actor) {
            return a.pos.distanceTo(b.pos) < a.radius + b.radius;
        }

        private getCollisionEnabledActors(actors: Actor[]): Actor[] {
            return actors.filter(e => e.isCollisionDetectionEnabled);
        }
    }
}