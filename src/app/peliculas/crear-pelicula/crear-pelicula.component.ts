import { HttpResponse } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { item } from 'src/app/all-lists';
import { AllListsService } from 'src/app/all-lists.service';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { peliculaCreacionDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private router: Router, private allListsService: AllListsService,private peliculasService: PeliculasService) { }
  generos: item[];
  cines: item[];
  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];

  errores: string[] = [];

  ngOnInit(): void {

    this.allListsService.obtenerGenerosTodos()
    .subscribe((response: HttpResponse<item[]>) => {
       this.generos = response.body;
       this.generosNoSeleccionados = this.generos.map(genero => {return <MultipleSelectorModel>{llave: genero.value, valor: genero.description}});
    }, error => console.error(error));

    this.allListsService.obtenerCinesTodos()
    .subscribe((response: HttpResponse<item[]>) => {
       this.cines = response.body;
       this.cinesNoSeleccionados = this.cines.map(cine => {return <MultipleSelectorModel>{llave: cine.value, valor: cine.description}});
    }, error => console.error(error));

  }

  guardarCambios(pelicula: peliculaCreacionDTO) {
    this.peliculasService.crear(pelicula)
    .subscribe((pelicula:any) => {
      this.router.navigate(['/peliculas/' + pelicula.id.toString()])
    },(error) => this.errores = parsearErroresAPI(error));
    
  }
}
