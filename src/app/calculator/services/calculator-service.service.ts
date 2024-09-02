import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  resultText = signal('0');
  subResultText = signal('0');
  lastOperator = signal('+');

  private numbersValid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private operatorsValid = ['=', '%', '/', '*', '+', '-'];

  async calculatorValidations(value: string) {}
}
