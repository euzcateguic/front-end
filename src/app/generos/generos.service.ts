import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoDTO } from './genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private  http: HttpClient) { }

  private apiURL = environment.apiURL;

  public obtenerTodos(): Observable<generoDTO[]> {    
    return this.http.get<generoDTO[]>(this.apiURL+'genres');
  }
}
