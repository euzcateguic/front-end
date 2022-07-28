import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { CredencialesUsuario } from '../Seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errores: string[] = [];

  constructor(
    private seguridadService: SeguridadService,
    private router: Router    
  ) { }

  ngOnInit(): void {
  }

  login(credenciales: CredencialesUsuario){
    this.seguridadService.login(credenciales)
    .subscribe(response => {
      this.seguridadService.guardarToken(response);
      this.router.navigate(['/']);
    },errores => this.errores = parsearErroresAPI(errores));
  }
}
