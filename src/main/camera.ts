/// <reference path="point.ts" />
/// <reference path="coordinateconverter.ts" />


namespace ps {
    export class Camera {
        backgroundColor: string = "black";

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