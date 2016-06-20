/// <reference path="../entity.ts" />

namespace ps.collision {
    export class Collision {
        entities: Entity[];
        constructor(...entities: Entity[]) {
            this.entities = entities;
        }
    }
}