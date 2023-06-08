import { Actor, ActorArgs, Color } from 'excalibur';

export type BrickArgs = ActorArgs & {
  row: number;
  col: number;
};

export class Brick extends Actor {
  static colors = [Color.Red, Color.Orange, Color.Yellow];

  row: number;
  col: number;

  constructor({ x, y, row, col, width, height }: BrickArgs) {
    super({
      x,
      y,
      width,
      height,
      color: Brick.colors[row],
    });

    this.row = row;
    this.col = col;
  }
}
