import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { latLng, tileLayer } from 'leaflet';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cines';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  modelo: cineDTO;
  errores: string[] = [];

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private cinesService: CinesService) { }  

  ngOnInit(): void {    
    this.activatedRoute.params.subscribe((params) => {
      this.cinesService.obtenerPorId(params.id)
      .subscribe(cine => {        
        this.modelo = cine;
        console.log(this.modelo);        
      }, () => this.router.navigate(['/cines']))
    }); 
  }

  guardarCambios (cine: cineCreacionDTO){
    //...guarda los cambios
    this.cinesService.editar(this.modelo.id,cine)
    .subscribe(() => {
      this.router.navigate(['/cines']);
    },(error) => this.errores = parsearErroresAPI(error));  
  }
}

