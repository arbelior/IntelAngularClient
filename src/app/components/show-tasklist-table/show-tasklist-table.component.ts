import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication_permissionsModel } from 'src/app/Models/Authentication_permissionsModel';
import { FollowDataupdate } from 'src/app/Models/FollowUpdateDataModel';
import { UserModel } from 'src/app/Models/UserModel';
import { Authentication_permissionsService } from 'src/app/Services/Authentication_permissionsService';
import { ContactsOnlineService } from 'src/app/Services/ContactsOnlineService';
import { ServiceDataGLFollow } from 'src/app/Services/FollowDataService';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-show-tasklist-table',
  templateUrl: './show-tasklist-table.component.html',
  styleUrls: ['./show-tasklist-table.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ShowTasklistTableComponent implements OnInit {

  public ActiveRoute: any = "TaskList";
  public Datalist: FollowDataupdate   [] = [];
  public BuDataList: FollowDataupdate [] = [];
  public ShowContact: Authentication_permissionsModel[] = [];
  constructor(public Home: HomeComponent,public ContactService: ContactsOnlineService,public s: ServiceDataGLFollow, public route: Router, public contacts : Authentication_permissionsService, public Menu: MenuComponent ) { }
  public showName = localStorage.getItem("User");
  public AddUserTochat: UserModel = new UserModel(); 
  public IfUnauthorized = false;

  async ngOnInit() 
  {
    try
     {
        this.Datalist = await this.s.GetAllTasksList();
     }
    catch (ex: any)
    {
      this.route.navigateByUrl("/Home");
      alert("Some error occured pls try again later");
      localStorage.removeItem("User");
      localStorage.removeItem("token"); 
      localStorage.removeItem("Command");
      localStorage.removeItem("Role"); 
     }
 }

public  async deleteItem(val:any, name: any)
 {
   this.IfUnauthorized = false;
  try 
   { 
    if(localStorage.getItem("Command") == "GL" ||localStorage.getItem("Command") =="POC" || localStorage.getItem("Role") == "Admin")     
      {
     (await this.s.DeleteItemFormGLTable(val));   
        setTimeout(()=>{
        window.location.reload();
          },1500)  
      }
      else
      {
        this.IfUnauthorized = true;      
        setTimeout(() => {
          this.IfUnauthorized = false;      

        },8000)       
      }
   } 
   catch (ex: any) 
   {
     alert(ex.message);   
   }

  }

  Hide_Alarm_Authorized()
  {
    this.IfUnauthorized = false;

  }


  public async Logout()
  {
    try
    {
     await this.ContactService.Delete_User(localStorage.getItem("User")?.toString());
     localStorage.removeItem("token");
     localStorage.removeItem("User");
     localStorage.removeItem("Command");
     localStorage.removeItem("Role");
     this.route.navigateByUrl("/Home");
    }
    catch(ex: any)
    {
      alert(ex.message + "problem");
    }
  }

}
