import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  resultText = signal('10');
  subResultText = signal('0');
  lastOperator = signal('+');

  private numbersValid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  private operatorsValid = ['%', '/', '*', '+', '-'];
  private specialOperators = ['=', 'C', '+/-', 'Backspace', '.'];

  async calculatorValidations(value: string) {
    if (
      ![
        ...this.numbersValid,
        ...this.operatorsValid,
        ...this.specialOperators,
      ].includes(value)
    )
      return;

    if (value === '=') {
      // TODO Result Operator
      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {
      console.log('value: ', value);
      if (this.resultText() === '0') return;
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((pre) => pre.slice(0, -1));
    }

    if (this.operatorsValid.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
    }

    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.update((pre) => pre + '.');
        return;
      }
      this.resultText.update((pre) => pre + '.');
    }

    if (value === '0' && this.resultText() === '0') return;

    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((pre) => pre.slice(1));
      }
      this.resultText.update((pre) => `-${pre}`);
    }

    if (this.numbersValid.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
      }

      this.resultText.update((pre) => pre + value);
    }
  }
}
