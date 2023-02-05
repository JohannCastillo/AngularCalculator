import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
   @Input() val?: string; 
}
