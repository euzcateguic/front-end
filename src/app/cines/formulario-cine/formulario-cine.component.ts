import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { cineCreacionDTO } from '../cines';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css']
})
export class FormularioCineComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  initLon: number = -426.5759173035622;
  initlat: number = 10.465717972731921;

  @Input()
  errores: string[] = [];

  @Input()
  modelo: cineCreacionDTO;

  @Output()
  options;

  @Output()
  guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  coordenadaInicial: Coordenada[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',{
        validators: [Validators.required]
      }],
      latitude: ['',{
        Validators: [Validators.required]
      }],
      longitude: ['',{
        Validators: [Validators.required]
      }]
    });    

    if(this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({latitude: this.modelo.latitude, longitude: this.modelo.longitude}); 
      this.initLon = this.modelo.longitude;
      this.initlat = this.modelo.latitude;     
    }

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: 18,
      center: latLng(this.initlat,this.initLon)
    };
  }

  coordenadaSeleccionada(coordenada: Coordenada) {
    this.form.patchValue(coordenada);
  }

  OnSubmit(){
    this.guardarCambios.emit(this.form.value);
  }

}
