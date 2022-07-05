import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { peliculaCreacionDTO } from '../peliculas';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  guardarCambios(pelicula: peliculaCreacionDTO) {
    console.log(pelicula);
    this.router.navigate([''])
  }
}
