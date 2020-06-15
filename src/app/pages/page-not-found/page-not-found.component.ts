import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist." [style.margin]="'10%'">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/welcome">Back Home</button>
      </div>
    </nz-result>
  `
})
export class PageNotFoundComponent {}
