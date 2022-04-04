import { HttpClient } from "@angular/common/http";
import { Injectable,Pipe } from "@angular/core";
import { CommentModel } from "../Models/CommentModel";
import { FollowDataupdate } from "../Models/FollowUpdateDataModel";

@Injectable({
  providedIn: 'root'
})
export class CommentsServer
{
  
  Comment : CommentModel[] = [];
  constructor(public h: HttpClient) { }

  public AddComment(comment: CommentModel): Promise<CommentModel>
  {
    const observable = this.h.post<CommentModel>("https://localhost:44367/api/Comments/DetailesComment", comment);
    return observable.toPromise();
  }



  public ShowAllComments(): Promise<CommentModel[]>
  {
    const observable = this.h.get<CommentModel[]>("https://localhost:44367/api/Comments");
    return observable.toPromise();
  }


  


}