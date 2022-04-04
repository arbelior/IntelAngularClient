import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GasModel } from "../Models/Gas_model";
import { Module } from "../Models/Module";

@Injectable({
   providedIn: 'root'
 })
export class ModuleService
{
    public ToolChoice: any;
    public ModuleChoice: any;
    public ReturnGasFailedArray        : GasModel [] = [];
    public ReturnGasFailedArrayIfback  : GasModel [] = [];
    public ReturnGasAioArray           : GasModel [] = [];
    public constructor(private s: HttpClient){}

public GetAllDataModules(): Promise<Module[]>
 {
    const observable = this.s.get<Module[]>("https://localhost:44367/API/Modules");
    return observable.toPromise();
 }

 public GetDataModelperMod(): Promise<Module[]>
  {
     const observable = this.s.get<Module[]>("https://localhost:44367/API/Modules/modules");
     return observable.toPromise(); 
  }

  public GetToolsPerModule(module: string): Promise<Module[]>
  {
   const observable = this.s.get<Module[]>("https://localhost:44367/API/Modules/Tools/" + module);
   return observable.toPromise(); 
  }
  public GetDataPerTool(tool: string): Promise<GasModel[]>
   {
     const observable = this.s.get<GasModel[]>("https://localhost:44367/API/Modules/tool/"+ tool);
     return observable.toPromise(); 
   }
}