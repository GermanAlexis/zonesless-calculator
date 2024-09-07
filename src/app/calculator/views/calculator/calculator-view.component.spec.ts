import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let component: CalculatorViewComponent;
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain css classes', () => {
    const divElements = compiled.querySelector('div')?.classList;

    const mustClasses = [
      'min-w-screen',
      'min-h-screen',
      'bg-slate-500',
      'flex',
      'items-center',
      'justify-center',
      'px-5',
      'py-5',
    ];

    mustClasses.forEach((className) => [
      expect(divElements?.value).toContain(className),
    ]);
  });

  it("should contain 'Buy me a beer' ", () => {
    const divElements = compiled.querySelector('a');

    const title = 'Buy me a beer';
    const url = 'https://www.buymeacoffee.com/scottwindon';

    expect(divElements?.href).toBe(url);
    expect(divElements?.title).toBe(title);
  });
});
