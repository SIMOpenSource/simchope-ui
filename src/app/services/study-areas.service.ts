import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StudyAreasService {

  private readonly serverBaseUrl = environment.serverBaseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getStudyAreasByBlock(block: string): Observable<any> {
    return this.httpClient.get(this.serverBaseUrl + '/api/study-areas', {
      params: { block }
    });
  }

  submitScoreUpdate(update: any): Observable<any> {
    return this.httpClient.post(this.serverBaseUrl + '/api/score', update);
  }
}
