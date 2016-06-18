/// <reference path="basegamestate.ts" />

namespace ps {
    export interface Collidable {
        pos: Point;
        speed: Vector;
        radius: number;
        mass: number;

        collideWith(other: Collidable, state: BaseGameState);
    }
}