import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private router: Router,private activedRoute: ActivatedRoute) { }

  modelo: actorDTO = {
    nombre: 'Edward',
    fechaNacimiento: new Date('1991-08-30'),
    foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg'
  };

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      //alert(params.id);    
    });
  }

  guardarCambios (actor: actorCreacionDTO){
    //...guarda los cambios
    console.log(actor);
    this.router.navigate(['/actores']);
  }
}
