import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PokemonApiService} from '@services';
import {finalize} from 'rxjs';
import {IPokemon} from '@entities';
import {average} from 'color.js';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html'
})
export class PokemonCardComponent implements OnInit {

  @Input() name: string;
  @Output() selectPokemon: EventEmitter<IPokemon> = new EventEmitter<IPokemon>();

  loader: boolean;
  pokemon: IPokemon | null;
  color: string;

  constructor(public pokemonService: PokemonApiService) {
    this.name = '';
    this.loader = true;
    this.pokemon = null;
    this.color = '#000';
  }

  ngOnInit(): void {
    this.getPokemonData();
  }

  getPokemonData(): void {
    this.pokemonService.getPocketByIdOrName(this.name).pipe(
      finalize(() => this.loader = false)
    ).subscribe(res => {
      this.pokemon = res;
      this.extractColor();
    });
  }

  extractColor(): void {
    if (!this.pokemon) {
      return;
    }
    average(this.pokemon.sprites.other.dream_world.front_default,
      {format: 'hex'}).then(c => {
      this.color = c.toString();
    });
  }

  onSelectPokemon(): void {
    if (!this.pokemon) {
      return;
    }
    this.selectPokemon.emit({...this.pokemon, _color: this.color});
  }
}
