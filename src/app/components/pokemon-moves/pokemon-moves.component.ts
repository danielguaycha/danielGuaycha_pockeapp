import {Component, Input} from '@angular/core';
import {IPokemonMove} from '@entities';

@Component({
  selector: 'app-pokemon-moves',
  templateUrl: './pokemon-moves.component.html'
})
export class PokemonMovesComponent {
  @Input() moves: Array<IPokemonMove>;

  constructor() {
    this.moves = [];
  }
}
