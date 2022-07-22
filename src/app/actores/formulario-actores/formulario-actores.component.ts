import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()
  modelo: actorDTO;

  @Input ()
  errores: string[] = [];

  @Output()
  OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  form: FormGroup; 
  imagenCambiada = false;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['',{
        validators: [Validators.required]
      }],
      birthday: '',
      photo: '',
      biography: ''
    });

    if(this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }

  }

  onSubmit(){
    if(!this.imagenCambiada) {
      this.form.patchValue({'photo': null});
    }
    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(file) {
    this.imagenCambiada = true;
    this.form.get('photo').setValue(file);  
  }

  cambioMarkdown(text: string) {
    this.form.get('biography').setValue(text);
  }
}
