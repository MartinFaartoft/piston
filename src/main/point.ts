namespace ps {
    export class Point {
        constructor(public x: number, public y: number) {}

        add(v: Vector | Point): Point {
            return new Point(this.x + v.x, this.y + v.y);
        }

        subtract(p: Vector | Point): Point {
            return new Point(this.x - p.x, this.y - p.y);
        }

        distanceTo(p: Point): number {
            return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        }

        vectorTo(p: Point): Vector {
            return p.subtract(this).toVector();
        }

        toVector(): Vector {
            return new Vector(this.x, this.y);
        }
    }
}