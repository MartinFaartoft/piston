namespace ps {
    export class Vector {
        constructor(public x: number, public y: number) { }

        add(v: Vector): Vector {
            return new Vector(this.x + v.x, this.y + v.y);
        }

        subtract(v: Vector): Vector {
            return new Vector(this.x - v.x, this.y - v.y);
        }

        multiply(scalar: number): Vector {
            return new Vector(this.x * scalar, this.y * scalar);
        }

        magnitude(): number {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

        unit(): Vector {
            return this.multiply(1 / this.magnitude());
        }

        tangent(): Vector {
            //avoid negative zero complications
            return new Vector(this.y === 0 ? 0 : this.y * -1, this.x);
        }

        dot(v: Vector): number {
            return this.x * v.x + this.y * v.y;
        }
    }
}