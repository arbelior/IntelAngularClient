import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Authentication_permissionsModel } from "../Models/Authentication_permissionsModel";
import { ChatModel } from "../Models/ChatModel";
import { Creditionals } from "../Models/Creditionals";

@Injectable({
    providedIn: 'root'
  })
  export class ChatService
  {
    constructor(public h: HttpClient) { }

    public GetAllMessages(): Promise<ChatModel[]>
    {
      const observable = this.h.get<ChatModel[]>("https://localhost:44367/Message _box",
      {headers : {Authorization: "Bearer " + localStorage.getItem("token")}});
      return observable.toPromise();
    }

    public AddMessageFun(New_message: ChatModel): Promise<ChatModel>
    {
      const observable = this.h.post<ChatModel>("https://localhost:44367/api/Chat", New_message,
      {headers : {Authorization: "Bearer " + localStorage.getItem("token")}});

      return observable.toPromise();
    }

    public DeleteMessage(id:any): Promise<undefined>
    {
      const observable = this.h.delete<undefined>("https://localhost:44367/api/Chat/DeleteUser/" +id,
      {headers : {Authorization: "Bearer " + localStorage.getItem("token")}});
      return observable.toPromise();
    }  
  }