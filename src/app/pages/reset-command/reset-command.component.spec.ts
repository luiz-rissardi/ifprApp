import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCommandComponent } from './reset-command.component';

describe('ResetCommandComponent', () => {
  let component: ResetCommandComponent;
  let fixture: ComponentFixture<ResetCommandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetCommandComponent]
    });
    fixture = TestBed.createComponent(ResetCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
