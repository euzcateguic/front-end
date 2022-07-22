import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  actors: actorDTO[];
  columnasAMostrar = ['index','name','acciones'];
  cantidadTotalRegistros;
  cantidadRegistrosAMostrar = 10;
  paginaActual = 1;

  constructor(private actoresService: ActoresService) { }



  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadAMostrar: number) {
    this.actoresService.obtenerTodos(pagina,cantidadAMostrar)
    .subscribe((response: HttpResponse<actorDTO[]>) => {
      this.actors = response.body;
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
    this.actoresService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }

}
