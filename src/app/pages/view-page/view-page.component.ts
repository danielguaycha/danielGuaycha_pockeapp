import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonApiService} from '@services';
import {IPokemon} from '@entities';
import {finalize} from 'rxjs';
import {prominent} from 'color.js';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html'
})
export class ViewPageComponent implements OnInit {

  public pokemonName: string;
  public pokeData: IPokemon | null;
  private loader: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public pokeApiService: PokemonApiService) {
    this.pokemonName = this.route.snapshot.paramMap.get('id') || '';
    this.pokeData = null;
    this.loader = false;
    // analyze router
    const data = this.router.getCurrentNavigation()?.extras.state;
    if (data && data['pokemon']) {
      this.pokeData = (data['pokemon']);
    }
  }

  ngOnInit(): void {
    this.getPokeData();
  }

  getPokeData(): void {
    if (this.pokeData) {
      this.getColor();
      return;
    }
    this.loader = true;
    this.pokeApiService.getPocketByIdOrName(this.pokemonName)
      .pipe(
        finalize(() => this.loader = false)
      )
      .subscribe(res => {
        this.pokeData = res;
        this.getColor();
      });
  }

  getColor(): void {
    prominent(this.pokeData!.sprites.other.dream_world.front_default,
      {format: 'hex'}).then(c => {
      let color = c[0].toString();
      if (color.includes('#00')) {
        color = c[1].toString();
      }
      if (color.includes('#f0f0')) {
        color = c[2].toString();
      }
      if (color.includes('#fff')) {
        color = '#000';
      }
      this.pokeData!._color = color;
    });
  }
}
