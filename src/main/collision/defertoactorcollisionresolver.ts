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
            let entities: Actor[] = collision.entities;

            for (let i = 0; i < entities.length - 1; i++) {
                for (let j = i + 1; j < entities.length; j++) {
                    entities[i].collideWith(entities[j]);
                    entities[j].collideWith(entities[i]);
                }
            }
        }
    }
}