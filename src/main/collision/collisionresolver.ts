/// <reference path="collision.ts" />

namespace ps.collision {
    export interface CollisionResolver {
        resolve(collisions: Collision[]): void;
    }
}