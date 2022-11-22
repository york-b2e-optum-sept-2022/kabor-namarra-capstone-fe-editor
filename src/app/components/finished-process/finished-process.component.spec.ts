import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProcessComponent } from './finished-process.component';

describe('FinishedProcessComponent', () => {
  let component: FinishedProcessComponent;
  let fixture: ComponentFixture<FinishedProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
