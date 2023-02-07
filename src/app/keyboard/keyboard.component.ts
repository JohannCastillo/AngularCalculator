import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'calculator-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./../app.component.css', './keyboard.component.css']
})
export class KeyboardComponent {
  buttons = [
    'x²', 'C', '«', '÷', '7', '8', '9', '×', '4', '5', '6', '+', '1', '2', '3', '-', '√', '0', '.', '='
  ];
  @Output() key = new EventEmitter<string>();
  received(keyClicked: string) {
    this.key.emit(keyClicked);
  }

}
