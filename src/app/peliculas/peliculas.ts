export interface peliculaCreacionDTO {
    titulo: string,    
    resumen: string,
    enCines: boolean,
    fechaLanzamiento: Date,
    trailer: string,
    poster: File
}

export interface peliculaDTO {
    titulo: string,    
    resumen: string,
    enCines: boolean,
    fechaLanzamiento: Date,
    trailer: string,
    poster: string
}