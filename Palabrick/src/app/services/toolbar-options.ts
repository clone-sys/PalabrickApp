export class ToolbarOptions {
    
    // Propiedades ==================================================

    game: boolean;
    lastGame: boolean;
    statistics: boolean;
    help: boolean;
    credits: boolean;
    settings: boolean;
  

    // Métodos ==================================================

    constructor() {
        this.game = false;
        this.lastGame = false;
        this.statistics = false;
        this.help = false;
        this.credits = false;
        this.settings = true;
    }
}