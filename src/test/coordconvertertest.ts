/// <reference path="jasmine.d.ts" />
/// <reference path="../main/testexport.ts" />

namespace PointTest {
    let Point = ps.Point;
    let Vector = ps.Vector;

    describe("A coordinate converter", () => {
        let resolution = new ps.Vector(100, 100);
        let coordConverter = new ps.DefaultCoordConverter(resolution);
        
        it("should convert the back to the same point when going from game coords to camera coords and back", () => {
            //given
            let cameraPosition = new ps.Point(123, 456);
            let gamePoint = new ps.Point(321, 654);
            
            //when
            let cameraPoint = coordConverter.toCameraCoords(gamePoint, cameraPosition)
            let newGamePoint = coordConverter.toGameCoords(cameraPoint, cameraPosition);
            
            //then
            expect(newGamePoint).toEqual(gamePoint);
        });
    });
}