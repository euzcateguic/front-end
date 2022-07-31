import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
  maxRating = 5;
  @Input()
  ratingSeleccionado = 0;
  @Output() rated: EventEmitter<number> = new EventEmitter<number>();

  maximoRagtingArr = [];
  voto = false;
  ratingAnterior = 0;

  constructor(
    private seguridadService: SeguridadService
    ) { }

  ngOnInit(): void {
    this.maximoRagtingArr = Array(this.maxRating).fill(0);
  }

  MouseEnter(index: number) : void {
    this.ratingSeleccionado = index + 1;
  }

  MouseLeave() {
    if(this.ratingAnterior !== 0)
    {
      this.ratingSeleccionado = this.ratingAnterior;      
    }
    else
    {
      this.ratingSeleccionado = 0;
    }
  }

  rate(index: number) : void {
    if(this.seguridadService.isAuthenticate()) {
      this.ratingSeleccionado = index + 1;
      this.voto = true;
      this.ratingAnterior = this.ratingSeleccionado;
      this.rated.emit(this.ratingSeleccionado);
    }
    else {
      Swal.fire('Debe loguearse',"No puede realizar esta acción",'error');
    }
  }

}
