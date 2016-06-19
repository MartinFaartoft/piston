/// <reference path="../main/collisiondetector.ts" />
/// <reference path="../main/vector.ts" />
/// <reference path="../main/point.ts" />
/// <reference path="jasmine.d.ts" />

namespace CollisionDetectorTest {
    let Point = ps.Point;
    let Vector = ps.Vector;

    class Ball implements ps.Collidable {
        speed: ps.Vector;
        mass: number;
        constructor(public pos: ps.Point, public radius: number) {

        }

        collideWith() {}
    }

    class StateMock extends ps.BaseGameState {
        render() {}
        update() {}
    }

    let s: StateMock;
    let a, b, nextToA, farAway: Ball;

    beforeEach(() =>  {
        s = new StateMock(new Vector(0, 0));

        a = new Ball(new Point(0, 0), 10);
        b = new Ball(new Point(0, 10), 10);
        nextToA = new Ball(new Point(0, 20), 10);
        farAway = new Ball(new Point(100, 100), 10);
    });

    describe("Circular collision detection", () => {
        it("should return true for identical Collidables", () => {
            expect(ps.detectCircularCollision(a, a, s)).toBe(true);
        });

        it("should return true for very close Collidables", () => {
            expect(ps.detectCircularCollision(a, b, s)).toBe(true);
        });

        it("should call collideWith on colliding Collidables", () => {
            spyOn(a, "collideWith");
            spyOn(b, "collideWith");
            ps.detectCircularCollision(a, b, s);
            expect(a.collideWith).toHaveBeenCalled();
            expect(b.collideWith).toHaveBeenCalled();
        });

        it("should return true for very close Collidables", () => {
            expect(ps.detectCircularCollision(a, b, s)).toBe(true);
        });

        it("should return false for Collidables precisely next to each other", () => {
            expect(ps.detectCircularCollision(a, nextToA, s)).toBe(false);
        });

        it("should return false for Collidables far from each other", () => {
            expect(ps.detectCircularCollision(a, farAway, s)).toBe(false);
        });
    });
}