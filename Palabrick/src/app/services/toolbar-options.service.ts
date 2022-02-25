import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToolbarOptions } from '../classes/toolbar-options';

@Injectable({
  providedIn: 'root'
})
export class ToolbarOptionsService {
  // Emisor
  private toolbarOptionsSource = new Subject<ToolbarOptions>();
  newToolbarOptions: Observable<ToolbarOptions> = this.toolbarOptionsSource.asObservable();

  constructor() { }

  // Emisor del evento
  changeToolbarOptions(toolbarOptions: ToolbarOptions) {
    this.toolbarOptionsSource.next(toolbarOptions);
  }
}