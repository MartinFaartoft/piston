/// <reference path="jasmine.d.ts" />
/// <reference path="../main/testexport.ts" />




namespace CollisionDetectorTest {
    let Point = ps.Point;
    let Vector = ps.Vector;

    class Ball implements ps.Collidable {
        vel: ps.Vector;
        mass: number;
        constructor(public pos: ps.Point, public radius: number) {

        }

        collideWith() {}
    }

    let a, b, nextToA, farAway: Ball;
    let collisionDetector = new ps.CircularCollisionDetector();

    beforeEach(() =>  {
        a = new Ball(new Point(0, 0), 10);
        b = new Ball(new Point(0, 10), 10);
        nextToA = new Ball(new Point(0, 20), 10);
        farAway = new Ball(new Point(100, 100), 10);
    });

    describe("Circular collision detection", () => {
        it("should return true for identical Collidables", () => {
            expect(collisionDetector.collides(a, a)).toBe(true);
        });

        it("should return true for very close Collidables", () => {
            expect(collisionDetector.collides(a, b)).toBe(true);
        });

        it("should return true for very close Collidables", () => {
            expect(collisionDetector.collides(a, b)).toBe(true);
        });

        it("should return false for Collidables precisely next to each other", () => {
            expect(collisionDetector.collides(a, nextToA)).toBe(false);
        });

        it("should return false for Collidables far from each other", () => {
            expect(collisionDetector.collides(a, farAway)).toBe(false);
        });
    });
}