import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator-service.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyBoardEvent($event)',
  },
})
export class CalculatorComponent {
  public calculatorButton = viewChildren(CalculatorButtonComponent);

  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleContent(event: string) {
    console.log({ event });
    this.calculatorService.calculatorValidations(event);
  }

  handleKeyBoardEvent(event: KeyboardEvent) {
    const keyEquivalent: Record<string, string> = {
      Enter: '=',
      Backspace: 'C',
      '%': '/',
      x: '*',
    };

    const key = event.key;

    const keyValue = keyEquivalent[key] ?? key;

    this.handleContent(keyValue);

    this.calculatorButton().forEach((button) => {
      button.keyPressedValue(keyValue);
    });
  }
}
