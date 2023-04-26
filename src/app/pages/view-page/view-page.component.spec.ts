import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewPageComponent} from '@pages';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BaseUrlInterceptor} from '@utils';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {IPokemon} from '@entities';
import {of} from 'rxjs';

describe('ViewPageComponent', () => {
  let component: ViewPageComponent;
  let fixture: ComponentFixture<ViewPageComponent>;
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
      declarations: [ViewPageComponent],
      imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot({})],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
        {provide: 'BASE_API_URL', useValue: environment.apiUrl},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'pikachu'
              },
            },
          },
        },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ViewPageComponent);
    component = fixture.componentInstance;
    component.pokemonName = 'pikachu';
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(component.pokeApiService, 'getPocketByIdOrName').and.returnValue(
      of(pokemon)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.pokemonName).toEqual('pikachu');
    expect(component.pokeData).toEqual(null);
  });

  it('should without pokemon', function () {
    component.getPokeData();
    expect(component.pokeData).not.toEqual(null);
    expect(component.pokeData?._color).not.toEqual('#000');
  });

  it('should with pokemon', () => {
    component.pokeData = pokemon;
    component.getPokeData();
    expect(component.pokeData._color).not.toEqual('#000');
  });

  it('should not found', function () {
    component.pokeData = null;
    component.pokemonName = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-not-found')).not.toEqual(null);
  });
});
