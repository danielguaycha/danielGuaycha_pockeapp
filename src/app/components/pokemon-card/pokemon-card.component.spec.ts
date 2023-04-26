import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonCardComponent} from '@components';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule} from 'ngx-toastr';
import {BaseUrlInterceptor} from '@utils';
import {environment} from '../../../environments/environment';
import {IPokemon} from '@entities';
import {of} from 'rxjs';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
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
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
        }
      }
    },
    types: [
      {type: {name: 'Fire', url: ''}}
    ],
    weight: 100
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot({})],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
        {provide: 'BASE_API_URL', useValue: environment.apiUrl}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(component.pokemonService, 'getPocketByIdOrName').and.returnValue(
      of(pokemon)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getPokemonData', function () {
    component.getPokemonData();
    expect(component.pokemon).not.toBeNull();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pokemon-container')).not.toEqual(null);
    component.extractColor();
    setTimeout(() => {
      expect(component.color).not.toEqual('#000');
    }, 1500);
  });

  it('should select pokemon', () => {
    spyOn(component.selectPokemon, 'emit');
    component.onSelectPokemon();
    expect(component.selectPokemon.emit).toBeTruthy();
  });
});
