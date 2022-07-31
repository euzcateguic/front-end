import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(
    private http: HttpClient
    ) { }

    apiURL = environment.apiURL + 'ratings'

    rate(peliculaId: string, puntuacion: number) {
      const obj =  {
        movieId: peliculaId,
        score: puntuacion
      }
      return this.http.post(this.apiURL,obj);
    }
}
