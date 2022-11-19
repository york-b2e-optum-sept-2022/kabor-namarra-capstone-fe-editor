import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDisplayComponent } from './process-display.component';

describe('ProcessDisplayComponent', () => {
  let component: ProcessDisplayComponent;
  let fixture: ComponentFixture<ProcessDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
