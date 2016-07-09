/// <reference path="vector.ts" />

namespace ps {
    export interface Scene {
        update(dt: number): void;

        getActors(): Actor[];

        garbageCollect(): void;

        getSize(): Vector;

        addActors(...actors: Actor[]): void
    }
}