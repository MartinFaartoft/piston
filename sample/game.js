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
    function mousePositionInsideElement(e) {
        var pos = findPos(canvas);
        var mousePos = [e.clientX - pos.left, e.clientY - pos.top];
        console.log(mousePos);
        ball.pos.x = mousePos[0];
        ball.pos.y = mousePos[1];
        return mousePos;
    }
    function readMouseButton(e) {
        e.stopImmediatePropagation();
        console.log(e.button);
        if (e.button === 1) {
            ball.color = "green";
        }
        else if (e.button === 2) {
            ball.color = "blue";
        }
        else {
            ball.color = "orange";
        }
        return false;
    }
    // Find out where an element is on the page
    // From http://www.quirksmode.org/js/findpos.html
    function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return {
            left: curleft,
            top: curtop
        };
    }
    document.body.oncontextmenu = function (e) { return false; };
    var canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);
    canvas.style.cursor = "none";
    canvas.addEventListener("mousemove", mousePositionInsideElement, false);
    canvas.addEventListener("mousedown", readMouseButton, false);
    var ball = new SampleGame.Ball();
    ball.radius = 20;
    ball.vel = new ps.Vector(0, 0);
    var dimensions = new ps.Vector(canvas.width, canvas.height);
    var engine = new ps.Engine(dimensions, canvas);
    engine.registerEntity(new SampleGame.Ball(), ball);
    engine.run();
})(SampleGame || (SampleGame = {}));
//# sourceMappingURL=game.js.map