import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorButtonComponent {

  public isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  })

  @HostBinding('class.to-indigo-500') get isCommandSignal() {
    return this.isCommand
  }

}
