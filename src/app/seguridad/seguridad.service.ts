import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredencialesUsuario, RespuestaAutenticacion } from './Seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

apiURL = environment.apiURL + 'accounts';
private readonly llaveToken = 'token';
private readonly llaveExpiracion = 'token-expiracion';

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticate(): boolean {
    const token = localStorage.getItem(this.llaveToken);

    if(!token)
    {
      return false;      
    }

    const expiration = localStorage.getItem(this.llaveExpiracion);
    const expirationDate = new Date(expiration);

    if(expirationDate <= new Date())
    {
      this.logout();
      return false;      
    }

    return true;
  }

  obtenerRol():string {
    return '';
  }

  obtenerCampoJWT(campo:string): string {
    const  token = localStorage.getItem(this.llaveToken);
    if(!token) {return ''};

    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  registrar(credenciales: CredencialesUsuario): Observable<RespuestaAutenticacion>{
    return this.http.post<RespuestaAutenticacion>(`${this.apiURL}/create`,credenciales);
  } 

  login(credenciales: CredencialesUsuario): Observable<RespuestaAutenticacion>{
    return this.http.post<RespuestaAutenticacion>(`${this.apiURL}/login`,credenciales);
  } 

  logout(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  } 

  guardarToken(respuestaAutenticacion: RespuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiration.toString());
  }
}
