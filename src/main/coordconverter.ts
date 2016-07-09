/// <reference path="vector.ts" />
/// <reference path="point.ts" />

namespace ps {
    export interface CoordConverter {
        toCameraCoords(p: Point, cameraPosition: Point): Point;
        toGameCoords(p: Point, cameraPosition: Point): Point;
        setResolution(res: Vector): void;
    }
    
    //assume game coords lie in the first quadrant, with (0, 0) being the lower left corner
    export class DefaultCoordConverter implements CoordConverter {

        constructor(public resolution: Vector) {}

        toCameraCoords(p: Point, cameraPosition: Point): Point {
            let _p = p.subtract(cameraPosition);
            return new Point(_p.x, this.resolution.y - _p.y);  
        }

        toGameCoords(p: Point, cameraPosition: Point): Point {
            return new Point(p.x, this.resolution.y - p.y).add(cameraPosition);
        }

        setResolution(resolution: Vector) {
            this.resolution = resolution;
        }
    }
}