import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/Validadores/PrimeraLetraMayuscula';
import { EventEmitter } from '@angular/core';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  modelo: generoCreacionDTO;

  @Input ()
  errores: string[] = [];

  @Output()
  onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();

  ngOnInit(): void {
    console.log('Paso2');
    this.form = this.formBuilder.group({
      name: ['',{
        validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()]
      }] 
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios(){
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre(){
    var campo = this.form.get('name');

    if(campo.hasError('required'))
    {
      return 'El campo Nombre es requerido.';
    }
    
    if(campo.hasError('minlength'))
    {
      return 'La longitudd minima es de 3 caracteres.';
    }

    if(campo.hasError('primeraLetraMayuscula'))
    {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
  }
 
}
