import { HttpClient } from "@angular/common/http";
import { Injectable,Pipe } from "@angular/core";
import { FollowDataupdate } from "../Models/FollowUpdateDataModel";

@Injectable({
  providedIn: 'root'
})
export class ServiceDataGLFollow
{
  
  UpdatedDataSaved : FollowDataupdate[] = [];
  GL_User: any;
  Shift: any;
  public Showdata: any;
  public SaveJWT : any = "";
  constructor(public h: HttpClient) { }

  public AddTask(task: FollowDataupdate): Promise<FollowDataupdate>
  {
    const observable = this.h.post<FollowDataupdate>("https://localhost:44367/API/Data_Passdown", task);
    return observable.toPromise();
  }

  public GetAllTasksList(): Promise<FollowDataupdate[]>
  {
    const observable = this.h.get<FollowDataupdate[]>("https://localhost:44367/API/Data_Passdown/GetAllData",
    {headers : {Authorization: "Bearer " + localStorage.getItem("token")}});
    return observable.toPromise();
  }

  public DeleteItemFormGLTable(id:number): Promise<undefined>
    {
      const observable = this.h.delete<undefined>("https://localhost:44367/API/Data_Passdown/DeleteTask/" +id,
      {headers : {Authorization: "Bearer " + localStorage.getItem("token")}});
      return observable.toPromise();
    }
  


}