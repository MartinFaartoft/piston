/// <reference path="actor.ts" />
/// <reference path="sprite.ts" />
/// <reference path="scene.ts" />


namespace ps {
    export abstract class ActorWithSprites extends Actor {
        public sprites: Sprite[] = [];
        
        update(dt: number, scene: Scene): void {
            super.update(dt, scene);
            for (let sprite of this.sprites) {
                sprite.update(dt);
            }
        }
    }
}