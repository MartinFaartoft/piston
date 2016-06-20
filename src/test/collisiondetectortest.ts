/// <reference path="jasmine.d.ts" />
/// <reference path="../main/testexport.ts" />

namespace CollisionDetectorTest {
    let Point = ps.Point;
    let Vector = ps.Vector;

    class Ball extends ps.Entity {
        constructor(pos: ps.Point, radius: number) {
            super(pos);
            this.radius = radius;
        }
        
        render() {}
        collideWith() {}
    }

    let a: Ball, b: Ball, nextToA: Ball, farAway: Ball;
    let collisionDetector = new ps.collision.CircularCollisionDetector();

    beforeEach(() =>  {
        a = new Ball(new Point(0, 0), 10);
        b = new Ball(new Point(0, 10), 10);
        nextToA = new Ball(new Point(0, 20), 10);
        farAway = new Ball(new Point(100, 100), 10);
    });

    describe("A collision detector", () => {
        it("should return true for identical Collidables", () => {
            expect(collisionDetector.collides(a, a)).toBe(true);
        });

        it("should return true for very close Collidables", () => {
            expect(collisionDetector.collides(a, b)).toBe(true);
        });

        it("should return true for very close Collidables", () => {
            expect(collisionDetector.collides(a, b)).toBe(true);
        });

        it("should return false for Collidables almost, but not quite, touching", () => {
            expect(collisionDetector.collides(a, nextToA)).toBe(false);
        });

        it("should return false for Collidables far from each other", () => {
            expect(collisionDetector.collides(a, farAway)).toBe(false);
        });
    });
}