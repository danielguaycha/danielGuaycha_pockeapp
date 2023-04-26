import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {of} from 'rxjs';
import {IndexPageComponent} from '@pages';
import {BaseUrlInterceptor} from '@utils';
import {IPokemon, IPokemonItem} from '@entities';
import {environment} from 'src/environments/environment';

describe('IndexPageComponent', () => {
  const item: IPokemonItem = {
    count: 100,
    results: [
      {
        name: 'Pikachu',
        url: environment.apiUrl + '/pokemon/pikachu'
      }
    ]
  };
  let component: IndexPageComponent;
  let fixture: ComponentFixture<IndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexPageComponent],
      imports: [HttpClientModule, ToastrModule.forRoot({})],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
        {provide: 'BASE_API_URL', useValue: environment.apiUrl}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(component.pokeApiService, 'getAllPokemon').and.returnValue(
      of(item)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getPaginatePokemon', () => {
    component.getPaginatePokemon();
    expect(component.pokemonData).not.toEqual({
      count: 0,
      results: []
    });
    expect(component.pokemonData.count).toEqual(100);
    expect(component.pokemonTotal).toEqual(100);
    expect(component.loader).toBeFalse();
  });

  it('should search pokemon', () => {
    const pokemon: IPokemon = {
      abilities: [],
      base_experience: 50,
      height: 100,
      id: 1,
      location_area_encounters: '',
      moves: [],
      name: 'pikachu',
      order: 1,
      species: {name: 'fire', url: ''},
      sprites: {
        back_female: '',
        back_shiny: '',
        back_shiny_female: '',
        back_default: '',
        front_female: '',
        front_shiny: '',
        front_default: '',
        other: {
          dream_world: {
            front_default: ''
          }
        }
      },
      types: [
        {type: {name: 'Fire', url: ''}}
      ],
      weight: 100
    };
    spyOn(component.pokeApiService, 'getPocketByIdOrName').and.returnValue(
      of(pokemon)
    );
    component.searchText = 'pikachu';
    component.onSearchPokemon();
    expect(component.pokemonData.count).toEqual(1);
    expect(component.pokemonData.results[0].name).toEqual(pokemon.name);
    expect(component.loader).toBeFalse();
  });

  it('should onRefreshPokemonList', () => {
    component.searchText = '';
    component.pokemonData = {
      count: 1,
      results: [{
        name: 'pikachu',
        url: ''
      }]
    };
    component.onRefreshPokemonList();
    expect(component.pokemonData.count).toEqual(100);
  });

  it('should onNextPage', function () {
    window.scrollTo({
      top: 100,
      left: 0
    });
    component.onNextResults();
    expect(component.page).toEqual(1);
    expect(window.scrollY).toEqual(0);
  });

  it('should prevPage', function () {
    component.page = 100;
    component.onPrevResults();
    expect(component.page).toEqual(99);
    expect(window.scrollY).toEqual(0);
  });

  it('should move Scroll', function () {
    window.scrollTo({
      top: 100,
      left: 0
    });
    component.onMoveScroll();
    expect(window.scrollY).toEqual(0);
  });
});
