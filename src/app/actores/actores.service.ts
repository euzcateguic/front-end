import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { actorCreacionDTO, actorDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {
  
  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'actors';


  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any> { 
    let params = new HttpParams();
    params = params.append('Page',pagina.toString());
    params = params.append('recordsByPage',cantidadRegistrosAMostrar.toString());
    return this.http.get<actorDTO[]>(this.apiURL,{observe: 'response', params});
  }

  public obtenerPorId(id: string): Observable<actorDTO> {
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  public crear(actor: actorCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this.http.post(this.apiURL,formData);
  }

  public editar(id: string,actor: actorCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this.http.put(`${this.apiURL}/${id}`,formData);
  }
  
  public borrar(id:string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  private construirFormData(actor: actorCreacionDTO) : FormData {
    const formData = new FormData();

    formData.append('name',actor.name);
    if(actor.biography) {
      formData.append('biography',actor.biography);
    }    
    if(actor.birthday) {
      formData.append('birthday',formatearFecha(actor.birthday));
    }    
    if(actor.photo){
      formData.append('photo',actor.photo);
    }
    return formData;

  }  

}
