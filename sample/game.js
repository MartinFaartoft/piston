var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../dist/piston-0.2.0.d.ts" />
var SampleGame;
(function (SampleGame) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball() {
            _super.call(this, new ps.Point(100, 100), new ps.Vector(50, 50), 10);
        }
        Ball.prototype.update = function (dt, state) {
            _super.prototype.update.call(this, dt, state);
        };
        Ball.prototype.render = function (ctx, state) {
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        };
        return Ball;
    }(ps.Entity));
    SampleGame.Ball = Ball;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.2.0.d.ts" />
/// <reference path="ball.ts" />
var SampleGame;
(function (SampleGame) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState(dim) {
            _super.call(this, dim);
            this.ball = new SampleGame.Ball();
        }
        GameState.prototype.update = function (dt) {
            this.ball.update(dt, this);
        };
        GameState.prototype.render = function (ctx) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.dimensions.x, this.dimensions.y);
            this.ball.render(ctx, this);
        };
        return GameState;
    }(ps.BaseGameState));
    SampleGame.GameState = GameState;
})(SampleGame || (SampleGame = {}));
/// <reference path="../../dist/piston-0.2.0.d.ts" />
/// <reference path="gamestate.ts" />
var SampleGame;
(function (SampleGame) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 768;
    document.body.appendChild(canvas);
    var debug = false;
    var dimensions = new ps.Vector(canvas.width, canvas.height);
    var state = new SampleGame.GameState(dimensions);
    var engine = new ps.BrowserEngine(state, ctx, debug);
    engine.run();
})(SampleGame || (SampleGame = {}));
//# sourceMappingURL=game.js.map