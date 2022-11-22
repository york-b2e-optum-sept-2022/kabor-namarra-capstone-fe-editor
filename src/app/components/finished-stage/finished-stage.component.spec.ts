import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedStageComponent } from './finished-stage.component';

describe('FinishedStageComponent', () => {
  let component: FinishedStageComponent;
  let fixture: ComponentFixture<FinishedStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
