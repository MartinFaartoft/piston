/// <reference path="entity.ts" />
/// <reference path="basegamestate.ts" />

namespace ps {
    export interface Collidable {
        collideWith(other: Entity, state: BaseGameState);
    }
}