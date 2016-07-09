/// <reference path="vector.ts" />
/// <reference path="point.ts" />

namespace ps {
    export interface CoordConverter {
        toCameraCoords(p: Point): Point;
        toGameCoords(p: Point): Point;
        setResolution(res: Vector): void;
    }
    
    //assume game coords lie in the first quadrant, with (0, 0) being the lower left corner
    export class DefaultCoordConverter implements CoordConverter {

        constructor(public resolution: Vector) {}

        toCameraCoords(p: Point): Point {
            return new Point(p.x, this.resolution.y - p.y);  
        }

        toGameCoords(p: Point): Point {
            return new Point(p.x, this.resolution.y - p.y);
        }

        setResolution(resolution: Vector) {
            this.resolution = resolution;
        }
    }
}