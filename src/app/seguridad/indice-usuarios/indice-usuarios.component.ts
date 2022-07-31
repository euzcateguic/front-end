import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { UsuarioDTO } from '../Seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {

  usuarios: UsuarioDTO[] = [];

  columnasAMostrar = ['index','email','acciones'];
  cantidadTotalRegistros;
  cantidadRegistrosAMostrar = 10;
  paginaActual = 1;

  constructor(
    private seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadAMostrar: number) {
    this.seguridadService.obtenerUsuarios(pagina,cantidadAMostrar)
    .subscribe((response: HttpResponse<UsuarioDTO[]>) => {
      this.usuarios = response.body;
      this.cantidadTotalRegistros = response.headers.get("TotalRecords");
    },error => console.error(error));    
  }

  actualizarPaginacion(datos: PageEvent)
  {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  setAdmin(id: string) {
    this.seguridadService.setAdmin(id)
    .subscribe(() => {
      Swal.fire('Exitoso','Usuario Acutalizado!','success');
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }


  removeAdmin(id: string) {
    this.seguridadService.removeAdmin(id)
    .subscribe(() => {
      Swal.fire('Exitoso','Usuario Acutalizado!','success');
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }

}
