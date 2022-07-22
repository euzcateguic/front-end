export interface actorDTO {
    id: string;
    name: string;
    birthday: Date;
    biography: string;
    photo: string;
}

export interface actorCreacionDTO {
    name: string;
    birthday: Date;
    biography: string;
    photo: File;
}