import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable } from "rxjs";
import { FollowDataupdate } from "../Models/FollowUpdateDataModel";
import { Resume_model } from "../Models/Resume_model";
import { TorqueModel } from "../Models/TorqueModel";

@Injectable({
    providedIn: 'root'
  })
  export class TorqueService {
public constructor( private h:HttpClient){}
public SaveShiftForCheckTorque: any;

public GetTorqueListPerModule(module: string): Promise<TorqueModel[]>
{
 const observable = this.h.get<TorqueModel[]>("https://localhost:44367/api/Torque/GetAllPerModule/" + module);
 return observable.toPromise(); 
}

public GetAllUsers(): Promise<TorqueModel[]>
{
   const observable = this.h.get<TorqueModel[]>("https://localhost:44367/api/Torque/GetAllTorques");
   return observable.toPromise(); 
}

public UpdateTorqueVal(obj: TorqueModel): Promise<TorqueModel>
{
   const observable = this.h.put<TorqueModel>("https://localhost:44367/api/Torque/UpdateTorque/" ,obj);
   return observable.toPromise(); 
}

public GetShiftToUpdateTorqueCheck():Promise<string>
{
   const observable = this.h.get<string>("https://localhost:44367/api/Torque/GetShift");
   return observable.toPromise(); 
}

}  