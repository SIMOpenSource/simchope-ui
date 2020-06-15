import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface Message {
  channel: string;
  data: any;
}

@Injectable()
export class EventBusService {
  message$: Subject<Message>;

  constructor() {
    this.message$ = new Subject<Message>();
  }

  public publish<T>(message: T): void {
    console.log('Publishing message: ' + message.toString());
    const channel = (message.constructor as any).name;
    this.message$.next({ channel, data: message });
  }

  public of<T>(messageType: new (...args: any[]) => T): Observable<Message> {
    const channel = (messageType as any).name;
    return this.message$.asObservable();
  }
}
