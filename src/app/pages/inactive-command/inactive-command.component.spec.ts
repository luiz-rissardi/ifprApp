import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveCommandComponent } from './inactive-command.component';

describe('InactiveCommandComponent', () => {
  let component: InactiveCommandComponent;
  let fixture: ComponentFixture<InactiveCommandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InactiveCommandComponent]
    });
    fixture = TestBed.createComponent(InactiveCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
