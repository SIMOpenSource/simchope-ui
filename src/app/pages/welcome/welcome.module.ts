import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import {NgZorroAntdModule, NzLayoutModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BlockViewComponent} from '../block-view/block-view.component';
import { BlockLevelsService } from '../block-view/services/block-levels.service';
import {StudyAreaCardsComponent} from '../block-view/study-area-cards/study-area-cards.component';
import {StudyAreaDetailComponent} from '../block-view/study-area-detail/study-area-detail.component';
import {StudyAreasService} from '../block-view/services/study-areas.service';
import {EventBusService} from '../block-view/services/eventbus.service';
import {ServerErrorComponent} from '../server-error/server-error.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzLayoutModule,
    NgZorroAntdModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    WelcomeComponent,
    BlockViewComponent,
    StudyAreaCardsComponent,
    StudyAreaDetailComponent,
    ServerErrorComponent,
    PageNotFoundComponent
  ],
  exports: [WelcomeComponent],
  providers: [
    BlockLevelsService,
    StudyAreasService,
    EventBusService
  ]
})
export class WelcomeModule { }
