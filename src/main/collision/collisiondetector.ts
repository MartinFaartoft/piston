/// <reference path="../entity.ts" />
/// <reference path="collision.ts" />

namespace ps.collision {
    export interface CollisionDetector {
        findCollisions(entities: Entity[]): Collision[];
        collides(a: Entity, b: Entity);
    }   
}