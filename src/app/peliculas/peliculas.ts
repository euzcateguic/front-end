import { actorPeliculaDTO } from "../actores/actor";
import { cineDTO } from "../cines/cines";
import { generoDTO } from "../generos/genero";

export interface peliculaCreacionDTO {
    id:string;
    title: string,    
    overview: string,
    inTheaters: boolean,
    launchDate: Date,
    trailer: string,
    poster: File,
    genresIds: string[],
    theatersIds: string[],
    actors: actorPeliculaDTO[]
}

export interface peliculaDTO {
    id: string;
    title: string,    
    overview: string,
    inTheaters: boolean,
    launchDate: Date,
    trailer: string,
    poster: string,
    genres: generoDTO[],
    actors: actorPeliculaDTO[],
    theaters: cineDTO[]
}

export interface  LandingPageDTO {
    inTheaters: peliculaDTO[];
    moviePremiers: peliculaDTO[];
}