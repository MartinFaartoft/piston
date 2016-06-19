/// <reference path="entity.ts" />
/// <reference path="sprite.ts" />

namespace ps {
    export abstract class EntityWithSprites extends Entity {
        public sprites: Sprite[] = [];
        
        update(dt: number, dims: Vector): void {
            super.update(dt, dims);
            for (let sprite of this.sprites) {
                sprite.update(dt);
            }
        }
    }
}