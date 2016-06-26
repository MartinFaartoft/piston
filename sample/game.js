var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../dist/piston-0.4.0.d.ts" />
var SampleGame;
(function (SampleGame) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball() {
            _super.call(this, new ps.Point(50, 50));
            this.color = "orange";
            this.vel = new ps.Vector(500, 500);
            this.radius = 50;
        }
        Ball.prototype.render = function (camera) {
            camera.fillCircle(this.pos, this.radius, this.color);
        };
        return Ball;
    }(ps.Entity));
    SampleGame.Ball = Ball;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.4.0.d.ts" />
var SampleGame;
(function (SampleGame) {
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            _super.call(this, new ps.Point(200, 200));
            this.color = "blue";
            this.vel = new ps.Vector(0, 50);
        }
        Box.prototype.render = function (camera) {
            camera.fillRect(this.pos, 50, 50, this.color);
        };
        return Box;
    }(ps.Entity));
    SampleGame.Box = Box;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.4.0.d.ts" />
var SampleGame;
(function (SampleGame) {
    var SpriteBall = (function (_super) {
        __extends(SpriteBall, _super);
        function SpriteBall() {
            _super.call(this, new ps.Point(100, 100));
            this.vel = new ps.Vector(10, 0);
            this.radius = 10;
            var ballSprite = new ps.Sprite(new ps.Point(0, 0), [10, 10], [0, 1, 2,], 0.9, "assets/ball.png");
            this.sprites.push(ballSprite);
        }
        SpriteBall.prototype.render = function (camera) {
            camera.paintSprites(this, this.sprites);
        };
        return SpriteBall;
    }(ps.EntityWithSprites));
    SampleGame.SpriteBall = SpriteBall;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="spriteball.ts" />
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
    var resourceManager = new ps.ResourceManager();
    window.engine = engine;
    engine.preloadResources("assets/ball.png");
    engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    engine.registerEntity(new SampleGame.Ball(), new SampleGame.Box(), new SampleGame.SpriteBall(), ball);
    engine.start();
})(SampleGame || (SampleGame = {}));
//# sourceMappingURL=game.js.map