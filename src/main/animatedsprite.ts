/// <reference path="resourcemanager.ts" />
/// <reference path="point.ts" />
/// <reference path="sprite.ts" />


namespace ps {
    export class AnimatedSprite extends Sprite {
        index: number = 0;

        constructor(spriteSheetCoordinates: Point, 
                    spriteSize: number[], 
                    url: string,
                    public frames: number[], 
                    public animationSpeed: number) {
                        super(spriteSheetCoordinates, spriteSize, url);
                        this.index = Math.random() * frames.length;
                        }

        update(dt: number) {
            this.index = this.index + this.animationSpeed * dt % this.frames.length;
        }

        getSpriteSheetCoordinates(): number[] {
            let frame = 0;

            if (this.animationSpeed > 0) {
                let idx = Math.floor(this.index);
                frame = this.frames[idx % this.frames.length];
            }

            let sprite_x = this.spriteSheetCoordinates.x + frame * this.spriteSize[0];
            let sprite_y = this.spriteSheetCoordinates.y;

            return [sprite_x, sprite_y];
        }
    }
}