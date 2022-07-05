import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { peliculaCreacionDTO, peliculaDTO } from '../peliculas';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup

  @Input()
  modelo: peliculaDTO;

  @Output()
  OnSubmit: EventEmitter<peliculaCreacionDTO> = new EventEmitter<peliculaCreacionDTO>();

  generosNoSeleccionados: MultipleSelectorModel[] = [
    {llave: 1, valor: 'Comedia'},
    {llave: 2, valor: 'Terror'},
    {llave: 3, valor: 'Drama'},
    {llave: 4, valor: 'Accion'}
  ];

  generosSeleccionados: MultipleSelectorModel[] = [];

  cinesNoSeleccionados: MultipleSelectorModel[] = [
    {llave: 1, valor: 'Sambil'},
    {llave: 2, valor: 'El Recreo'},
    {llave: 3, valor: 'Lider'},
    {llave: 4, valor: 'El Marquez'}
  ];
  cinesSeleccionados: MultipleSelectorModel[] = [];


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['',{
        validators: [Validators.required]
      }],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosId: '',
      cinesId: ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guadarCambios() {
    const generosId = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosId').setValue(generosId);

    const cinesId = this.cinesSeleccionados.map(val => val.llave);    
    this.form.get('cinesId').setValue(cinesId);

    this.OnSubmit.emit(this.form.value);
  }


  archivoSeleccionado(archivo: File){
    console.log(this.generosSeleccionados);
    this.form.get('poster').setValue(archivo);
  }

  changeMarkdown(texto: string){
    this.form.get('resumen').setValue(texto);
  }  
}
