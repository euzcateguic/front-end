import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { item } from './all-lists';
import { cineDTO } from './cines/cines';
import { generoDTO } from './generos/genero';

@Injectable({
  providedIn: 'root'
})
export class AllListsService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  public obtenerCinesTodos(): Observable<any> {
    return this.http.get<item[]>(`${this.apiURL}theaters/getalltolist`,{observe: 'response'});
  }
  
  public obtenerGenerosTodos(): Observable<any> {
    return this.http.get<item[]>(`${this.apiURL}genres/getalltolist`,{observe: 'response'});
  }
}



