import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeshopComponent } from './coffeeshop.component';

describe('CoffeeshopComponent', () => {
  let component: CoffeeshopComponent;
  let fixture: ComponentFixture<CoffeeshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
