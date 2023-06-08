import { Actor, ActorArgs, CollisionType, Color } from 'excalibur';

export class Paddle extends Actor {
  constructor({ y }: ActorArgs) {
    super({
      x: 150,
      y,
      width: 200,
      height: 20,
      color: Color.Chartreuse,
      collisionType: CollisionType.Fixed,
    });
  }
}
