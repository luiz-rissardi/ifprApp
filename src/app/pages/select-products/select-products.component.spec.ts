import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductssComponent } from './select-products.component';

describe('SelectProductssComponent', () => {
  let component: SelectProductssComponent;
  let fixture: ComponentFixture<SelectProductssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectProductssComponent]
    });
    fixture = TestBed.createComponent(SelectProductssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
