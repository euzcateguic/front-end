import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  generos: generoDTO[];
  columnasAMostrar = ['index','name','acciones'];
  cantidadTotalRegistros;
  cantidadRegistrosAMostrar = 10;
  paginaActual = 1;

  constructor(private generosService: GenerosService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadAMostrar: number) {
    this.generosService.obtenerTodos(pagina,cantidadAMostrar)
    .subscribe((response: HttpResponse<generoDTO[]>) => {
      this.generos = response.body;
      this.cantidadTotalRegistros = response.headers.get("TotalRecords");
    },error => console.error(error));    
  }

  actualizarPaginacion(datos: PageEvent)
  {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  eliminar(id: string) {
    this.generosService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }
}
