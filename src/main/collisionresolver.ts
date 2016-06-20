/// <reference path="collision.ts" />

namespace ps {
    export interface CollisionResolver {
        resolve(collisions: Collision[]): void;
    }
}