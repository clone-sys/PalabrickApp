import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsOption = new Subject<Settings>();

  // Emisor del evento
  changeOptions(settingsOptions: Settings) {
    this.settingsOption.next(settingsOptions);
  }
}
