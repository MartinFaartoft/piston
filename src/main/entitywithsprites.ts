/// <reference path="entity.ts" />
/// <reference path="sprite.ts" />

namespace ps {
    export abstract class EntityWithSprites extends Entity {
        public sprites: Sprite[] = [];
        
        update(dt, state) {
            super.update(dt, state);
            for (let sprite of this.sprites) {
                sprite.update(dt);
            }
        }
    }
}