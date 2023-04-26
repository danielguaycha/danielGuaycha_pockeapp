import {TestBed} from '@angular/core/testing';
import {PokemonApiService} from './pokemon-api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BaseUrlInterceptor} from '@utils';

describe('PokeApiService', () => {
  let service: PokemonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
        {provide: 'BASE_API_URL', useValue: environment.apiUrl}
      ]
    });
    service = TestBed.inject(PokemonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAllPokemon', (done: DoneFn) => {
    const res$ = service.getAllPokemon(5, 0);
    res$.subscribe(res => {
      expect(res).not.toBeNull();
      expect(res.count).toBeGreaterThan(100);
      expect(res.results.length).toEqual(5);
      expect(res.previous).toEqual(null);
      done();
    });
  });

  it('should getPocketByIdOrName success', (done: DoneFn) => {
    const res$ = service.getPocketByIdOrName('pikachu');
    res$.subscribe(res => {
      expect(res.sprites.back_shiny).not.toEqual('');
      expect(res.name).toEqual('pikachu');
      done();
    });
  });
});
