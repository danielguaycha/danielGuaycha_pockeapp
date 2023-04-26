import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPokemon, IPokemonItem} from '@entities';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  constructor(private http: HttpClient) {
  }

  getAllPokemon(limit = 20, offset = 0): Observable<IPokemonItem> {
    return this.http.get<IPokemonItem>(`pokemon`, {
      params: {
        limit,
        offset
      }
    });
  }

  getPocketByIdOrName(idOrName: number | string): Observable<IPokemon> {
    return this.http.get<IPokemon>(`pokemon/${idOrName}`);
  }
}
