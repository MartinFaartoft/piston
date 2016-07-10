/// <reference path="point.ts" />
/// <reference path="coordconverter.ts" />

namespace ps {
    export class Camera {
        backgroundColor: string = "black";

        private ctx: CanvasRenderingContext2D;

        constructor(public canvas: HTMLCanvasElement, 
                    public resourceManager: ResourceManager, 
                    public coordConverter: CoordConverter, 
                    public sceneSize: Vector, //size of scene / game world
                    public viewPort: Vector, //width and height of camera viewport 
                    public pos: Point) { //lower left corner of camera in game coordinates
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
        }
        
        //TODO implement here 
        // function resizeCanvas(e) {
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerWidth / aspectRatio;
        //     engine.setResolution(new ps.Vector(canvas.width, canvas.height));
        // }
        // window.onresize = resizeCanvas;
        centerOn(p: Point) { //gamepoint
            this.pos = p.subtract(this.viewPort.multiply(.5));
        }

        fillCircle(pos: Point, radius: number, color: string): void {
            this.fillArc(pos, 0, radius, 0, Math.PI * 2, false, color);
        }

        fillArc(pos: Point, rotation: number, radius: number, startAngle: number, endAngle: number, counterClockWise: boolean, color: string) {
            let centerCC = this.toCameraCoords(pos); 
            let scaledRadius = this.scale(radius); 

            this.paintWhileRotated(centerCC, rotation, () => {
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, scaledRadius, startAngle, endAngle, counterClockWise);
                this.ctx.fill();
                this.ctx.closePath();
            });
        }

        fillRect(pos: Point, rotation: number, width: number, height: number, color: string): void {
            let centerCC = this.toCameraCoords(pos);
            let scaledHeight = this.scale(height);
            let scaledWidth = this.scale(width);

            this.paintWhileRotated(centerCC, rotation, () => {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(-scaledWidth / 2.0, -scaledHeight / 2.0, scaledWidth, scaledHeight);
            });
        }

        drawLine(start: Point, end: Point, lineWidth: number, color: string): void {
            let startCC = this.toCameraCoords(start);
            let endCC = this.toCameraCoords(end);

            let previousStroke = this.ctx.strokeStyle;
            let previousLineWidth = this.ctx.lineWidth;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = lineWidth;
            this.ctx.moveTo(startCC.x, startCC.y);
            this.ctx.lineTo(endCC.x, endCC.y);
            this.ctx.closePath();
            this.ctx.stroke();
            
            this.ctx.strokeStyle = previousStroke;
            this.ctx.lineWidth = previousLineWidth;
        }

        paintSprite(pos: Point, rotation: number, size: number[], sprite: Sprite): void {
            this.paintSprites(pos, rotation, size, [sprite]);
        }

        paintSprites(pos: Point, rotation: number, size: number[], sprites: Sprite[]): void {
            let centerCC = this.toCameraCoords(pos);
            let scaledSize = [this.scale(size[0]), this.scale(size[1])];
            
            for (let sprite of sprites) {
                this.paintSpriteInternal(sprite, centerCC, scaledSize, rotation);
            }
        }

        toGameCoords(p: Point): Point {
            return this.coordConverter.toGameCoords(p, this.pos, this.viewPort);
        }

        toCameraCoords(p: Point): Point {
            return this.coordConverter.toCameraCoords(p, this.pos, this.viewPort);
        }

        private paintSpriteInternal(sprite: Sprite, pos: Point, size: number[], rotation: number): void {
            sprite.render(this.ctx, this.resourceManager, pos, size, rotation);
        }

        //assumes that viewPort has same aspect ratio as canvas
        scale(n: number): number {
            return n * this.canvas.width / this.viewPort.x; 
        }

        render(scene: Scene): void {
            this.clear();

            for (let actor of scene.getActors()) {
                actor.render(this, scene);
            }

            console.log("camera position: ", this.pos);
        }

        toggleFullScreen(): void {
            if (!document.webkitFullscreenElement) {
                this.canvas.webkitRequestFullscreen();
            }
            else {
                document.webkitExitFullscreen();
            }
        }

        private clear(): void {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        }

        private paintWhileRotated(center: Point, rotation: number, paintDelegate: () => void ) {
                this.ctx.translate(center.x, center.y);
                this.ctx.rotate(rotation);
                paintDelegate();
                this.ctx.rotate(-rotation);
                this.ctx.translate(-center.x, -center.y);
        }
    }
}