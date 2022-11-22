import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProcessListComponent } from './finished-process-list.component';

describe('FinishedProcessListComponent', () => {
  let component: FinishedProcessListComponent;
  let fixture: ComponentFixture<FinishedProcessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedProcessListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
