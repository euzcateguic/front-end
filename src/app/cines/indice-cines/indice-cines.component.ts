import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { cineDTO } from '../cines';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {

  theaters: cineDTO[] = [];
  columnasAMostrar = ['index','name','acciones'];
  cantidadTotalRegistros;
  cantidadRegistrosAMostrar = 10;
  paginaActual = 1;

  constructor(private cinesService: CinesService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadAMostrar: number) {
    this.cinesService.obtenerTodos(pagina,cantidadAMostrar)
    .subscribe((response: HttpResponse<cineDTO[]>) => {
      this.theaters = response.body;
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
    this.cinesService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }

}
