import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductsFormComponent } from './create-product-form.component';

describe('CreateProductsFormComponent', () => {
  let component: CreateProductsFormComponent;
  let fixture: ComponentFixture<CreateProductsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductsFormComponent]
    });
    fixture = TestBed.createComponent(CreateProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
