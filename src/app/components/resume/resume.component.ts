import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resume_model } from 'src/app/Models/Resume_model';
import { ResumeService } from 'src/app/Services/ResumeTaskServer';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ResumeComponent implements OnInit {

  public ShowTaskListAray: Resume_model[] = [];
  public ActiveRoute: any= this.route.url
  public Id_image: any;
  public Isdelete = false;
  public ToCanceldelete = false;
  public ContactNameTodelete: any;
  public ActiveUser  = localStorage.getItem("User")?.toString();
  constructor(public Home: HomeComponent,public s: ResumeService, public route: Router) { }

  async ngOnInit() {
   
    try
     {
      this.ShowTaskListAray = await this.s.ResumeSave();
     } 
    catch (ex: any) 
    {
      alert(ex.message);
    }
  }

 public async deleteItem(val:any, name: any)
  {
    if(localStorage.getItem("User") == null)
    {
      alert("To delete item you have to be login");
      return;
    }
    this.Id_image = val;
    this.ContactNameTodelete = name;
    if(this.ContactNameTodelete.toLocaleLowerCase() == localStorage.getItem("User")?.toLocaleLowerCase()
      || localStorage.getItem("Command")=="GL" || localStorage.getItem("Command")=="POC")
    {
      try 
      {
        this.Isdelete = false;
        await this.s.DeleteItemFormTable(this.Id_image);
         setTimeout(() =>{
           window.location.reload();
         },100);
         return;    
      } 
      catch (ex: any)
       {
        alert(ex.message)
       }
    }
    else
    this.Isdelete = true;
  }

 async  OkTodeleteMessage()
  {
    try 
      {
        if(this.ToCanceldelete == true)
        {
          this.Isdelete = false;
          return; 
        }
         await this.s.DeleteItemFormTable(this.Id_image);
         setTimeout(() =>{
           window.location.reload();
         },100)   
      } 
      catch (ex: any) 
      {
        alert(ex.message);  
      }
    this.Isdelete = false
  }

  Canceldelete()
  {
    this.ToCanceldelete = true;
    this.Isdelete = false;
    this.ToCanceldelete = false;
  }

}
