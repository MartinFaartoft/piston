/// <reference path="scene.ts" />
/// <reference path="actor.ts" />
/// <reference path="vector.ts" />


namespace ps {
    export class DefaultScene implements Scene {
        game: Game;
        
        private actors: Actor[] = [];
        
        constructor(public size: Vector) {}

        update(dt: number) {
            for (let actor of this.getActors()) {
                actor.update(dt, this);
            }
        }

        addActors(...actors: Actor[]): void {
            for (let actor of actors) {
                actor.game = this.game;
                this.actors.push(actor);
            }
        }

        getActors(): Actor[] {
            return this.actors;
        }

        garbageCollect(): void {
            this.actors = this.actors.filter(a => !a.destroyed);
        }

        getSize(): Vector {
            return this.size;
        }

        setGame(game: Game) {
            this.game = game;
        }
    }
}