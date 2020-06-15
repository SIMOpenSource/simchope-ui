import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAreaDetailComponent } from './study-area-detail.component';

describe('StudyAreaDetailComponent', () => {
  let component: StudyAreaDetailComponent;
  let fixture: ComponentFixture<StudyAreaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAreaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAreaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
