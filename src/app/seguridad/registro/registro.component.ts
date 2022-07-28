import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { CredencialesUsuario } from '../Seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errores: string[] = [];

  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registrar(credenciales: CredencialesUsuario){
    this.seguridadService.registrar(credenciales)
    .subscribe(response => {
      this.seguridadService.guardarToken(response);
      this.router.navigate(['/']);
    },errores => this.errores = parsearErroresAPI(errores));
  }
}
