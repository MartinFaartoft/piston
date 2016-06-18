namespace ps {
    export class Point {
        constructor(public x: number, public y: number) {}

        add(v: Vector): Point {
            return new Point(this.x + v.x, this.y + v.y);
        }

        distanceTo(p: Point): number {
            return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        }
    }
}