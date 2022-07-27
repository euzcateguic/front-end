import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { peliculaCreacionDTO, peliculaDTO } from '../peliculas';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { actorPeliculaDTO } from 'src/app/actores/actor';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()
  errores: string[] = [];

  form: FormGroup

  @Input()
  modelo: peliculaDTO;

  @Output()
  OnSubmit: EventEmitter<peliculaCreacionDTO> = new EventEmitter<peliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[] = []; 

  @Input()
  generosSeleccionados: MultipleSelectorModel[] = [];
  
  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['',{
        validators: [Validators.required]
      }],
      overview: '',
      inTheaters: false,
      trailer: '',
      launchDate: '',
      poster: '',
      genresIds: '',
      theatersIds: '',
      actors: ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guadarCambios() {
    const generosId = this.generosSeleccionados.map(val => val.llave);
    this.form.get('genresIds').setValue(generosId);

    const cinesId = this.cinesSeleccionados.map(val => val.llave);    
    this.form.get('theatersIds').setValue(cinesId);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id,character: val.character}
    })

    this.form.get('actors').setValue(actores);

    if(!this.imagenCambiada)
    {
      this.form.patchValue({'poster':null});
    }

    this.OnSubmit.emit(this.form.value);
  }


  archivoSeleccionado(archivo: File){        
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  changeMarkdown(texto: string){
    this.form.get('overview').setValue(texto);
  }  
}
