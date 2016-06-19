namespace ps {
    export interface Collidable {
        pos: Point;
        radius: number;
        mass: number;

        collideWith(other: Collidable): void;
    }
}