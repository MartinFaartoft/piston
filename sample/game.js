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
        function Ball(pos, vel) {
            _super.call(this, pos);
            this.color = "orange";
            this.vel = vel;
            this.radius = 50;
            this.rotationSpeed = -.2;
            this.isCollisionDetectionEnabled = true;
        }
        Ball.prototype.render = function (camera) {
            camera.fillArc(this, this.radius, 0, Math.PI * 1.2, false, this.color);
        };
        Ball.prototype.collideWith = function (other) {
            this.destroyed = true;
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
            this.vel = new ps.Vector(0, 0);
            this.rotationSpeed = 1;
        }
        Box.prototype.render = function (camera) {
            camera.fillRect(this, 50, 50, this.color);
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
            this.rotationSpeed = -1;
            this.initialPos = this.pos;
            var ballSprite = new ps.Sprite(new ps.Point(0, 0), [10, 10], [0, 1, 2,], 0.9, "assets/ball.png");
            this.sprites.push(ballSprite);
        }
        SpriteBall.prototype.render = function (camera) {
            camera.drawLine(this.initialPos, this.pos, 3, "green");
            camera.paintSprites(this, this.sprites);
        };
        return SpriteBall;
    }(ps.EntityWithSprites));
    SampleGame.SpriteBall = SpriteBall;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.4.0.d.ts" />
var SampleGame;
(function (SampleGame) {
    var MouseBall = (function (_super) {
        __extends(MouseBall, _super);
        function MouseBall() {
            _super.call(this, new ps.Point(0, 0));
            this.color = "yellow";
            this.radius = 5;
            this.rotationSpeed = -1;
            this.isCollisionDetectionEnabled = true;
        }
        MouseBall.prototype.update = function (dt, dims) {
            this.pos = this.engine.mouse.pos;
            if (this.engine.mouse.isLeftButtonDown) {
                this.color = "green";
            }
            else if (this.engine.mouse.isRightButtonDown) {
                this.color = "red";
            }
            else if (this.engine.mouse.isMiddleButtonDown) {
                this.color = "blue";
            }
            else {
                this.color = "yellow";
            }
            this.rotation += 1 * dt;
        };
        MouseBall.prototype.render = function (camera) {
            camera.fillArc(this, this.radius, 0, Math.PI * 1.2, false, this.color);
        };
        MouseBall.prototype.collideWith = function (other) {
            this.destroyed = true;
        };
        return MouseBall;
    }(ps.Entity));
    SampleGame.MouseBall = MouseBall;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.4.0.d.ts" />
/// <reference path="ball.ts" />
/// <reference path="box.ts" />
/// <reference path="spriteball.ts" />
/// <reference path="mouseball.ts" />
var SampleGame;
(function (SampleGame) {
    var canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);
    var b1 = new SampleGame.Ball(new ps.Point(200, 500), new ps.Vector(50, 0));
    var b2 = new SampleGame.Ball(new ps.Point(500, 500), new ps.Vector(-50, 0));
    var dimensions = new ps.Vector(canvas.width, canvas.height);
    var engine = new ps.Engine(dimensions, canvas);
    var resourceManager = new ps.ResourceManager();
    window.engine = engine;
    engine.preloadResources("assets/ball.png");
    engine.mouse.setCustomCursor("assets/crosshairs.png", new ps.Point(10, 10));
    engine.registerEntity(new SampleGame.Box(), new SampleGame.SpriteBall(), b1, b2, new SampleGame.MouseBall());
    engine.start();
})(SampleGame || (SampleGame = {}));
//# sourceMappingURL=game.js.map