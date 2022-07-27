import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { item } from 'src/app/all-lists';
import { AllListsService } from 'src/app/all-lists.service';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { peliculaCreacionDTO, peliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private peliculaService: PeliculasService,
    private allListsService: AllListsService
    ) { }

  modelo: peliculaDTO; 
  generosNoSeleccionados: MultipleSelectorModel[];
  generosSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  cinesSeleccionados: MultipleSelectorModel[];
  actoresSeleccionados: actorPeliculaDTO[];



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculaService.obtenerPorId(params.id)
      .subscribe(pelicula => {          
          this.modelo = pelicula;   
          
          this.allListsService.obtenerGenerosTodos()
          .subscribe((response: HttpResponse<item[]>) => {             
             this.generosSeleccionados = pelicula.genres             
             .map(genero => { return <MultipleSelectorModel>{llave: genero.id,valor:genero.name}});

             this.generosNoSeleccionados = response.body
             .filter(genero => !this.generosSeleccionados.find(x => x.llave == genero.value))
             .map(genero => {return <MultipleSelectorModel>{llave: genero.value, valor: genero.description}});
          }, error => console.error(error));
      
          this.allListsService.obtenerCinesTodos()
          .subscribe((response: HttpResponse<item[]>) => {
            
            this.cinesSeleccionados = pelicula.theaters
            .map(cine => {return <MultipleSelectorModel>{ llave: cine.id, valor: cine.name }})

             this.cinesNoSeleccionados = response.body
             .filter(cine => !this.cinesSeleccionados.find(x => x.llave == cine.value))
             .map(cine => {return <MultipleSelectorModel>{llave: cine.value, valor: cine.description}});
          }, error => console.error(error));
          
          this.actoresSeleccionados = pelicula.actors;
      });
    });
  }


  guardarCambios(pelicula: peliculaCreacionDTO){
    this.peliculaService.editar(this.modelo.id, pelicula)
    .subscribe(() => this.router.navigate(['/peliculas/' + this.modelo.id]))
  }
}
