import { CommandRegistry } from "./commands/CommandRegistry";
import { ToolboxRegistry } from "./core-graph/ToolboxRegistry";
import { TileRegistry } from "./tiles/TileRegistry";
import { ProjectManager } from "./projects/ProjectManager";
import type { MainWindow } from "./api/WindowApi";
import { GraphManager } from "./core-graph/GraphManager";

// Encapsulates the backend representation for
// the entire running Blix application
export class Blix {
  private _toolbox: ToolboxRegistry;
  private _tileRegistry: TileRegistry;
  private _commandRegistry: CommandRegistry;
  private _graphManager: GraphManager;
  private _projectManager: ProjectManager;
  private _mainWindow: MainWindow;

  // private startTime: Date;

  // TODO: We'll need a layout registry as well which can save its state to a file
  // private layoutRegistry: LayoutRegistry;
  // private currentLayout: LayoutId;

  constructor(mainWindow: MainWindow) {
    // this.startTime = new Date();
    this._mainWindow = mainWindow;
    this._toolbox = new ToolboxRegistry();
    this._commandRegistry = new CommandRegistry();
    this._tileRegistry = new TileRegistry();
    this._graphManager = new GraphManager(mainWindow);
    this._projectManager = new ProjectManager(mainWindow);
  }

  get toolbox(): ToolboxRegistry {
    return this._toolbox;
  }

  get tileRegistry(): TileRegistry {
    return this._tileRegistry;
  }

  get commandRegistry(): CommandRegistry {
    return this._commandRegistry;
  }

  get graphManager(): GraphManager {
    return this._graphManager;
  }

  get projectManager(): ProjectManager {
    return this._projectManager;
  }

  get mainWindow(): MainWindow | null {
    return this._mainWindow;
  }
}
