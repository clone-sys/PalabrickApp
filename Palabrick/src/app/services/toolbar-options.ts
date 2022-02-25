export class ToolbarOptions {
    
    // Propiedades ==================================================

    game: boolean;
    lastGame: boolean;
    statistics: boolean;
    share: boolean;
    help: boolean;
    credits: boolean;
    settings: boolean;
  

    // Métodos ==================================================

    constructor() {
        this.game = false;
        this.lastGame = false;
        this.statistics = false;
        this.share = false;
        this.help = false;
        this.credits = false;
        this.settings = true;
    }
}