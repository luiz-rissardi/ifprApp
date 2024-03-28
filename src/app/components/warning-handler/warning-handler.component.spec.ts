import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningHandlerComponent } from './warning-handler.component';

describe('WarningHandlerComponent', () => {
  let component: WarningHandlerComponent;
  let fixture: ComponentFixture<WarningHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningHandlerComponent]
    });
    fixture = TestBed.createComponent(WarningHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
