/// <reference path="basegamestate.ts" />

namespace ps {
    export interface Collidable {
        pos: number[];
        radius: number;

        collideWith(other: Collidable, state: BaseGameState);
    }
}