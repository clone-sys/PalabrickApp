import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Settings } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsOption = new Subject<Settings>();
  newSettingsOptions: Observable<Settings> = this.settingsOption.asObservable();
  constructor() { }

  // Emisor del evento
  changeOptions(settingsOptions: Settings) {
    this.settingsOption.next(settingsOptions);
  }
}
