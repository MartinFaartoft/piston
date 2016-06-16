/// <reference path="resourcemanager.ts" />


namespace ps {
    export class Sprite {
        index: number = 0;

        constructor(public spriteSheetCoordinates: number[], 
                    public spriteSize: number[], 
                    public frames: number[], 
                    public speed: number, 
                    public url: string) {
                        this.index = Math.random() * frames.length;
                        }

        update(dt: number) {
            this.index = this.index + this.speed * dt % this.frames.length;
        }

        render(ctx: CanvasRenderingContext2D, 
                resourceManager: ResourceManager, 
                pos: number[], 
                size: number[],
                rotation: number) {
            let frame = 0;

            if (this.speed > 0) {
                let idx = Math.floor(this.index);
                frame = this.frames[idx % this.frames.length];
            }

            let sprite_x = this.spriteSheetCoordinates[0] + frame * this.spriteSize[0];
            let sprite_y = this.spriteSheetCoordinates[1];

            if (rotation === 0) {
                ctx.drawImage(resourceManager.get(this.url),
                        sprite_x, sprite_y,
                        this.spriteSize[0], this.spriteSize[1],
                        pos[0] - size[0] / 2.0, pos[1] - size[1] / 2.0,
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