import {Component, Input} from '@angular/core';
import {IPokemonSprite} from '@entities';

@Component({
  selector: 'app-pokemon-sprites',
  templateUrl: './pokemon-sprites.component.html'
})
export class PokemonSpritesComponent {

  @Input() sprites: IPokemonSprite | null;

  constructor() {
    this.sprites = null;
  }
}
