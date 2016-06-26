/// <reference path="point.ts" />
/// <reference path="coordinateconverter.ts" />


namespace ps {
    export class Camera {
        backgroundColor: string = "black";
        resourceManager: ResourceManager;

        constructor(public dims: Vector, public ctx: CanvasRenderingContext2D, public coordinateConverter: CoordinateConverter) { }

        fillCircle(entity: Entity, radius: number, color: string): void {
            this.fillArc(entity, radius, 0, Math.PI * 2, false, color);
        }

        fillArc(entity: Entity, radius: number, startAngle: number, endAngle: number, counterClockWise: boolean, color: string) {
            let centerInCameraCoords = this.coordinateConverter.convertGameCoordsToCameraCoords(entity.pos); 
            let scaledRadius = this.scale(radius);

            this.paintWhileRotated(centerInCameraCoords, entity.rotation, () => {
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, scaledRadius, startAngle, endAngle);
                this.ctx.fill();
            });
        }

        fillRect(entity: Entity, width: number, height: number, color: string): void {
            let centerInCameraCoords = this.coordinateConverter.convertGameCoordsToCameraCoords(entity.pos);
            let scaledHeight = this.scale(height);
            let scaledWidth = this.scale(width);

            this.paintWhileRotated(centerInCameraCoords, entity.rotation, () => {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(-scaledWidth / 2.0, -scaledHeight / 2.0, scaledWidth, scaledHeight);
            });
        }

        paintSprites(entity: Entity, sprites: Sprite[]): void {
            let centerInCameraCoords = this.coordinateConverter.convertGameCoordsToCameraCoords(entity.pos);
            let scaledDiameter = this.scale(entity.radius) * 2;
            let size = [scaledDiameter, scaledDiameter];
            
            for (let sprite of sprites) {
                this.paintSprite(sprite, centerInCameraCoords, size, entity.rotation);
            }
        }

        paintSprite(sprite: Sprite, pos: Point, size: number[], rotation: number): void {
            sprite.render(this.ctx, this.resourceManager, pos, size, rotation);
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

        private paintWhileRotated(center: Point, rotation: number, paintDelegate: () => void ) {
                if (rotation === 0) {
                    paintDelegate();
                    return;
                }

                this.ctx.translate(center.x, center.y);
                this.ctx.rotate(rotation);
                paintDelegate();
                this.ctx.rotate(-rotation);
                this.ctx.translate(-center.x, -center.y);
        }
    }
}