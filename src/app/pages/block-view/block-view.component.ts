import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BlockLevelsService} from './services/block-levels.service';
import {StudyAreasService} from './services/study-areas.service';
import {EventBusService} from './services/eventbus.service';
import {BlockLevelChangeEvent, StudyArea} from './study-area-cards/study-area-cards.component';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit, OnDestroy {

  block: string;

  routeSubscription: Subscription;
  noOfLevels: number;
  numbers: any;
  selectedLevel = 1;
  selectedStudyArea: StudyArea;

  studyAreas: StudyArea[];

  showError = false;

  readonly BLOCKS = ['A', 'B', 'C'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blockLevelsService: BlockLevelsService,
    private studyAreasService: StudyAreasService,
    private notificationService: NzNotificationService,
    private eventBusService: EventBusService
  ) {
    this.changeLevels = this.changeLevels.bind(this);
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (!this.BLOCKS.includes(params.block)) {
        this.router.navigate(['/welcome/404']).then(
          res => console.log(res)
        );
      } else {
        this.block = params.block;
        this.setLevels();
        this.loadStudyAreas();
      }
    });
  }

  setLevels = () => {
    this.noOfLevels = this.blockLevelsService.getLevelsByBlock(this.block);
    this.numbers = new Array(this.noOfLevels);
    this.numbers.fill().map((x, i) => i);
  }

  loadStudyAreas = () => {
    this.studyAreasService.getStudyAreasByBlock(this.block).subscribe(
      next => {
        this.studyAreas = next.map(it => StudyArea.convertDTO(it));
        this.eventBusService.publish(new BlockLevelChangeEvent(1, this.studyAreas));
      },
      (error) => {
        console.error(error.message);
        this.notificationService.error('Error', 'Error while loading the study areas.');
        this.showError = true;
      }, () => {
      }
    );
  }

  changeLevels = (level: number) => {
    this.selectedLevel = level;
    this.eventBusService.publish(new BlockLevelChangeEvent(level, this.studyAreas));
  }

  onStudyAreaSelected = (studyArea: StudyArea) => this.selectedStudyArea = studyArea;

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.showError = false;
  }
}
