import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandModalComponent } from './command-modal.component';

describe('CommandModalComponent', () => {
  let component: CommandModalComponent;
  let fixture: ComponentFixture<CommandModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandModalComponent]
    });
    fixture = TestBed.createComponent(CommandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
