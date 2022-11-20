import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreatingStageComponent } from './edit-creating-stage.component';

describe('EditCreatingStageComponent', () => {
  let component: EditCreatingStageComponent;
  let fixture: ComponentFixture<EditCreatingStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreatingStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCreatingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
