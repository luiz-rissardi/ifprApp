import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsFormComponent } from './update-product-form.component';

describe('UpdateProductsFormComponent', () => {
  let component: UpdateProductsFormComponent;
  let fixture: ComponentFixture<UpdateProductsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductsFormComponent]
    });
    fixture = TestBed.createComponent(UpdateProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
