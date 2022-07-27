import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { peliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  constructor(
    private peliculaService: PeliculasService
  ) { }
  @Input()
  peliculas: peliculaDTO[];

  @Output()
  borrado: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
   
  }

  eliminar(id: string) : void {
    this.peliculaService.borrar(id)
    .subscribe(() => {
      this.borrado.emit();
    });
  }

  setRating(voto: number) : void {
    alert(voto);
  }
}
