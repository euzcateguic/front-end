import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { peliculaCreacionDTO, peliculaDTO } from '../peliculas';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  modelo: peliculaDTO = {titulo: 'Spider-Man',trailer: 'abc',enCines: true,resumen: 'El Resumen',
                        fechaLanzamiento: new Date(), poster: 'https://www.imdb.com/title/tt10872600/mediaviewer/rm3936939521/?ref_=tt_ov_i'}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
    });
  }

  guardarCambios(pelicula: peliculaCreacionDTO) {
    console.log(pelicula);
    this.router.navigate([''])
  }
}
