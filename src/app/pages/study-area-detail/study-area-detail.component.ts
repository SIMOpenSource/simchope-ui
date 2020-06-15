import {Component, Input, OnInit} from '@angular/core';
import {StudyArea} from '../../models/study-area.model';
import {StudyAreasService} from '../../services/study-areas.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ScoreUpdate} from '../../models/score-update.model';

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

  ngOnInit() {}

  processDescriptionText = (input: string) => {
    const strArray = input.split('/');
    const descriptionText = strArray[0];
    strArray.shift();
    return descriptionText.concat('\n\n').concat(strArray.join('\n'));
  }

  submitScoreUpdate(score) {
    const scoreUpdate = new ScoreUpdate('thin007', this.studyArea.id, score);
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
    const scoreData = ScoreUpdate.deriveClassNameAndText(score);
    return `<div class="pt-2">
              <h6>Right now, there are</h6>
              <div class="${scoreData.className} popup-modal">${scoreData.text}</div>
              <h6>Thank you for your contribution!</h6>
            </div>`;
  }

  getClass = index => ScoreUpdate.deriveClassNameAndText(index).className;

  getText = index => ScoreUpdate.deriveClassNameAndText(index).text;

  getIcon(facility: string) {
    let iconText: string;
    switch (facility) {
      case 'COMPUTERS':
        iconText = 'fa-desktop';
        break;
      case 'OUTDOOR_SEATS':
        iconText = 'fa-sun-o';
        break;
      case 'PRINTING':
        iconText = 'fa-print';
        break;
      case 'REFRESHMENTS':
        iconText = 'fa-coffee';
        break;
      case 'SOCKETS':
        iconText = 'fa-plug';
        break;
      case 'TOILETS':
        iconText = 'fa-male';
        break;
      default:
        throw Error('Icon not found for the facility!');
    }
    return iconText;
  }
}
