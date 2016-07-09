/// <reference path="../actor.ts" />

namespace ps.collision {
    export class Collision {
        entities: Actor[];
        constructor(...entities: Actor[]) {
            this.entities = entities;
        }
    }
}