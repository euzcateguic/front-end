import { Component, OnInit } from '@angular/core';
import { peliculaDTO } from '../peliculas/peliculas';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor (
    private peliculasService: PeliculasService
  ) { }

  peliculasCines: peliculaDTO[]; 
  peliculasEstrenos: peliculaDTO[];
  
  ngOnInit(): void {
    this.cargarDatos();
  }

  borrado(){
    this.cargarDatos();
  }

  cargarDatos(){
    this.peliculasService.obtenerLandingPage()
    .subscribe(landingPage => {
        this.peliculasCines = landingPage.inTheaters;
        this.peliculasEstrenos = landingPage.moviePremiers;
    });
  } 
}
