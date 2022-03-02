import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToolbarOptions } from './toolbar-options';

@Injectable({
  providedIn: 'root'
})
export class ToolbarOptionsService {
  // Emisor
  private toolbarOptionsSource = new Subject<ToolbarOptions>();
  newToolbarOptions: Observable<ToolbarOptions> = this.toolbarOptionsSource.asObservable();

  // Emisor del evento
  changeToolbarOptions(toolbarOptions: ToolbarOptions): void {
    this.toolbarOptionsSource.next(toolbarOptions);
  }
}