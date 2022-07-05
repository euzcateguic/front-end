import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  constructor() { }
  contentMarkdown = '';

  @Input()
  placeHolderTextArea: string = 'Texto'

  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();  

  ngOnInit(): void {
  }

  // inputTextArea(text: string) {
  //   console.log(text);
  //   this.contentMarkdown = text;    
  // }

}
