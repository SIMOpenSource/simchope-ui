import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAreaCardsComponent } from './study-area-cards.component';

describe('StudyAreaCardsComponent', () => {
  let component: StudyAreaCardsComponent;
  let fixture: ComponentFixture<StudyAreaCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAreaCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAreaCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
