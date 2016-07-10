/// <reference path="jasmine.d.ts" />
/// <reference path="../main/testexport.ts" />

namespace PointTest {
    let Point = ps.Point;
    let Vector = ps.Vector;

    describe("A coordinate converter", () => {
        let resolution = new ps.Vector(1000.0, 1000.0);
        let viewPort = new ps.Vector(100.0, 100.0);
        let coordConverter = new ps.DefaultCoordConverter(resolution);
        
        it("should convert the back to the same point when going from game coords to camera coords and back", () => {
            //given
            let cameraPosition = new ps.Point(123, 456);
            let gamePoint = new ps.Point(321, 654);
            
            //when
            let cameraPoint = coordConverter.toCameraCoords(gamePoint, cameraPosition, viewPort)
            let newGamePoint = coordConverter.toGameCoords(cameraPoint, cameraPosition, viewPort);
            
            //then
            expect(newGamePoint).toEqual(gamePoint);
        });

        it("should convert (0,0) in game coords into (0, resolution.y) in camera coords", () => {
            let cameraPosition = new ps.Point(0, 0);
            let gamePoint = new ps.Point(0, 0);
            let cameraPoint = coordConverter.toCameraCoords(gamePoint, cameraPosition, viewPort);
            
            expect(cameraPoint).toEqual(new ps.Point(0, resolution.y));
        });

        it("should convert (0, viewPort.y) in game coords into (0, 0) in camera coords", () => {
            let cameraPosition = new ps.Point(0, 0);
            let gamePoint = new ps.Point(0, viewPort.y);
            let cameraPoint = coordConverter.toCameraCoords(gamePoint, cameraPosition, viewPort); 
            
            expect(cameraPoint).toEqual(new ps.Point(0, 0));
        });

        it("should convert (viewPort.x, viewPort.y) in game coords into (resolution.x, 0) in camera coords", () => {
            let cameraPosition = new ps.Point(0, 0);
            let gamePoint = new ps.Point(viewPort.x, viewPort.y);
            let cameraPoint = coordConverter.toCameraCoords(gamePoint, cameraPosition, viewPort); 
            
            expect(cameraPoint).toEqual(new ps.Point(resolution.x, 0));
        });
        
        it("should convert (viewPort.x / 2, viewPort.y / 2) in game coords into (resolution.x / 2, resolution.y / 2) in camera coords", () => {
            let cameraPosition = new ps.Point(0, 0);
            let gamePoint = new ps.Point(viewPort.x / 2.0, viewPort.y / 2.0);
            let cameraPoint = coordConverter.toCameraCoords(gamePoint, cameraPosition, viewPort); 
            
            expect(cameraPoint).toEqual(new ps.Point(resolution.x / 2.0, resolution.y / 2.0));
        });
    });
}