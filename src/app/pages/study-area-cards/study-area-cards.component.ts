import {AfterContentInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {EventBusService} from '../../services/eventbus.service';
import {Subscription} from 'rxjs';
import {StudyArea} from '../../models/study-area.model';
import {ScoreUpdate} from '../../models/score-update.model';

@Component({
  selector: 'app-study-area-cards',
  templateUrl: './study-area-cards.component.html',
  styleUrls: ['./study-area-cards.component.scss']
})
export class StudyAreaCardsComponent implements OnInit, AfterContentInit,  OnDestroy {

  @Output() studyAreaSelected = new EventEmitter<StudyArea>();

  subscription: Subscription;
  filteredAreas: StudyArea[];

  constructor(
    private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this.subscription = this.eventBusService.of(BlockLevelChangeEvent).subscribe(
      it => {
        this.filterSelectedAreas(it.data);
      }
    );
  }

  ngAfterContentInit() {
    this.subscription = this.eventBusService.of(BlockLevelChangeEvent).subscribe(
      it => {
        this.filterSelectedAreas(it.data);
      }
    );
  }

  filterSelectedAreas = (event: BlockLevelChangeEvent) => {
    const filteredAreas = event.studyAreas.filter(sa => sa.level === event.selectedLevel);
    this.filteredAreas = filteredAreas.sort((a, b) => a.id - b.id);
    this.studyAreaSelected.emit(this.filteredAreas[0]);
  }

  onCardClick = selectedStudyArea => this.studyAreaSelected.emit(selectedStudyArea);

  calculateOccupancyBar = (scores: any[]) => {
    const maxScore = Math.max(...scores);
    return maxScore === 0 ? 0 : scores.lastIndexOf(Math.max(...scores)) + 1;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getClass = score => ScoreUpdate.deriveClassNameAndText(score === 0 ? score : score - 1).className;
}

export class BlockLevelChangeEvent {
  constructor(
    public selectedLevel: number,
    public studyAreas: StudyArea[]
  ) { }

  public toString() {
    return `BlockLevelChangeEvent - level: ${this.selectedLevel}`;
  }
}
