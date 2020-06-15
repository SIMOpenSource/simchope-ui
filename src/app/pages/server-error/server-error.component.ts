import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  template: `
    <nz-result nzStatus="500" nzTitle="500" nzSubTitle="Sorry, there is an error on server." [style.margin]="'10%'">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/welcome">Back Home</button>
      </div>
    </nz-result>
  `
})
export class ServerErrorComponent {}
