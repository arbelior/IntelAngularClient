import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Authentication_permissionsModel } from 'src/app/Models/Authentication_permissionsModel';
import { ContactArray } from 'src/app/Models/ContactArray';
import { Creditionals } from 'src/app/Models/Creditionals';
import { SaveUser } from 'src/app/Models/SaveUser';
import { UserModel } from 'src/app/Models/UserModel';
import { Authentication_permissionsService } from 'src/app/Services/Authentication_permissionsService';
import { ContactsOnlineService } from 'src/app/Services/ContactsOnlineService';
import { ServiceDataGLFollow } from 'src/app/Services/FollowDataService';
import { ModuleService } from 'src/app/Services/ModuleService';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MenuComponent implements OnInit {

  constructor(public Home: HomeComponent,public ContactService: ContactsOnlineService,public ServicePermission : ServiceDataGLFollow ,public router: Router, public Authentication_permissionService : Authentication_permissionsService, public s2: ModuleService) { }
  public IsAccess: boolean=false;
  public User_id: any;
  public Userpass: any;
  public Authentication_permissionsUser: Authentication_permissionsModel   = {}
  public SaveLoginUserIfJWT : Authentication_permissionsModel = {};
  public Authentication_permissionsToken: Authentication_permissionsModel [] = [];

  public IsFailed_UserId: boolean = false;

  public IsFailed_UserPass: boolean = false;

  public Detailes_Uncorrect: boolean = false;

  public done: string="";

  public ToShowPass = false;

  public ToHidePass = false;

  public Select: any;

   public SelectCCC = false;

  public SelectPassdown= false;

 public IfUserIsActive = false;

  public FirstName: any

  public SaveJWT : string="";

  public date: Date = new Date();

  public Savedate: string = "";

  public ChoiceNavigate : any;
  
  public creditionals  = new Creditionals();

  public saveUser =  new SaveUser();

  public RefresheCreditional: any;

  public IfUnauthorized = false;

  public CCC:any=1;

  public TaskList:any=0;

  public AddUser : UserModel = new UserModel();

  public ActiveUsers: ContactArray [] = [];

  public ActiveUrl:any;

  public CheckIfuserLogin = false;

  public IfRole=  false;


 public async ngOnInit() 
  { 
      this.ActiveUrl = this.router.url; 
      setTimeout(() => {
      this.IfLoginExoireToken();
     },113000);     
  
  }

  public checkIfLogin():boolean
  {
    if(localStorage.getItem("token") == null)
    {
    this.CheckIfuserLogin = false;
    this.IfRole = false;
    return true;
    }
    else if(localStorage.getItem("token") != null && localStorage.getItem("Role") != "Admin")
    {
      this.CheckIfuserLogin = true;
      this.IfRole = false;
      return false;
    }
    else
    {
      this.CheckIfuserLogin = true;
      this.IfRole = true;
      return false;
    }   
  } 

public async logout()
{
  await this.ContactService.Delete_User(localStorage.getItem("User"));
  localStorage.removeItem("token");
  localStorage.removeItem("User");
  localStorage.removeItem("Command");
  localStorage.removeItem("Role");
  this.checkIfLogin();
}

 public async IfLoginExoireToken()
 {
  let user  = localStorage.getItem("User")
  this.SaveLoginUserIfJWT=  await this.Authentication_permissionService.GetNewUserCreditionalIfTokenUser_ExpireDate(user);
  this.creditionals.username = this.SaveLoginUserIfJWT.user_name;
  this.creditionals.password = this.SaveLoginUserIfJWT.pass;
  this.AddUser.name = localStorage.getItem("User")?.toString();
  await this.ContactService.Delete_User(this.AddUser);
  localStorage.removeItem("token");
  localStorage.removeItem("User");
  localStorage.removeItem("Command");

  this.login();
 }

 public async AcceseeArea(val?: any)
  {
    try
    { 
    if(typeof localStorage.getItem("token") === 'string')
    {
       let ValToken = localStorage.getItem("token")?.toString();
       if(typeof ValToken === 'string' && typeof ValToken != null)
        { 
          this.IsAccess = false;
          if(val == 1)
          {
            this.router.navigateByUrl("/CCC");
            this.IsAccess = false;
            return;
          } 
          else if(val == 0)
          {
            this.router.navigateByUrl("/TaskList")
            this.IsAccess = false;
           return;
          }
          else if(val == 3)
          {
            this.router.navigateByUrl(this.router.url);
           this.IsAccess = false;
           return;
          }
        }
    }
    this.IsAccess = true;
    if(val == 1)
    { 
      this.SelectCCC = true;
      this.SelectPassdown = false;
    return;
    }
    else if(val == 0)
    {
      this.SelectCCC = false;
      this.SelectPassdown = true;
      return;
    }
    if(val==3)
    {
      this.SelectCCC = false;
      this.SelectPassdown = false;
      this.router.navigateByUrl(this.router.url);
    }
    return;
  }
  catch(ex: any)
  {
    alert(ex.message);
    this.AddUser.name = localStorage.getItem("User")?.toString();
    await this.ContactService.Delete_User(this.AddUser);
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    localStorage.removeItem("Command");
    localStorage.removeItem("Role");
    this.IsAccess = true;
    this.router.navigateByUrl("/Home");
  }

  }


 public async login()
  {
    try
    {
        this.ActiveUsers = await this.ContactService.GetAllUsers();
        let counter = 0;
        this.ActiveUsers.map((x) =>{
        if(x.name == this.creditionals.username)
          counter++;
        });
        if(counter > 0)
        {
          this.IfUserIsActive = true;
          setTimeout(() =>{
            this.IfUserIsActive = false;
          },4000)
          this.creditionals.username="";
          this.creditionals.password="";
          this.IsAccess = true;
        }
 else
  {    
      this.Authentication_permissionsUser = (await this.Authentication_permissionService.GotToken(this.creditionals));
      
      if(this.Authentication_permissionsUser.user_name!= null && this.Authentication_permissionsUser.jwt_token != null)
      {
        this.saveUser.username    = this.Authentication_permissionsUser.first_name
        this.saveUser.jwt         = this.Authentication_permissionsUser.jwt_token;
        this.saveUser.RoleCommand = this.Authentication_permissionsUser._command;
        if(this.saveUser.username != null && this.saveUser.jwt != null && 
          this.saveUser.RoleCommand != null && this.Authentication_permissionsUser.role != null)
        {
             localStorage.setItem("token" , this.saveUser.jwt);
             localStorage.setItem("User",this.saveUser.username);
             localStorage.setItem("Command", this.saveUser.RoleCommand);
             localStorage.setItem("Role",this.Authentication_permissionsUser.role);
             this.IsAccess = false;
             this.AddUser.name = localStorage.getItem("User")?.toString();
             await this.ContactService.AddUser(this.AddUser);
             if(this.SelectCCC == true && this.SelectPassdown == false)
             {
              if(typeof localStorage.getItem("User") != null && typeof localStorage.getItem("User") === 'string')
              {
                this.router.navigateByUrl("/CCC");
                return;
              }
              return;              
             }
             else if(this.SelectCCC == false && this.SelectPassdown == true)
             {
              this.router.navigateByUrl("/TaskList");
              return;
             }
             else
             {
               this.router.navigateByUrl(this.router.url);
             return;
             }   
           }      
         }     
        }
      }
    catch(ex: any)
    {
      if(ex.status == 401 || ex.status == 403 || ex.status == 400)
      this.IfUnauthorized = true;

      else
      alert("Some error ocuured, pls try again later");
      await this.ContactService.Delete_User(this.AddUser);
      localStorage.removeItem("User");
      localStorage.removeItem("token");
      localStorage.removeItem("Command");
      localStorage.removeItem("Role");
      this.IsAccess = true;
      this.router.navigateByUrl("/Home");
    }
  }

   cancel()
  {
    this.IsAccess = false;
  }

  ShowPass()
  {
    document.getElementById("pass")?.setAttribute("type", "text");
    this.ToShowPass = false;
    this.ToHidePass = true;
  }

  HidePass()
  {
      
    document.getElementById("pass")?.setAttribute("type", "password");
    this.ToShowPass = true;
    this.ToHidePass = false;
    
  }

  Hide_Alarm_Authorized()
  {
    this.IfUnauthorized = false;
    this.router.navigateByUrl("/Home");

  }

  CheckIfStart(val: any)
  {
    
    if(val.target.value.length > 0)
    {
       this.ToShowPass = true;
       this.ToHidePass = false;
    }

    else
    {
      this.ToShowPass = false;
      this.ToHidePass = false;
      document.getElementById("pass")?.setAttribute("type", "password");
    }
     
  }

}
