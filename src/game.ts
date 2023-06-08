import { CollisionStartEvent, DisplayMode, Engine, Loader } from 'excalibur';
import { Ball } from './ball';
import { Paddle } from './paddle';
import { CustomScene } from './scene';
import { Brick } from './brick';

export class Game extends Engine {
  // Loaders
  loader: Loader;

  // Entities
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];

  // Scenes
  end: CustomScene;
  main: CustomScene;

  // Game variables
  rows = 3;
  cols = 5;
  score = 0;

  constructor() {
    super({
      width: 800,
      height: 800,
      displayMode: DisplayMode.FitScreen,
    });
  }

  getBricks() {
    const padding = 20;
    const xoffset = 65;
    const yoffset = 20;
    const brickHeight = 30;
    const brickWidth = this.drawWidth / this.cols - padding - padding / this.cols;

    const bricks = new Array(this.rows * this.cols).fill(0).map((_, index) => {
      const j = Math.floor(index / this.cols);
      const i = index % this.cols;
      const actor = new Brick({
        row: j,
        col: i,
        x: xoffset + i * (brickWidth + padding) + padding,
        y: yoffset + j * (brickHeight + padding) + padding,
        width: brickWidth,
        height: brickHeight,
      });

      return actor;
    });

    return bricks;
  }

  initPointers() {
    this.input.pointers.primary.on('move', (event) => {
      this.paddle.pos.x = event.worldPos.x;
    });
  }

  onExitViewport() {
    this.goToScene('end');
  }

  onCollisionStart(event: CollisionStartEvent<Ball>) {
    const other = event.other as Brick;
    if (this.bricks.includes(other)) {
      event.other.kill();
      this.ball.vel.x *= 1.05;
      this.ball.vel.y *= 1.05;
      this.score += (3 - other.row) * 10;
    }

    const intersection = event.contact.mtv.normalize();
    const xAxis = Math.abs(intersection.x) > Math.abs(intersection.y);
    const yAxis = Math.abs(intersection.y) > Math.abs(intersection.x);
    this.ball.vel.x *= xAxis ? -1 : 1;
    this.ball.vel.y *= yAxis ? -1 : 1;
  }

  onInitialize(_engine: Engine): void {
    // Set up ball
    this.ball = new Ball();
    this.ball.on('exitviewport', this.onExitViewport.bind(this));
    this.ball.on('collisionstart', this.onCollisionStart.bind(this));

    // Set up paddle
    this.paddle = new Paddle({ y: this.drawHeight - 40 });

    // Set up bricks
    this.bricks = this.getBricks();

    // Set up main scene
    this.main = new CustomScene({ name: 'main' });
    this.main.add(this.ball);
    this.main.add(this.paddle);
    this.main.addMany(this.bricks);
    this.addScene('main', this.main);

    // Set up end scene
    this.end = new CustomScene({ name: 'end ' });
    this.addScene('end', this.end);

    // Configure input controls
    this.initPointers();
  }
}
