import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GasModel } from "../Models/Gas_model";
import { ImageModel } from "../Models/ImageModel";
import { Module } from "../Models/Module";
import { TorqueModel } from "../Models/TorqueModel";

@Injectable({
   providedIn: 'root'
 })
export class ImgService
{

    public constructor(private h: HttpClient){}

    public GetImageData(Module: string): Promise<ImageModel[]>
 {
    const observable = this.h.get<ImageModel[]>("https://localhost:44367/api/Images/GetImage/" + Module);
    return observable.toPromise();
 }

 public UpdateTorqueIfNeeded(torque: TorqueModel): Promise<ImageModel>
 {
   const observable = this.h.put<ImageModel>("https://localhost:44367/api/Images/UpdateTorqueIfNeed" , torque);
   return observable.toPromise();
 }
 
}