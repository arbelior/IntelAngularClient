import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Authentication_permissionsModel } from "../Models/Authentication_permissionsModel";
import { Creditionals } from "../Models/Creditionals";
import { UserModel } from "../Models/UserModel";

@Injectable({
    providedIn: 'root'
  })
  export class Authentication_permissionsService
  {

   public constructor(public h: HttpClient) { }

     public GetAllAccessPremissionsList(): Promise<Authentication_permissionsModel[]>
     {
       const observable = this.h.get<Authentication_permissionsModel[]>("https://localhost:44367/API/Auth");
       return observable.toPromise();
     }

     public GotToken(creditionals: Creditionals): Promise<Authentication_permissionsModel>
     {
       const observable = this.h.post<Authentication_permissionsModel>("https://localhost:44367/api/Auth/login",creditionals);
       return observable.toPromise();
     }
     
     public GetNewUserCreditionalIfTokenUser_ExpireDate(username: any) : Promise<Authentication_permissionsModel>
     {
      const observable = this.h.get<Authentication_permissionsModel>("https://localhost:44367/api/Auth/Refresh login/" +username);
      return observable.toPromise();
     }

     public AddNewUser(firstName: string, NewUser: Authentication_permissionsModel):Promise<Authentication_permissionsModel>
     {
      const observable = this.h.post<Authentication_permissionsModel>("https://localhost:44367/api/Auth/login/Role/" +firstName,NewUser,
    {headers : {Authorization: "Bearer " + localStorage.getItem("token")}});
      return observable.toPromise();

     }
    
    }