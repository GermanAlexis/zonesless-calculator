import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  resultText = signal('0');
  subResultText = signal('0');
  lastOperator = signal('+');

  private numbersValid = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  private operatorsValid = ['%', '/', '*', '+', '-'];
  private specialOperators = ['=', 'C', '+/-', 'Backspace', '.'];

  async calculatorValidations(value: string) {
    if (!this.isValidInput(value)) return;

    if (this.isEqualsSign(value)) {
      this.generateCalculator();
      return;
    }

    if (this.isClearCommand(value)) {
      this.clearCalculator();
      return;
    }

    if (this.isBackspaceCommand(value)) {
      this.handleBackspace();
      return;
    }

    if (this.isOperator(value)) {
      this.handleOperator(value);
    }

    if (this.isDecimalPoint(value)) {
      this.handleDecimalPoint();
    }

    if (this.isZeroInput(value)) return;

    if (this.isSignToggle(value)) {
      this.toggleSign();
    }

    if (this.isNumericInput(value)) {
      this.handleNumericInput(value);
    }
  }

  private isValidInput(value: string): boolean {
    return [
      ...this.numbersValid,
      ...this.operatorsValid,
      ...this.specialOperators,
    ].includes(value);
  }

  private isEqualsSign(value: string): boolean {
    return value === '=';
  }

  private isClearCommand(value: string): boolean {
    return value === 'C';
  }

  private clearCalculator() {
    this.resultText.set('0');
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }

  private isBackspaceCommand(value: string): boolean {
    return value === 'Backspace';
  }

  private handleBackspace() {
    if (this.resultText() === '0') return;
    if (this.resultText().length === 1) {
      this.resultText.set('0');
      return;
    }
    this.resultText.update((pre) => pre.slice(0, -1));
  }

  private isOperator(value: string): boolean {
    return this.operatorsValid.includes(value);
  }

  private handleOperator(value: string) {
    this.generateCalculator();
    this.lastOperator.set(value);
    this.subResultText.set(this.resultText());
    this.resultText.set('0');
  }

  private isDecimalPoint(value: string): boolean {
    return value === '.' && !this.resultText().includes('.');
  }

  private handleDecimalPoint() {
    this.resultText.update((pre) => pre + '.');
  }

  private isZeroInput(value: string): boolean {
    return value === '0' && this.resultText() === '0';
  }

  private isSignToggle(value: string): boolean {
    return value === '+/-';
  }

  private toggleSign() {
    if (this.resultText().includes('-')) {
      this.resultText.update((pre) => pre.slice(1));
    } else {
      this.resultText.update((pre) => `-${pre}`);
    }
  }

  private isNumericInput(value: string): boolean {
    return this.numbersValid.includes(value);
  }

  private handleNumericInput(value: string) {
    if (this.resultText() === '0') {
      this.resultText.set(value);
    } else if (this.resultText() === '-0') {
      this.resultText.set('-' + value);
    } else {
      this.resultText.update((pre) => pre + value);
    }
  }

  generateCalculator() {
    let number1 = parseFloat(this.resultText());
    let number2 = parseFloat(this.subResultText());
    let lastOperator = this.lastOperator();
    let resultDivisor: number = 0;
    if (lastOperator === '/' && number2 > 0)
      resultDivisor = this.calculateDivisor(number1, number2);

    const total = this.calculateResult(
      number1,
      number2,
      lastOperator,
      resultDivisor
    );

    this.resultText.set(total.toString());
    this.subResultText.set('0');
  }

  private calculateDivisor(number1: number, number2: number): number {
    if (number1 < number2) {
      return number2 / number1;
    } else if (number1 === number2) {
      return 0;
    } else {
      return NaN;
    }
  }

  private calculateResult(
    number1: number,
    number2: number,
    operator: string,
    divisor: number
  ): number {
    switch (operator) {
      case '+':
        return number1 + number2;
      case '-':
        return number1 - number2;
      case '*':
        return number1 * number2;
      case '/':
        return divisor;
      default:
        return 0;
    }
  }
}
