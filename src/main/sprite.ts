/// <reference path="resourcemanager.ts" />
/// <reference path="point.ts" />

namespace ps {
    export class Sprite {
        constructor(public spriteSheetCoordinates: Point, 
                    public spriteSize: number[],   
                    public url: string) { }

        render(ctx: CanvasRenderingContext2D, 
                resourceManager: ResourceManager, 
                pos: Point, 
                size: number[],
                rotation: number) {
            let [sprite_x, sprite_y] = this.getSpriteSheetCoordinates();

            if (rotation === 0) {
                ctx.drawImage(resourceManager.get(this.url),
                        sprite_x, sprite_y,
                        this.spriteSize[0], this.spriteSize[1],
                        pos.x - size[0] / 2, pos.y - size[1] / 2,
                        size[0], size[1]);
            }
            else {
                ctx.translate(pos.x, pos.y);
                ctx.rotate(rotation);
                
                ctx.drawImage(resourceManager.get(this.url),
                            sprite_x, sprite_y,
                            this.spriteSize[0], this.spriteSize[1],
                            -size[0] / 2, -size[1] / 2,
                            size[0], size[1]);
                
                ctx.rotate(-rotation);
                ctx.translate(-pos.x, -pos.y);
            }
        }

        update(dt: number) { /* do nothing */ }

        protected getSpriteSheetCoordinates() {
            return [this.spriteSheetCoordinates.x, this.spriteSheetCoordinates.y];
        }
    }
}