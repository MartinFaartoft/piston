/// <reference path="vector.ts" />
/// <reference path="point.ts" />

namespace ps {
    export interface CoordConverter {
        toCameraCoords(p: Point, cameraPosition: Point, viewPort: Vector): Point;
        toGameCoords(p: Point, cameraPosition: Point, viewPort: Vector): Point;
        setResolution(res: Vector): void;
    }
    
    //assume game coords lie in the first quadrant, with (0, 0) being the lower left corner
    export class DefaultCoordConverter implements CoordConverter {
        constructor(public resolution: Vector) {}

        toCameraCoords(p: Point, cameraPosition: Point, viewPort: Vector): Point {
            return p.subtract(cameraPosition)
                    .multiply(this.getScale(viewPort))
                    .changeCoordinateSystem(this.coordinateChanger.bind(this));  
        }

        toGameCoords(p: Point, cameraPosition: Point, viewPort: Vector): Point {
            return p.changeCoordinateSystem(this.coordinateChanger.bind(this)) 
                    .multiply(1 / this.getScale(viewPort))
                    .add(cameraPosition);
        }

        setResolution(resolution: Vector) {
            this.resolution = resolution;
        }

        private coordinateChanger(p: Point): Point {
            return new Point(p.x, this.resolution.y - p.y);
        }

        private getScale(viewPort: Vector): number {
            return this.resolution.x / viewPort.x;
        }
    }
}