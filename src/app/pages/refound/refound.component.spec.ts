import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefoundComponent } from './refound.component';

describe('RefoundComponent', () => {
  let component: RefoundComponent;
  let fixture: ComponentFixture<RefoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefoundComponent]
    });
    fixture = TestBed.createComponent(RefoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
