import { HttpClient } from "@angular/common/http";
import { Injectable,Pipe } from "@angular/core";
import { CommentModel } from "../Models/CommentModel";
import { FollowDataupdate } from "../Models/FollowUpdateDataModel";
import { UserModel } from "../Models/UserModel";

@Injectable({
  providedIn: 'root'
})
export class ContactsOnlineService
{
    constructor(public h: HttpClient) { }

    public AddUser(User: UserModel): Promise<UserModel>
    {
      const observable = this.h.post<UserModel>("https://localhost:44367/AddUser", User);
      return observable.toPromise();
    }

    public Delete_User(name:any): Promise<undefined>
    {
      const observable = this.h.delete<undefined>("https://localhost:44367/api/Contacts/DeleteUser/"+name);
      return observable.toPromise();
    }

    public GetAllUsers(): Promise<UserModel[]>
    {
       const observable = this.h.get<UserModel[]>("https://localhost:44367/api/Contacts/GetAllUsers");
       return observable.toPromise(); 
    }

    public UpdateIfUserType(obj: UserModel): Promise<UserModel>
    {
      const observable = this.h.put<UserModel>("https://localhost:44367/api/Contacts/Update_If_UserType",obj);
       return observable.toPromise(); 
    }

    public UpdateIfUserNot_Type(obj: UserModel): Promise<UserModel>
    {
      const observable = this.h.put<UserModel>("https://localhost:44367/api/Contacts/Update_If_UserNotType",obj);
       return observable.toPromise(); 
    }

    public ShowIfSomeUsertypeNow(): Promise<UserModel>
    {
      const observable = this.h.get<UserModel>("https://localhost:44367/api/Contacts/ShowIfUserType/" 
      + localStorage.getItem("User")?.toString());
      return observable.toPromise(); 
    }

    



  
}