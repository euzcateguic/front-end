import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO, actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private actoresService: ActoresService) { }

  modelo: actorDTO;
  errores: string[] = [];

 ngOnInit(): void {    
    this.activatedRoute.params.subscribe((params) => {
      this.actoresService.obtenerPorId(params.id)
      .subscribe(genero => {        
        this.modelo = genero;
        console.log(this.modelo);
      }, () => this.router.navigate(['/actores']))
    });
  }


  guardarCambios (genero: actorCreacionDTO){
    //...guarda los cambios
    this.actoresService.editar(this.modelo.id,genero)
    .subscribe(() => {
      this.router.navigate(['/actores']);
    },(error) => this.errores = parsearErroresAPI(error));    
    
  }
}
