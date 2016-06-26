/// <reference path="resourcemanager.ts" />
/// <reference path="point.ts" />

namespace ps {
    export class Sprite {
        index: number = 0;

        constructor(public spriteSheetCoordinates: Point, 
                    public spriteSize: number[], 
                    public frames: number[], 
                    public animationSpeed: number, 
                    public url: string) {
                        this.index = Math.random() * frames.length;
                        }

        update(dt: number) {
            this.index = this.index + this.animationSpeed * dt % this.frames.length;
        }

        render(ctx: CanvasRenderingContext2D, 
                resourceManager: ResourceManager, 
                pos: Point, 
                size: number[],
                rotation: number) {
            let frame = 0;

            if (this.animationSpeed > 0) {
                let idx = Math.floor(this.index);
                frame = this.frames[idx % this.frames.length];
            }

            let sprite_x = this.spriteSheetCoordinates.x + frame * this.spriteSize[0];
            let sprite_y = this.spriteSheetCoordinates.y;

            if (rotation === 0) {
                ctx.drawImage(resourceManager.get(this.url),
                        sprite_x, sprite_y,
                        this.spriteSize[0], this.spriteSize[1],
                        pos.x - size[0] / 2.0, pos.y - size[1] / 2.0,
                        size[0], size[1]);
            }
            else {
                ctx.translate(pos[0], pos[1]);
                ctx.rotate(rotation);
                
                ctx.drawImage(resourceManager.get(this.url),
                            sprite_x, sprite_y,
                            this.spriteSize[0], this.spriteSize[1],
                            -size[0] / 2, -size[1] / 2,
                            size[0], size[1]);
                
                ctx.rotate(-rotation);
                ctx.translate(-pos[0], -pos[1]);
            }
        }
    }
}