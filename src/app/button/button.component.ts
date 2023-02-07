import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'calculator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
   @Input() val!: string; 
   @Output() keyClicked = new EventEmitter<string>();
   
   onKeyClick(val: string){
     this.keyClicked.emit(val);
   }
}
