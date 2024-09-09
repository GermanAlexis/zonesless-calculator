import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-class">Test component</span>
    </calculator-button>
  `,
})
export class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial css class', () => {
    const mustHaveCssClass = 'border-r border-b border-indigo-500'.split(' ');
    const cssElement = compiled.classList;
    mustHaveCssClass.forEach((className) => {
      expect(cssElement.value).toContain(className);
    });
  });

  it('should have initial css w-1/4 is isDoubleSize false', () => {
    const cssElement = compiled.classList.value.split(' ');
    expect(cssElement).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should have initial css w-2/4 and is isDoubleSize true ', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const cssElement = compiled.classList.value.split(' ');
    expect(cssElement).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should have initial css w-2/4 and is isCommand true ', () => {
    fixture.componentRef.setInput('isCommand', true);
    fixture.detectChanges();

    const cssElements = compiled.querySelector('button');
    const elementAdded = cssElements?.classList.value;
    expect(elementAdded).toContain('isCommand');
    expect(component.isCommand()).toBeTrue();
  });

  it('should listen event handleClick when is pressed keyboard ', () => {
    spyOn(component.onClickOut, 'emit');
    component.contentValue()!.nativeElement.innerText = '1';
    component.handleClick();
    expect(component.onClickOut.emit).toHaveBeenCalled();
  });

  it('should listen event handleClick when is pressed keyboard without value', () => {
    spyOn(component.onClickOut, 'emit');
    component.handleClick();
    expect(component.onClickOut.emit).not.toHaveBeenCalled();
  });

  it('should listen event keyPressedValue when is pressed a keyboard ', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyPressedValue('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });

  it('should listen event keyPressedValue when is pressed a keyboard ', () => {
    component.keyPressedValue('1');

    expect(component.isPressed()).toBeFalse();
  });

  it('should project class of value content ', () => {
    const hostComponent = TestBed.createComponent(TestHostComponent);

    const projectedClass =
      hostComponent.nativeElement.querySelector('.projected-class');

    expect(projectedClass).not.toBeNull();
  });
});
