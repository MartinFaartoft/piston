/// <reference path="collision.ts" />
/// <reference path="collisionresolver.ts" />


namespace ps.collision {
    export class DeferToActorCollisionResolver implements CollisionResolver {
        resolve(collisions: Collision[]): void {
            for (let collision of collisions) {
                this.resolveSingleCollision(collision);
            }
        }

        private resolveSingleCollision(collision: Collision): void {
            let actors: Actor[] = collision.actors;

            for (let i = 0; i < actors.length - 1; i++) {
                for (let j = i + 1; j < actors.length; j++) {
                    actors[i].collideWith(actors[j]);
                    actors[j].collideWith(actors[i]);
                }
            }
        }
    }
}