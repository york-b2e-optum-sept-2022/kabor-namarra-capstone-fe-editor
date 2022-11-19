import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageChoicesComponent } from './stage-choices.component';

describe('StageChoicesComponent', () => {
  let component: StageChoicesComponent;
  let fixture: ComponentFixture<StageChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageChoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
