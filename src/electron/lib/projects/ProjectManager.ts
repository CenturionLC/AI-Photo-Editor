import { CoreProject } from "./CoreProject";
import logger from "../../utils/logger";
import type { IpcResponse } from "../api/IpcResponse";
import { join } from "path";
import { app } from "electron";
import fs from "fs";
import type { UUID } from "../../../shared/utils/UniqueEntity";
import type { MainWindow } from "@electron/lib/api/WindowApi";
import type { CommonProject } from "@shared/types";

// This should kinda be extending Registry and then called ProjectRegistry
// instead of Project Manager but I don't feel like the Registry interface is
// the correct fit for this.
export class ProjectManager {
  private _path: string;
  private _projects: { [id: string]: CoreProject };
  private _mainWindow;

  constructor(mainWindow: MainWindow) {
    this._mainWindow = mainWindow;
    this._path = join(app.getPath("userData"), "projects");
    if (!fs.existsSync(this._path)) {
      fs.mkdirSync(this._path);
    }
    this._projects = {};

    // Example: How to send some event from the project manager to the client API
    // Remove this!!

    // const proj: CommonProject = {
    //   name: "TestProject",
    //   uuid: "98yu4thljqwerfdq9p48pfqoawhfjadksklv"
    // }

    // So, atm im kinda sending the share common data between the backend
    // project interface and the fronted. Maybe there is a cleaner way to do
    // this, but for example backend project doesn't have layout which the
    // frontend project interface does. So, I couldn't really figure a way to
    // create a frontend project in the backend then just send the entire
    // frontend project state over the api
    // setInterval(() => {
    //   this._mainWindow.apis.clientProjectApi.projectChanged(proj);
    // }, 2000)
  }

  createProject(name = "New Project"): CoreProject {
    const project = new CoreProject(name);
    project.location = join(this._path, project.uuid);
    this._projects[project.uuid] = project;

    const data = { name: project.name, uuid: project.uuid };
    return project;
  }

  closeProject(uuid: UUID) {
    delete this._projects[uuid];
  }

  getOpenProjects() {
    return Object.values(this._projects);
  }

  renameProject(uuid: UUID, name: string) {
    if (this._projects.hasOwnProperty(uuid)) {
      return this._projects[uuid].rename(name);
    } else {
      return false;
    }
  }

  saveAllProjects() {
    for (const project in this._projects) {
      if (this._projects.hasOwnProperty(project)) {
        this.saveProject(project);
      }
    }
  }

  saveProject(id: UUID): IpcResponse<string> {
    const project = this._projects[id];
    if (!project) {
      return { success: false, data: "Project not found" };
    }
    // Save project to local disk
    const data = { name: project.name, uuid: project.uuid };
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fs.writeFileSync(`${project.location}.blx`, JSON.stringify(data, null, 2));

    return { success: true, data: "Project saved" };
  }

  getRecentProjects(): IpcResponse<CommonProject[]> {
    const projects = fs.readdirSync(this._path);
    if (!projects) {
      return { success: false, data: [] };
    }
    const recentProjects: CommonProject[] = [];
    for (const project of projects) {
      if (project === ".DS_Store") continue; // Some File returned when using readdirSync on mac
      const data = JSON.parse(fs.readFileSync(join(this._path, project)).toString());
      recentProjects.push(this.createProject(data.name as string).mapToCommonProject());
      fs.unlinkSync(join(this._path, project));
    }
    return { success: true, data: recentProjects };
  }

  // loadProject(projectName: string): IpcResponse<string> {
  //   const project = fs.readFileSync(join(this.path, projectName));
  //   if (!project) {
  //     return { success: false, data: "Project not found" };
  //   }

  //   const data = JSON.parse(project.toString());
  //   this.createProject(data.name as string);
  //   return { success: true, data: "Project loaded" };
  // }

  // async renameProject(uuid: UUID) {}
}
