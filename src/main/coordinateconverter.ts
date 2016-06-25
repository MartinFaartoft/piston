/// <reference path="vector.ts" />
/// <reference path="point.ts" />

namespace ps {
    export interface CoordinateConverter {
        convertGameCoordsToCameraCoords(p: Point): Point;
        convertCameraCoordsToGameCoords(p: Point): Point;
    }
    
    //assume game coords lie in the first quadrant, with (0, 0) being the lower left corner
    export class DefaultCoordinateConverter implements CoordinateConverter {

        constructor(public dims: Vector) {}

        convertGameCoordsToCameraCoords(p: Point): Point {
            return new Point(p.x, this.dims.y - p.y);  
        }

        convertCameraCoordsToGameCoords(p: Point): Point {
            return new Point(p.x, this.dims.y - p.y);
        }
    }
}