import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-500',
    '[class.w-1/4]': '!isDoubleSize()',
    '[class.w-2/4]': 'isDoubleSize()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);

  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public onClickOut = output<string>();

  handleClick() {
    if (!this.contentValue()?.nativeElement.innerText) return;
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClickOut.emit(value);
  }

  keyPressedValue(key: string) {
    if (!this.contentValue) return;
    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
