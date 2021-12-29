import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cineCreacionDTO, cineDTO } from '../cines';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }

  modelo: cineDTO = {nombre: "Sambil", latitud: 10.465717972731921, longitud: -426.5759173035622};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
    })
  }

  guardarCambios (cine: cineCreacionDTO){
    //...guarda los cambios
    console.log(cine);
    this.router.navigate(['/cines']);
  }

}
