import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { latLng, tileLayer } from 'leaflet';
import { RatingService } from 'src/app/rating/rating.service';
import { Coordenada, CoordenadaConMensaje } from 'src/app/utilidades/mapa/coordenada';
import Swal from 'sweetalert2';
import { peliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {

  constructor(
    private peliculaService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private  sanitizer: DomSanitizer,
    private ratingService: RatingService
    ) { }

  pelicula: peliculaDTO;
  fechaLanzamiento: Date;
  trailerURL: SafeResourceUrl;
  coordenadas: CoordenadaConMensaje[]
  @Output()
  options;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculaService.obtenerPorId(params.id)
      .subscribe(pelicula => {
          console.log(pelicula);
          this.pelicula = pelicula;
          this.fechaLanzamiento = new Date(this.pelicula.launchDate);
          this.trailerURL = this.generarURLYoutubeEmbed(this.pelicula.trailer);
          this.coordenadas = this.pelicula.theaters.map(cine => {
              return {longitude: cine.longitude,latitude: cine.latitude, mensaje: cine.name}
          });

          if(this.coordenadas.length > 0) {          
            this.options = {
              layers: [
                tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  maxZoom: 18,
                  attribution: '...',
                }),
              ],
              zoom: 8,
              center: latLng(this.coordenadas[0].latitude,this.coordenadas[0].longitude)
            };
          }
      });
    });
  }

  generarURLYoutubeEmbed(url:any): SafeResourceUrl {
    if(!url){
      return '';
    }

    var video_id = url.split('v=')[1];
    var posicionAmp = video_id.indexOf('&');
    if(posicionAmp !== -1)
    {
      video_id = video_id.substring(0,posicionAmp);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video_id}`);
  }

  rated(puntuacion: number) {
    this.ratingService.rate(this.pelicula.id,puntuacion)
    .subscribe(() => {
      Swal.fire("Exitoso","Voto enviado",'success');
    })
  }
}
