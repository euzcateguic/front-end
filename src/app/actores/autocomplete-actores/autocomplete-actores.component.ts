import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl();
  actores =  [{nombre: 'Tom Holland',personaje: '', foto: 'https://m.media-amazon.com/images/M/MV5BNzZiNTEyNTItYjNhMS00YjI2LWIwMWQtZmYwYTRlNjMyZTJjXkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_UX214_CR0,0,214,317_AL_.jpg'},
            {nombre: 'Tom Hanks',personaje: '', foto: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg'},
            {nombre: 'Leonardo DiCaprio',personaje: '', foto: 'https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY317_CR10,0,214,317_AL_.jpg'}
           ]
  
  actoresOriginal = this.actores;

  actoresSeleccionados = [];

  columnasAMostrar = ['imagen','nombre','personaje','acciones']

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
        this.actores = this.actoresOriginal;
        if(!valor.nombre)
        this.actores = this.actores.filter(actor => actor.nombre.toLowerCase().indexOf(valor.toLowerCase()) !== -1);      
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value)
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined)
      this.table.renderRows();
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.find(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice,1);
    this.table.renderRows();
  }

  finalizarArrastre(event: CdkDragDrop<any[]>) {
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    )
    moveItemInArray(this.actoresSeleccionados,indicePrevio,event.currentIndex);
    this.table.renderRows();
  }

}
