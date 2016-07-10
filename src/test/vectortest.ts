/// <reference path="jasmine.d.ts" />
/// <reference path="../main/testexport.ts" />

namespace VectorTest {
    let Vector = ps.Vector;

    let precision = .000001;

    let v = new Vector(1, 1);
    let v2 = new Vector(2, 2);
    
    describe("A vector", () => {
        it("should add correctly", () => {
            expect(v.add(v)).toEqual(new Vector(2, 2));
        });

        it("should subtract correctly", () => {
            expect(v.subtract(v)).toEqual(new Vector(0, 0));
        });

        it("should subtract last argument from first", () => {
            expect(v.subtract(v2)).toEqual(new Vector(-1, -1));
            expect(v2.subtract(v)).toEqual(new Vector(1, 1));
        });

        it("should multiply by scalar value correctly", () => {
            expect(v.multiply(2)).toEqual(new Vector(2, 2));
        });

        it("should calculate magnitude correctly", () => {
            expect(v.magnitude()).toEqual(Math.sqrt(2));
            expect(new Vector(3, 0).magnitude()).toEqual(3);
            expect(new Vector(0, -3).magnitude()).toEqual(3);
        });

        it("should calculate unit vector correctly", () => {
            expect(new Vector(3, 0).unit()).toEqual(new Vector(1, 0));
            
            expect(v.unit().x).toBeCloseTo(Math.sqrt(2) / 2, precision);
            expect(v.unit().y).toBeCloseTo(Math.sqrt(2) / 2, precision);
            expect(v.unit().magnitude()).toBeCloseTo(1, precision);
        });

        it("should calculate tangent vector correctly", () =>  {
            expect(v.tangent()).toEqual(new Vector(-1, 1));
            expect(new Vector(0, 0).tangent()).toEqual(new Vector(0, 0));
        });

        it("should be convertible to a point", () => {
            expect(v.toPoint()).toEqual(new ps.Point(1, 1));
        });

        it("should not be the same instance after cloning", () => {
            let orig = new Vector(0, 0);
            let clone = orig.clone();

            orig.x = 10;
            orig.y = 10;

            expect(clone).toEqual(new Vector(0, 0));
        });
    });

    describe("vector dot product", () => {
        it("should equal zero for orthogonal vectors", () => {
            expect(v.dot(v.tangent())).toEqual(0);
        });

        it("should calculate correctly", () => {
            expect(v.dot(v)).toEqual(2);
        });
    });
}
