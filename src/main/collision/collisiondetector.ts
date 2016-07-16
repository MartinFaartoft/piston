/// <reference path="../actor.ts" />
/// <reference path="collision.ts" />

namespace ps.collision {
    export interface CollisionDetector {
        findCollisions(actors: Actor[]): Collision[];
        collides(a: Actor, b: Actor);
    }   
}