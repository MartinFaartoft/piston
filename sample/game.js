var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../dist/piston-0.3.0.d.ts" />
var SampleGame;
(function (SampleGame) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball() {
            _super.call(this, new ps.Point(100, 100));
            this.color = "orange";
            this.vel = new ps.Vector(500, 500);
            this.radius = 50;
        }
        Ball.prototype.render = function (ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        };
        return Ball;
    }(ps.Entity));
    SampleGame.Ball = Ball;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.3.0.d.ts" />
/// <reference path="ball.ts" />
var SampleGame;
(function (SampleGame) {
    var canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);
    var ball = new SampleGame.Ball();
    ball.radius = 20;
    ball.vel = new ps.Vector(0, 0);
    ball.update = function (dt, dims) {
        this.pos = engine.mouse.pos;
        if (engine.mouse.isLeftButtonDown) {
            this.color = "green";
        }
        else if (engine.mouse.isRightButtonDown) {
            this.color = "red";
        }
        else if (engine.mouse.isMiddleButtonDown) {
            this.color = "blue";
        }
        else {
            this.color = "orange";
        }
    };
    var dimensions = new ps.Vector(canvas.width, canvas.height);
    var engine = new ps.Engine(dimensions, canvas);
    engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    engine.registerEntity(new SampleGame.Ball(), ball);
    engine.run();
})(SampleGame || (SampleGame = {}));
//# sourceMappingURL=game.js.map