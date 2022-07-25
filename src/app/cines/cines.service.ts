import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO, cineDTO } from './cines';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiURL = environment.apiURL + 'theaters';

  constructor(private http: HttpClient) { }

  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any> { 
    let params = new HttpParams();
    params = params.append('Page',pagina.toString());
    params = params.append('recordsByPage',cantidadRegistrosAMostrar.toString());
    return this.http.get<cineDTO[]>(this.apiURL,{observe: 'response', params});
  }

  public obtenerPorId(id: string): Observable<cineDTO> {
    return this.http.get<cineDTO>(`${this.apiURL}/${id}`);
  }

  public crear(cine: cineCreacionDTO) {
    return this.http.post(this.apiURL,cine);
  }

  public editar(id: string,cine: cineCreacionDTO) {
    return this.http.put(`${this.apiURL}/${id}`,cine);
  }

  public borrar(id:string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
