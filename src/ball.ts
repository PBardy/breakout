import { Actor, CollisionType, Color, Engine, vec } from 'excalibur';

export class Ball extends Actor {
  constructor() {
    super({
      x: 100,
      y: 300,
      radius: 10,
      color: Color.Red,
      collisionType: CollisionType.Passive,
      vel: vec(100, 100),
    });
  }

  onPostUpdate(_engine: Engine, _delta: number): void {
    const hw = this.width * 0.5;
    const hh = this.height * 0.5;
    if (this.pos.x < hw) this.vel.x = 100;
    if (this.pos.x > _engine.drawWidth) this.vel.x = -100;
    if (this.pos.y < hh) this.vel.y = 100;
  }
}
