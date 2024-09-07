import { TestBed } from '@angular/core/testing';
import { CalculatorService } from '../calculator-service.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Properties signals', () => {
    const lastOperator = service.lastOperator();
    const resultText = service.resultText();
    const subResultText = service.subResultText();

    expect(lastOperator).toBe('+');
    expect(resultText).toBe('0');
    expect(subResultText).toBe('0');
  });

  it('Should be resultText, subResultText to "0" when "C" is pressed', () => {
    service.lastOperator.set('-');
    service.resultText.set('123');
    service.subResultText.set('456');

    service.calculatorValidations('C');

    expect(service.lastOperator()).toBe('+');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
  });

  it('Should be resultText to 12 when "1" and "2" is pressed', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('2');

    expect(service.resultText()).toBe('12');
  });

  it('Should handle operators correctly', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('-');

    expect(service.subResultText()).toBe('1');
    expect(service.lastOperator()).toBe('-');
    expect(service.resultText()).toBe('0');
  });

  it('Should calculate result correctly when "1" and "2" are addition', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('+');
    service.calculatorValidations('2');
    service.calculatorValidations('=');

    expect(service.resultText()).toBe('3');
  });

  it('Should calculate result correctly when "1" and "2" are subtraction', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('-');
    service.calculatorValidations('2');
    service.calculatorValidations('=');

    expect(service.resultText()).toBe('1');
  });

  it('Should calculate result correctly when "1" and "2" are multiplication', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('*');
    service.calculatorValidations('2');
    service.calculatorValidations('=');

    expect(service.resultText()).toBe('2');
  });

  it('Should calculate result correctly when "10" and "2" are division', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('0');
    service.calculatorValidations('/');
    service.calculatorValidations('2');

    service.calculatorValidations('=');

    expect(service.resultText()).toBe('5');
  });

  it('Should calculate result correctly when "10" and "10" are division', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('0');
    service.calculatorValidations('/');
    service.calculatorValidations('1');
    service.calculatorValidations('0');

    service.calculatorValidations('=');

    expect(service.resultText()).toBe('0');
  });

  it('Should calculate result correctly when "10" and "10" are division', () => {
    service.calculatorValidations('1');
    service.calculatorValidations('/');
    service.calculatorValidations('1');
    service.calculatorValidations('0');

    service.calculatorValidations('=');

    expect(service.resultText()).toBe('NaN');
  });

  it('Should validate decimal number', () => {
    service.calculatorValidations('.');
    service.calculatorValidations('2');

    expect(service.resultText()).toBe('0.2');
  });

  it('Should validate Backspace button', () => {
    service.resultText.set('123');
    service.calculatorValidations('Backspace');
    expect(service.resultText()).toBe('12');
    service.calculatorValidations('Backspace');
    expect(service.resultText()).toBe('1');
    service.calculatorValidations('Backspace');
    expect(service.resultText()).toBe('0');
    service.calculatorValidations('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('Should validate is Zero', () => {
    service.calculatorValidations('0');
    expect(service.resultText()).toBe('0');
  });

  it('Should validate "+/-" to change toggle sign in zero ', () => {
    service.calculatorValidations('+/-');
    expect(service.resultText()).toBe('-0');
  });

  it('Should validate "+/-" to change toggle sign', () => {
    service.calculatorValidations('+/-');
    expect(service.resultText()).toBe('-0');
    service.calculatorValidations('1');
    expect(service.resultText()).toBe('-1');
    service.calculatorValidations('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('Should validate value not allow', () => {
    service.calculatorValidations('X');
    expect(service.resultText()).toBe('0');
  });
});
