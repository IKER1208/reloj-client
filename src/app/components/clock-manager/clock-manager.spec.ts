import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockManager } from './clock-manager';

describe('ClockManager', () => {
  let component: ClockManager;
  let fixture: ComponentFixture<ClockManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
