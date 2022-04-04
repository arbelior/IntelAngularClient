import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication_permissionsModel } from 'src/app/Models/Authentication_permissionsModel';
import { ChatModel } from 'src/app/Models/ChatModel';
import { ContactArray } from 'src/app/Models/ContactArray';
import { Creditionals } from 'src/app/Models/Creditionals';
import { UserModel } from 'src/app/Models/UserModel';
import { Authentication_permissionsService } from 'src/app/Services/Authentication_permissionsService';
import { ChatService } from 'src/app/Services/ChatService';
import { ContactsOnlineService } from 'src/app/Services/ContactsOnlineService';
import { TorqueService } from 'src/app/Services/TorqueSservice';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-ccc',
  templateUrl: './ccc.component.html',
  styleUrls: ['./ccc.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class CCCComponent implements OnInit {

  public IfLogin     =  false;
  public ShowLogin   =  true;
  public ShowLogout  =  false;
  public IfUserlogin =  false;
  public ShowUser:any; 
  public sendMessage: any;
  public user : Authentication_permissionsModel = {};
  public creditionals  = new Creditionals();
  public AddMessage : ChatModel = new ChatModel();
  public AllMessages : ChatModel [] = [];
  public AddContact : Authentication_permissionsModel = {}
  public ShowContact : UserModel[] = [];
  public date : Date = new Date();
  public User: UserModel = new UserModel();
  public Checkdate: Date = new Date();
  public contactsArray : ContactArray [] = [];
  public GetAllMessages : ChatModel   [] = [];
  public if_deleteAction = true;
  public saveTime_Whendelete: any;
  public IfType = false;
  public Active_date:any;
  public unscsribe: any;
  public SaveActivateShift: any;
  public ShowUserIfType:any;
  public UsertypeArray:string[]=[]
  public UpdateUser = new UserModel();
  public ShowUserName: UserModel={}
  public ShowIfUsertypeNow: any
  
  constructor(public menu: MenuComponent,public Home:HomeComponent,public ContactService: ContactsOnlineService,public Authentication_permissionService : Authentication_permissionsService, public ChatService: ChatService
    ,public route: Router,public Torqueservice: TorqueService ) {}

 public async ngOnInit() {
     this.ShowUser = localStorage.getItem("User")?.toString();
      setInterval(async () =>{
      try
      {        
        if(localStorage.getItem("token") != null)
        {
           this.AllMessages = await this.ChatService.GetAllMessages();
           this.ShowContact = await this.ContactService.GetAllUsers();  
        }          
      }
      catch(ex: any)
      {
        await this.ContactService.Delete_User(localStorage.getItem("User")?.toString());
        alert("Some error occured pls try again");
        this.route.navigateByUrl("/Home");
         localStorage.removeItem("User");
         localStorage.removeItem("token");
         localStorage.removeItem("Command");
         localStorage.removeItem("Role");
        return;  
      }
     },50);

     setInterval(() => {
        if(this.ShowContact.length>0)
        {
          this.ShowContact.map(async (x) => {
            if(x.type == "TypeNow" && x.name != localStorage.getItem("User")?.toString())
           {
               this.ShowUserName = await this.ContactService.ShowIfSomeUsertypeNow();
               if(this.ShowUserName.type == "TypeNow")
             {
               this.ShowIfUsertypeNow = this.ShowUserName.name;
               this.IfType = true;
             }
           }
           else if(x.type == null)   
           {
           this.IfType = false;
           this.ShowIfUsertypeNow=null;
           }
           }); 
        }
     },2000)

    }    
  
  public async SendMessgae()
  {
    try
    {
        this.AddMessage.name    = localStorage.getItem("User")?.toString();
        this.AddMessage.message = this.sendMessage;
        this.AddMessage.date  = this.date;
        await this.ChatService.AddMessageFun(this.AddMessage);
        this.sendMessage="";
        this.UpdateUser.name = localStorage.getItem("User")?.toString();
        await (this.ContactService.UpdateIfUserNot_Type(this.UpdateUser));
        this.ngOnInit();
    }
    catch(ex: any)
    {
      alert("Hi there, Pls Logout and login again and try to send the message, Tnx:)");
    }
  }

  public async LogOut()
  {
    try
    {
     await this.ContactService.Delete_User(localStorage.getItem("User")?.toString());
     localStorage.removeItem("token");
     localStorage.removeItem("User");
     localStorage.removeItem("Command");
     localStorage.removeItem("Role");
     this.IfType = false;
     this.route.navigateByUrl("/Home");
    }
    catch(ex: any)
    {
      alert(ex.message + "problem");
    }
  }

 

public async  UserTypeFun(val: any)
{
    let Typing: number;
    if(val.target.value.length > 0)
  {
           this.UpdateUser.name = localStorage.getItem("User")?.toString();
           this.UpdateUser.type = "TypeNow";
           await (this.ContactService.UpdateIfUserType(this.UpdateUser))

    //   do {
    //   Typing = val.target.value.length;
    //   setTimeout(async () => {
    //   if(val.target.value.length > Typing)
    //   {
    //     this.UpdateUser.name = localStorage.getItem("User")?.toString();
    //     this.UpdateUser.type = "TypeNow";
    //    await (this.ContactService.UpdateIfUserType(this.UpdateUser))
    //    this.IfType = true;
    //    return  
    //    }
    //    else
    //    {
    //    this.UpdateUser.name = localStorage.getItem("User")?.toString();
    //    await (this.ContactService.UpdateIfUserNot_Type(this.UpdateUser))
    //    this.IfType = false;
    //    return; 
    //    }
    // },500)   
    // } while (val.target.value>0);
  }

  else
  {
        this.UpdateUser.name = localStorage.getItem("User")?.toString();
        await (this.ContactService.UpdateIfUserNot_Type(this.UpdateUser))
  }
  
   
}

   showIfKey(val: any)
   {

    setTimeout(() => {

      if(val.returnValue == true)
      {
      console.log(true);
      
      }
      else
      {
      console.log(false);
      
     }
    },1000)

  }

  public IUserType()
  {

  }
  
}