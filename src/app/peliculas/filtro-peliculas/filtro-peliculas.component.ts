import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { peliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private location: Location, 
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private generosService: GenerosService
    ) { }

  form: FormGroup = new FormGroup({    
      title: new FormControl(),
      genreId: new FormControl(),
      NextPremiers: new FormControl(),
      InTheaters: new FormControl()    
  });

  generos: generoDTO[] = [];

  peliculas: peliculaDTO[] = [];
  Page = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;

  formularioOriginal = {      
    title: '',
    genreId: '',
    NextPremiers: false,
    InTheaters: false
  }

  ngOnInit(): void {

    this.generosService.obtenerTodos()
      .subscribe(generos => {
        this.generos = generos;
        
        this.form = this.formBuilder.group(this.formularioOriginal);
        this.leerValoresURL();
        this.buscarPeliculas(this.form.value);

        this.form.valueChanges
        .subscribe(valores => {
            this.buscarPeliculas(valores);
            this.escribirParametrosEnURL();
      });
    });    
  }
  
  buscarPeliculas(valores: any){
    valores.Page = this.Page;
    valores.recordsByPage = this.cantidadElementosAMostrar;

    this.peliculasService.filtrar(valores)
    .subscribe(response => {
      this.peliculas = response.body;
      this.escribirParametrosEnURL();
      this.cantidadElementos = response.headers.get('TotalRecords');
    });
  }


  private escribirParametrosEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if(valoresFormulario.title) {
      queryStrings.push(`title=${valoresFormulario.title}`)
    }

    if(valoresFormulario.genreId !== '') {
      queryStrings.push(`genreId=${valoresFormulario.genreId}`);
    }

    if(valoresFormulario.NextPremiers) {
      queryStrings.push(`NextPremiers=${valoresFormulario.NextPremiers}`);
    }

    if(valoresFormulario.InTheaters) {
      queryStrings.push(`InTheaters=${valoresFormulario.InTheaters}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos: PageEvent) {
    this.Page = datos.pageIndex +1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) => {
        var objeto: any = {};

        if(params.title) {
          objeto.title = params.title;
        }

        if(params.genreId) {
          objeto.genreId = params.genreId;          
        }

        if(params.NextPremiers) {
          objeto.NextPremiers = params.NextPremiers;
        }

        if(params.InTheaters) {
          objeto.InTheaters = params.InTheaters;
        }

        this.form.patchValue(objeto);
    });
  }
  
  borrado(){
    this.buscarPeliculas(this.form.value);    
  }
  
}
