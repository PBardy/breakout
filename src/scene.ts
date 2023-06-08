import { Actor, Scene, SceneActivationContext } from 'excalibur';

export type CustomSceneArgs = {
  name: string;
};

export class CustomScene extends Scene {
  name: string;
  element: HTMLElement | null;

  constructor({ name }: CustomSceneArgs) {
    super();

    this.name = name;
    this.element = document.getElementById(this.name);
  }

  addMany(actors: Actor[]) {
    actors.forEach((actor) => this.add(actor));
  }

  onActivate(_context: SceneActivationContext<unknown>): void {
    this.element?.classList.add('active');
  }

  onDeactivate(_context: SceneActivationContext<undefined>): void {
    this.element?.classList.remove('active');
  }
}
