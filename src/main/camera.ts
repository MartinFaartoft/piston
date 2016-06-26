/// <reference path="point.ts" />
/// <reference path="coordinateconverter.ts" />


namespace ps {
    export class Camera {
        backgroundColor: string = "black";
        resourceManager: ResourceManager;

        constructor(public dims: Vector, public ctx: CanvasRenderingContext2D, public coordinateConverter: CoordinateConverter) { }

        fillCircle(center: Point, radius: number, color: string): void {
            let centerInCameraCoords = this.coordinateConverter.convertGameCoordsToCameraCoords(center); 
            let scaledRadius = this.scale(radius);

            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(centerInCameraCoords.x, centerInCameraCoords.y, scaledRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        fillRect(bottomLeft: Point, width: number, height: number, color: string): void {
            let bottomLeftInCameraCoords = this.coordinateConverter.convertGameCoordsToCameraCoords(bottomLeft);
            let scaledHeight = this.scale(height);
            let scaledWidth = this.scale(width);

            this.ctx.fillStyle = color;
            this.ctx.fillRect(bottomLeftInCameraCoords.x, bottomLeftInCameraCoords.y, scaledWidth, scaledHeight)
        }

        paintSprites(entity: Entity, sprites: Sprite[]): void {
            let centerInCameraCoords = this.coordinateConverter.convertGameCoordsToCameraCoords(entity.pos);
            let scaledDiameter = this.scale(entity.radius) * 2;
            let size = [scaledDiameter, scaledDiameter];
            let rotation = 0; 
            
            for (let sprite of sprites) {
                this.paintSprite(sprite, centerInCameraCoords, size, rotation);
            }
        }

        paintSprite(sprite: Sprite, center: Point, size: number[], rotation: number): void {
            sprite.render(this.ctx, this.resourceManager, center, size, rotation);
        }

        scale(n: number): number {
            return n; //assume 1:1 scale for now
        }

        render(entities: Entity[]): void {
            this.clear();

            for (let entity of entities) {
                entity.render(this);
            }            
        }

        private clear(): void {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.dims.x, this.dims.y);
        }
    }
}