namespace ps {
    export interface Collidable {
        pos: Point;
        radius: number;

        collideWith(other: Collidable): void;
    }

    export class Collision {
        constructor(public a: Collidable, public b: Collidable) {}
    }
}