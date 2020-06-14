import {Component, Input, OnInit} from '@angular/core';
import {StudyArea} from '../study-area-cards/study-area-cards.component';
import {StudyAreasService} from '../services/study-areas.service';``
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-study-area-detail',
  templateUrl: './study-area-detail.component.html',
  styleUrls: ['./study-area-detail.component.scss']
})
export class StudyAreaDetailComponent implements OnInit {

  @Input() studyArea: StudyArea;

  constructor(
    private studyAreasService: StudyAreasService,
    private modal: NzModalService,
    private notificationService: NzNotificationService
  ) { }

  ngOnInit() {
  }

  processDescriptionText = (input: string) => {
    return input.split('/').join('\n\n');
  }

  submitScoreUpdate(score) {
    const scoreUpdate = new ScoreUpdate('ko002', this.studyArea.id, score);
    this.studyAreasService.submitScoreUpdate(scoreUpdate).subscribe(
      next => {
        console.log(next);
        this.modal.success({
          nzTitle: 'Vacancy Updated!',
          nzWrapClassName: 'vertical-center-modal',
          nzContent: this.constructModalContent(score)
        });
        setTimeout(() => this.modal.closeAll(), 5000);
      }, () => {
        this.notificationService.error('Error', 'Error while sending a score update to the server.');
      }
    );
  }

  constructModalContent(score) {
    const [className, text] = this.deriveColourAndText(score);
    return `<div class="pt-2">
              <h6>Right now, there are</h6>
              <div class="${className}">${text}</div>
              <h6>Thank you for your contribution!</h6>
            </div>`;
  }

  deriveColourAndText(score): [string, string] {
    let colour: string;
    let text: string;
    switch (score) {
      case 0:
        colour = 'custom-green';
        text = 'Almost all spaces available';
        break;
      case 1:
        colour = 'custom-yellow';
        text = 'Fewer than half spaces available';
        break;
      case 2:
        colour = 'custom-orange';
        text = 'Half or more spaces available';
        break;
      case 3:
        colour = 'custom-red';
        text = 'No spaces left at all :\'(';
        break;
      default:
        throw new Error('Error deriving colour from score');
    }
    return [colour, text];
  }
}

export class ScoreUpdate {
  constructor(
    public student: string,
    // tslint:disable-next-line:variable-name
    public study_area: number,
    public score: number
  ) {
  }
}
