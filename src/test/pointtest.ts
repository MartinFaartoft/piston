/// <reference path="../main/vector.ts" />
/// <reference path="../main/point.ts" />

/// <reference path="jasmine.d.ts" />

namespace PointTest {
    let Point = ps.Point;
    let Vector = ps.Vector;

    describe("A point", () => {
        it("should calculate distance to another point correctly", () => {
            expect(new Point(0, 0).distanceTo(new Point(0, 10))).toBe(10);

            expect(new Point(0, 0).distanceTo(new Point(3, 4))).toBe(5);
        });

        it("should be convertible to a Vector", () => {
            expect(new Point(0, 0).toVector()).toEqual(new Vector(0, 0));
        });

        it("should calculate addition correctly", () => {
            expect(new Point(1, 1).add(new Vector(2, 2))).toEqual(new Point(3, 3));
            expect(new Point(1, 1).add(new Point(2, 2))).toEqual(new Point(3, 3));
        });

        it("should calculate subtraction correctly", () => {
            expect(new Point(1, 1).subtract(new Vector(2, 2))).toEqual(new Point(-1, -1));
            expect(new Point(1, 1).subtract(new Point(2, 2))).toEqual(new Point(-1, -1));
        });

        it("should create a vector between two points", () => {
            expect(new Point(1, 1).vectorTo(new Point(2, 2))).toEqual(new Vector(1, 1));
            expect(new Point(-10, 0).vectorTo(new Point(10, 0))).toEqual(new Vector(20, 0));
        });
    });
}