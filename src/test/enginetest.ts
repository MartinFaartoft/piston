/// <reference path="jasmine.d.ts" />
/// <reference path="../main/engine.ts" />

describe("An engine", () => {
    it("should add numbers", () => {
        let engine = new ps.Engine([1,2]);
        expect(engine.sum(1, 1)).toBe(3); 
    });
});