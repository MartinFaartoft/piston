/// <reference path="../main/vector.ts" />
/// <reference path="../main/point.ts" />

/// <reference path="jasmine.d.ts" />

namespace PointTest {
    let Point = ps.Point;
    let Vector = ps.Vector;

    let p = new Point(0, 0);
    let p2 = new Point(10, 0);
    let v = new Vector(1, 1);

    describe("A point", () => {
        it("should return the resulting Point when a Vector is added to it", () => {
            expect(p.add(v)).toEqual(new Point(1, 1));
        });

        it("should calculate distance between two points correctly", () => {
            expect(p.distanceTo(p2)).toBe(10);

            expect(p.distanceTo(new Point(3, 4))).toBe(5);
        });

        it("should be convertible to a Vector", () => {
            expect(new Point(0, 0).toVector()).toEqual(new Vector(0, 0));
        });
    });
}