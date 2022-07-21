import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoCreacionDTO, generoDTO } from './genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private  http: HttpClient) { }

  private apiURL = environment.apiURL + 'genres';

  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any> { 
    let params = new HttpParams();
    params = params.append('Page',pagina.toString());
    params = params.append('recordsByPage',cantidadRegistrosAMostrar.toString());
    return this.http.get<generoDTO[]>(this.apiURL,{observe: 'response', params});
  }

  public obtenerPorId(id: string): Observable<generoDTO> {
    return this.http.get<generoDTO>(`${this.apiURL}/${id}`);
  }

  public crear(genero: generoCreacionDTO) {
    return this.http.post(this.apiURL,genero);
  }

  public editar(id: string,genero: generoCreacionDTO) {
    return this.http.put(`${this.apiURL}/${id}`,genero);
  }
  
  public borrar(id:string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
