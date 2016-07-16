/// <reference path="../actor.ts" />

namespace ps.collision {
    export class Collision {
        actors: Actor[];
        constructor(...actors: Actor[]) {
            this.actors = actors;
        }
    }
}