import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentModel } from 'src/app/Models/CommentModel';
import { CommentsServer } from 'src/app/Services/CommentsServer';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class CommentsPageComponent implements OnInit {

  public ShowName: any;
  public IfMessageSend = false;
  public selectedValue: any;
  public SubjectsArray: string [] =["ENG","PT","MS","Floater","T.S_L3"];
  public NewComment = new CommentModel();
  constructor(public Home: HomeComponent,public route: Router, public Service: CommentsServer) { }

  ngOnInit(): void {
    this.SubjectsArray;
  }

  Cancel()
  {
    this.route.navigateByUrl("/Home");
  }

 public async Send()
  {
    try
    {
    this.NewComment.subject = this.selectedValue;
    await this.Service.AddComment(this.NewComment);
    this.MessageSendFun();
    }
    catch(ex: any)
    {
    alert(ex.message);
    }
  }

  public MessageSendFun()
  {
    this.IfMessageSend = true;
    setTimeout (() =>{
      this.IfMessageSend = false;
      this.route.navigateByUrl("/Home");
    },10000)
  }

  HideMessage()
  {
    this.IfMessageSend = false;
    this.route.navigateByUrl("/Home");
  }

  Reset(comment: string)
  {
    if(comment.length > 0)
    this.NewComment.comment="";
    
  }

}

