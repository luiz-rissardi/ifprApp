import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductssComponent } from './list-products.component';

describe('ListProductssComponent', () => {
  let component: ListProductssComponent;
  let fixture: ComponentFixture<ListProductssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductssComponent]
    });
    fixture = TestBed.createComponent(ListProductssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
