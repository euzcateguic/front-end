import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  peliculasCines;
  ocultar = false;
  peliculasEstrenos = [];

  ngOnInit(): void {
    this.peliculasCines = [{
      titulo: 'Spider-Man: No Way Home',
      fecha: new Date('2021-12-17'),
      precio: 4,
      poster: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/cover_290x414/public/media/image/2021/03/spider-man-no-way-home-cartel-2262659.jpg?itok=rxEAFSVM'
    },
    {
      titulo: 'Moana: Un mar de aventuras',
      fecha: new Date(),
      precio: 3,
      poster: 'https://static.wikia.nocookie.net/disney/images/7/76/Moana_official_poster.jpg'
    }];
  }

}
