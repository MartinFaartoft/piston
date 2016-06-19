/// <reference path="entity.ts" />

namespace ps {
    export class Collision {
        entities: Entity[];
        constructor(...entities: Entity[]) {
            this.entities = entities;
        }
    }
}