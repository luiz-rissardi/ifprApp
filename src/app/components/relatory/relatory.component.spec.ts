import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoryComponent } from './relatory.component';

describe('RelatoryComponent', () => {
  let component: RelatoryComponent;
  let fixture: ComponentFixture<RelatoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatoryComponent]
    });
    fixture = TestBed.createComponent(RelatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
