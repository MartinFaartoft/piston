/// <reference path="entity.ts" />
/// <reference path="point.ts" />

namespace ps {
    export abstract class RoundEntity extends Entity {
        
        constructor(pos: Point, public radius: number) {
            super(pos);
        }
    }
}