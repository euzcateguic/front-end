import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) { }

  form: FormGroup;
  generos = [{id:1, nombre:'Drama'},
            {id:2, nombre:'Accion'},
            {id:3, nombre:'Comedia'},
            {id:4, nombre:'Familiar'},
            {id:5, nombre:'Infantiles'}
  ];

  peliculas = [{titulo: 'Spider-Man: No Way Home', enCines: false, proximosEstrenos: true, generos: [1,2], poster: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/cover_290x414/public/media/image/2021/03/spider-man-no-way-home-cartel-2262659.jpg?itok=rxEAFSVM'},
               {titulo: 'Moana: Un mar de aventuras', enCines: true, proximosEstrenos: false, generos: [3,4,5], poster: 'https://static.wikia.nocookie.net/disney/images/7/76/Moana_official_poster.jpg'},
               {titulo: 'Eternals', enCines: false, proximosEstrenos: true, generos: [1,2], poster: 'https://blogdesuperheroes.es/wp-content/plugins/BdSGallery/BdSGaleria/108634.jpg'},
               {titulo: 'Shang-Chi and the Legend of the Ten Rings (2021)', enCines: false, proximosEstrenos: true, generos: [1,2], poster: 'https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/222997/FND_poster_ShangChi_InTheaters.jpg'},
               {titulo: 'Free Guy', enCines: true, proximosEstrenos: false, generos: [1,3], poster: 'https://static.wikia.nocookie.net/disney/images/e/e6/Free_Guy_Final_Poster.jpg'},
               {titulo: 'Don\'t Breathe 2', enCines: true, proximosEstrenos: false, generos: [1,2], poster: 'https://gcdn.lanetaneta.com/wp-content/uploads/2021/07/Dont-Breathe-2-obtiene-un-nuevo-poster.jpeg'},
  ];

  peliculasOriginal = this.peliculas;

  formularioOriginal = {      
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges
    .subscribe(valores => {
      this.peliculas = this.peliculasOriginal;
        this.buscarPeliculas(valores);
        this.escribirParametrosEnURL();
    });
  }
  
  buscarPeliculas(valores: any){
    this.peliculas = this.peliculasOriginal;

    if(valores.titulo){      
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if(valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if(valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }


  private escribirParametrosEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`)
    }

    if(valoresFormulario.generoId !== '0') {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if(valoresFormulario.proximosEstrenos) {
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if(valoresFormulario.enCines) {
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) => {
        var objeto: any = {};

        if(params.titulo) {
          objeto.titulo = params.titulo;
        }

        if(params.generoId) {
          objeto.generoId = Number(params.generoId);          
        }

        if(params.proximosEstrenos) {
          objeto.proximosEstrenos = params.proximosEstrenos;
        }

        if(params.enCines) {
          objeto.enCines = params.enCines;
        }

        this.form.patchValue(objeto);
    });
  }
  
  
}
