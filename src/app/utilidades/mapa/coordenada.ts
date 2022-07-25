export interface Coordenada {
    latitude: number;
    longitude: number;
}

export interface CoordenadaConMensaje extends Coordenada{
    mensaje: string;
}