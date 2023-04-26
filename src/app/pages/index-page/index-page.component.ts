import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, finalize} from 'rxjs';
import {PokemonApiService} from '@services';
import {IPokemon, IPokemonItem} from '@entities';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html'
})
export class IndexPageComponent implements OnInit {

  public loader: boolean;
  public searchText: string;
  public pokemonData: IPokemonItem;
  public pokemonTotal: number;

  // paginate data
  public itemPerPage = 20;
  public page = 0;

  constructor(public pokeApiService: PokemonApiService,
              public toast: ToastrService,
              private router: Router) {
    this.loader = true;
    this.pokemonData = {
      count: 0,
      results: []
    };
    this.searchText = '';
    this.pokemonTotal = 0;
  }

  ngOnInit(): void {
    this.getPaginatePokemon();
  }

  getPaginatePokemon(): void {
    this.pokeApiService.getAllPokemon(this.itemPerPage, (this.itemPerPage * this.page))
      .pipe(
        finalize(() => this.loader = false),
      ).subscribe(res => {
      this.pokemonData = res;
      this.pokemonTotal = this.pokemonData.count;
    });
  }

  onSearchPokemon(): void {
    this.toast.clear();
    if (!this.searchText) {
      this.toast.warning('Ingrese un nombre para iniciar la búsqueda');
      return;
    }
    this.loader = true;
    this.pokeApiService.getPocketByIdOrName(this.searchText).pipe(
      finalize(() => this.loader = false),
      catchError(() => {
        this.toast.error(`No se encontró un Pokemon con el nombre "${this.searchText}"`);
        throw Error(`Pokemon ${this.searchText} not found`);
      })
    ).subscribe(r => {
      this.pokemonData = {
        count: 1,
        results: [
          {
            name: r.name,
            url: `${environment.apiUrl}/pokemon/${r.name}`
          }
        ]
      };
    });
  }

  onRefreshPokemonList(): void {
    if (!this.searchText && this.pokemonData.results.length <= 1) {
      this.getPaginatePokemon();
    }
  }

  onNextResults(): void {
    this.page++;
    this.getPaginatePokemon();
    this.onMoveScroll();
  }

  onPrevResults(): void {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    this.getPaginatePokemon();
    this.onMoveScroll();
  }

  onViewPokemon(pokemon: IPokemon): void {
    this.router.navigate(['pokemon', pokemon.name], {
      state: {pokemon}
    }).then();
  }

  onMoveScroll(): void {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }
}
