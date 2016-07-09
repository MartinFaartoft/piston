/// <reference path="entity.ts" />
/// <reference path="sprite.ts" />

namespace ps {
    export abstract class EntityWithSprites extends Entity {
        public sprites: Sprite[] = [];
        
        update(dt: number, resolution: Vector): void {
            super.update(dt, resolution);
            for (let sprite of this.sprites) {
                sprite.update(dt);
            }
        }
    }
}