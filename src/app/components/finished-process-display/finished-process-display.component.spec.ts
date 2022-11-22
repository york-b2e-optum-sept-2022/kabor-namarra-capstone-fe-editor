import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProcessDisplayComponent } from './finished-process-display.component';

describe('FinishedProcessDisplayComponent', () => {
  let component: FinishedProcessDisplayComponent;
  let fixture: ComponentFixture<FinishedProcessDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedProcessDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedProcessDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
