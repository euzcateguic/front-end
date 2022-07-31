import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
private readonly roleField = 'role';

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

  obtenerUsuarios(page: number,recordsByPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page',page.toString());
    params = params.append('recordsByPage',recordsByPage.toString());
    return this.http.get(`${this.apiURL}/users`,{observe: 'response',params});
  }

  setAdmin(id:string)  {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/RoleAdminAssign`,JSON.stringify(id),{headers});
  }

  removeAdmin(id:string)  {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/RoleAdminRemove`,JSON.stringify(id),{headers});
  }

  obtenerRol():string {
    return this.obtenerCampoJWT(this.roleField);
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

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }
}
