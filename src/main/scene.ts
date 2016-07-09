/// <reference path="vector.ts" />

namespace ps {
    export interface Scene {
        setGame(game: Game): void;
        
        update(dt: number): void;

        getActors(): Actor[];

        garbageCollect(): void;

        getSize(): Vector;

        addActors(...actors: Actor[]): void
    }
}