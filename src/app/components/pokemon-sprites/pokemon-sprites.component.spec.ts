import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonSpritesComponent} from '@components';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BaseUrlInterceptor} from '@utils';
import {environment} from '../../../environments/environment';

describe('PokemonSpritesComponent', () => {
  let component: PokemonSpritesComponent;
  let fixture: ComponentFixture<PokemonSpritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonSpritesComponent],
      imports: [HttpClientModule, ToastrModule.forRoot({})],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
        {provide: 'BASE_API_URL', useValue: environment.apiUrl}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonSpritesComponent);
    component = fixture.componentInstance;
    component.sprites = {
      back_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      back_shiny_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      front_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      other: {
        dream_world: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
        }
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sprites contain', function () {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sprites')).not.toEqual(null);
    expect(compiled.querySelector('.sprites .items')?.childNodes.length).toBeGreaterThan(0);
  });
});
