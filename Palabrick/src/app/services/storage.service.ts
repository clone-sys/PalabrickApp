/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Settings } from '../settings';

@Injectable({
  providedIn: 'root'
})
export default class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public guardarAjustes(settings: Settings){
    console.log('guardar ajustes');
    const jsonAjustes:string = JSON.stringify(settings);
    this.set('AJUSTES', jsonAjustes);
  }
  public getAjustes() : Promise<Settings> {
    let ajustes: Promise<Settings>;
        ajustes = this._storage.get('AJUSTES');
    return ajustes;
  }
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
}
