import './style.css';
import { Loader } from 'excalibur';
import { Resources } from './resources';
import { Game } from './game';

/**
 * Resources
 */
const loader = new Loader();
loader.addResource(Resources.Brick);
loader.load();

const game = new Game();
game.goToScene('main');
game.start(loader);
