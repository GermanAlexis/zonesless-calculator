import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { CalculatorService } from '@/calculator/services/calculator-service.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

class MockCalculatorService {
  resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');

  calculatorValidations = jasmine.createSpy('calculatorValidations');
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let service: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    service = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle keyBoard dispatch', () => {
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(service.calculatorValidations).toHaveBeenCalledWith('=');
  });

  it('should handle keyBoard with "1" dispatch', () => {
    const event = new KeyboardEvent('keyup', { key: '1' });
    document.dispatchEvent(event);

    expect(service.calculatorValidations).toHaveBeenCalledWith('1');
  });

  it('should have current values ', () => {
    expect(component.lastOperator()).toBe('-');
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
  });

  it('should display proper calculation values ', () => {
    service.resultText.and.returnValue('123');
    service.subResultText.and.returnValue('456');
    service.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('456 *');

    expect(component.lastOperator()).toBe('*');
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
  });

  it('should have 19 "calculator-button" with content projection ', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toEqual(19);

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('/');
  });
});
