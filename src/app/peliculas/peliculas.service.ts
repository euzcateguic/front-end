import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { LandingPageDTO, peliculaCreacionDTO, peliculaDTO } from './peliculas';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiURL = environment.apiURL + 'movies';
  constructor(private http: HttpClient) { }

  public obtenerLandingPage(): Observable<LandingPageDTO> {
    return  this.http.get<LandingPageDTO>(this.apiURL);
  }

  public obtenerPorId(id: string): Observable<peliculaDTO> {
    return this.http.get<peliculaDTO>(`${this.apiURL}/${id}`);
  }

  public filtrar(valores:any): Observable<any> {
    const params = new HttpParams({fromObject: valores});
    // let params = new HttpParams();
    // params = params.append('Page',valores.pagina.toString());
    // params = params.append('recordsByPage',valores.cantidadRegistrosAMostrar.toString());
    return this.http.get<peliculaDTO[]>(`${this.apiURL}/filters`,
    {params,observe: 'response'});
  }

  public crear(pelicula: peliculaCreacionDTO): Observable<any> {
    const formData = this.construirFormData(pelicula);
    return this.http.post<any>(this.apiURL,formData);
  }

  public editar(id: string, pelicula: peliculaCreacionDTO){
    const formData = this.construirFormData(pelicula);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public borrar(id:string) {
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  private construirFormData(pelicula: peliculaCreacionDTO): FormData {
      const formData = new FormData();

      formData.append('title',pelicula.title);
      formData.append('overview',pelicula.overview);
      formData.append('trailer',pelicula.trailer);
      formData.append('inTheaters',String(pelicula.inTheaters));     
      if(pelicula.launchDate) {
        formData.append('launchDate',formatearFecha(pelicula.launchDate));
      } 
      
      if(pelicula.poster) {
        formData.append('poster',pelicula.poster);
      }
      
      formData.append('genresIds',JSON.stringify(pelicula.genresIds));
      formData.append('theatersIds',JSON.stringify(pelicula.theatersIds));
      formData.append('actors',JSON.stringify(pelicula.actors));

      return formData;
  }

}
