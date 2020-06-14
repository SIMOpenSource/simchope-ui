import {AfterContentInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {EventBusService} from '../services/eventbus.service';
import {Subscription} from 'rxjs';

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
    this.filteredAreas = event.studyAreas.filter(sa => sa.level === event.selectedLevel);
    this.studyAreaSelected.emit(this.filteredAreas[0]);
  }

  onCardClick = selectedStudyArea => this.studyAreaSelected.emit(selectedStudyArea);

  calculateOccupancyBar = scores => Math.max(...scores) + 1;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
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

export class StudyArea {
  constructor(
     public id: number,
     public areaName: string,
     public block: string,
     public level: number,
     public scores: number[],
     public tableCount: number,
     public capacity: number,
     public facilities: string[],
     public description: string,
     public lastUpdated: Date
  ) { }

  static convertDTO(input: any): StudyArea {
    return new StudyArea(
      input.id, input.area_name, input.block, input.level, input.scores, input.table_count,
      input.capacity, input.facilities, input.description, input.last_updated
    );
  }
}
