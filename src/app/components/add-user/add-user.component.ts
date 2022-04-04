import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication_permissionsModel } from 'src/app/Models/Authentication_permissionsModel';
import { Authentication_permissionsService } from 'src/app/Services/Authentication_permissionsService';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(public Authentication_Service : Authentication_permissionsService, public route: Router) { }

  public addUser = new Authentication_permissionsModel();
  public name1: string="123";
  public name2: any;
  public ArrayCommands:    string [] = ["AM","ENG","MS","PT","GL", "POC"]
  public ArrayRoleCommand: string [] = ["Admin", "User"]

  ngOnInit(): void { }

  public CheckRoleInsert()
  {
   let counter=0;
   this.ArrayRoleCommand.map((x) => {
      if(x==this.addUser.role)
      counter++;
      return;
   });

   if(counter==0)
   {
      alert("You are insert not correct Role")
      this.ngOnInit();
      window.location.reload();
      return;
   }
  }

  public CheckCommandInsert()
  {
      let counter=0;
      this.ArrayCommands.map((x) => {
      if(x==this.addUser._command)
      counter++;
      return;
   });

   if(counter==0)
   {
      alert("You are insert not correct command")
      this.ngOnInit();
      window.location.reload();
      return;
   }
  }

  public async SaveNewUser()
  {
   this.CheckCommandInsert();
   this.CheckRoleInsert();    
     try
        {
           if(localStorage.getItem("User") != null && typeof localStorage.getItem("User") ==='string')
            {
            this.name2 = localStorage.getItem("User")?.toString();
            this.name1 = this.name2.toString();
            }

            const addedTask = await this.Authentication_Service.AddNewUser(this.name1,this.addUser);
            this.route.navigateByUrl("/Home");
        } 
           catch (error: any)
        {
           alert(error.message);
        }           
  }

}
