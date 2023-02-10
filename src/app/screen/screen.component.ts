import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'calculator-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css', './../app.component.css']
})
export class ScreenComponent implements DoCheck {
  @Input() keyPressed!: string;
  displayP: string = "";
  displayS: string = "";
  operator: string = "";
  fOperand: number = NaN;
  sOperand: number = NaN;
  zeroCounter: number = 0;
  result: number = NaN;
  //Operators
  operators = ["÷", "×", "+", "-", "x²", "√"]
  // Others
  others = ["C", "=", "«"]
  constructor() {
 
  }

  ngDoCheck() {
    if (this.displayP === "Math Error") this.keyPressed = "C"
    if (this.others.indexOf(this.keyPressed) == -1 && this.operators.indexOf(this.keyPressed) == -1) {
      //0 Input control      
      //KeyPressed undefined control
      if(this.keyPressed == undefined ) {
        this.displayInP("0")
      }else{
        if(this.keyPressed == "0" && this.displayP == "0"){
          this.displayInP("");
        }else
          (this.displayP.startsWith("0") ) ? this.displayP = this.displayP.substring(1, this.displayP.length) : "";
          //Decimal point control
          (this.keyPressed == "." && this.displayP.indexOf(".") == -1) ? this.displayP += this.keyPressed : "";
          (this.keyPressed != ".") ? this.displayP += this.keyPressed : "";
      }
    } else
      this.others.indexOf(this.keyPressed) != -1 ? this.handleOthers(this.keyPressed) : this.handleOperators(this.keyPressed);
  }

  handleOthers(other: string) {
    switch (other) {
      case "C":
        this.displayInP("0");
        this.displayInS(" ");
        this.operator = "";
        this.fOperand = NaN;
        this.sOperand = NaN;
        this.zeroCounter = 0;
        this.result = NaN;
        break;
      case "=":
        
        if (isNaN(this.result)) {
          (isNaN(this.fOperand)) ? this.fOperand = parseFloat(this.displayP.slice(0, this.displayP.length)) : this.sOperand = parseFloat(this.displayP.slice(0, this.displayP.length));  
        } else{
          this.fOperand = this.result;
        }
        
        if (!isNaN(this.sOperand))
          this.displayInS(this.fOperand + " " + this.operator + " " + this.sOperand + " =");
        else{
          this.result = parseFloat(this.displayP)
          this.displayInS(this.result + " =");
        }
        this.getResult();
        (!isNaN(this.result)) ? this.displayInP(this.result.toString()) : this.displayInP("Math Error");
        break;
      case "«":
        this.displayInP(this.displayP.substring(0, this.displayP.length - 1));
        (this.displayP.length == 0) ? this.displayInP("0") : "";
        break;
    }
  }
  handleOperators(op: string) {
    //Save operator
    let lastOperator = this.operator
    this.operator = op;
    switch (op) {
      case "x²":
        this.fOperand = parseFloat(this.displayP.slice(0, this.displayP.length));
        this.displayInS(this.displayP + "² =")
        this.result = Math.pow(this.fOperand, 2)
        this.displayInP(this.result.toString());
        break;
      case "√":
        this.fOperand = parseFloat(this.displayP.slice(0, this.displayP.length));
        this.displayInS("√" + this.displayP + " =")
        this.result = Math.sqrt(this.fOperand)
        this.displayInP(this.result.toString());
        break
      case "+": case "-": case "×": case "÷":
        if(isNaN(this.result))
         (isNaN(this.fOperand)) ? this.fOperand = parseFloat(this.displayP.slice(0, this.displayP.length)) : this.sOperand = parseFloat(this.displayP.slice(0, this.displayP.length));
        else{
          this.fOperand = parseFloat(this.displayP)
          this.sOperand = NaN
        }
        if (!isNaN(this.sOperand)) { 
          (lastOperator != undefined) ? this.operator = lastOperator : "";
          this.getResult()
          this.operator = op;
          this.fOperand = this.result
          this.displayInS(this.result.toString() + " "+ op); 
        }else
          this.displayInS(this.displayP + " " + op)
        this.displayInP("0")
        this.result = NaN;
        break
    }
  }

  displayInP(string: string) {
    this.displayP = string;
  }

  displayInS(string: string) {
    this.displayS = string;
  }

  getResult() {
    switch (this.operator) {
      case "+":
        this.result = this.fOperand + this.sOperand;
        break
      case "-":
        this.result = this.fOperand - this.sOperand;
        break
      case "÷":
        this.result = (this.sOperand != 0) ? this.fOperand / this.sOperand : NaN;
        break
      case "×":
        this.result = this.fOperand * this.sOperand;
        break
    }
  }
}
