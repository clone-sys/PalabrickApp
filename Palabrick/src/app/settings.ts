/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
export class Settings {
    private _hardMode: boolean;
    private _language: string;
    private _accessibility: boolean;
    private _darkMode: boolean;
    private _settingsNumber: number;
    private _saveStateGame: boolean;
    public get saveStategame(): boolean {
        return this._saveStateGame;
    }
    public set saveStategame(value: boolean) {
        this._saveStateGame = value;
    }
    public get hardMode(): boolean {
        return this._hardMode;
    }
    public set hardMode(value: boolean) {
        this._hardMode = value;
    }
    public get settingsNumber(): number {
        return this._settingsNumber;
    }
    public set settingsNumber(value: number) {
        this._settingsNumber = value;
    }
    public get darkMode(): boolean {
        return this._darkMode;
    }
    public set darkMode(value: boolean) {
        this._darkMode = value;
    }
    public get accessibility(): boolean {
        return this._accessibility;
    }
    public set accessibility(value: boolean) {
        this._accessibility = value;
    }
    public get language(): string {
        return this._language;
    }
    public set language(value: string) {
        this._language = value;
    }
}
