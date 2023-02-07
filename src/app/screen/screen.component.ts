import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'calculator-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css', './../app.component.css']
})
export class ScreenComponent implements DoCheck{
  @Input() keyPressed!: string;
  displayP: string;
  displayS: string;
  // Won't be shown 
  notnumber = ["C", "=", "«", "÷","×", "+", "-", "x²", "√"]
  constructor() {
    this.displayP = "0";
    this.displayS = "";
  }

  ngDoCheck() {
    if (this.notnumber.indexOf(this.keyPressed) == -1){
      (this.displayP == "0" ) ? this.displayP = "" : "";
      (this.keyPressed != undefined ) ? this.displayP += this.keyPressed : this.displayP = "0";
    }else
      this.handleOthers(this.keyPressed);
  }

  handleOthers(other: string) {
    if (other == "C") {
      this.displayP = "0";
      this.displayS = " ";
    }
    if (other == "=") {
      this.displayS += " " + this.displayP + " ="
      this.displayP = this.showResult(this.displayS);
    }
    if (other == "«"){
      this.displayP = this.displayP.substring(0, this.displayP.length - 1);
      (this.displayP.length == 0) ? this.displayP = "0" : "";
    }

    if(other == "x²"){
      this.displayS = this.displayP + "² ="
      this.displayP = this.showResult(this.displayS);
    }
    if (other == "√"){
      this.displayInS("√"+this.displayP + " =")
    }

    if (other == "+" || other == "-" || other == "×" || other == "÷") {
      this.displayInS(this.displayP +" "+ other)
      this.displayInP("0");
    }
  }

  displayInP(string: string){
    this.displayP = string;
  }

  displayInS(string: string){
    this.displayS = string;
  }

  showResult(input: string){
    let result = "100"
    return result;
  } 
}
