import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowDataupdate } from 'src/app/Models/FollowUpdateDataModel';
import { ServiceDataGLFollow } from 'src/app/Services/FollowDataService';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AddTaskComponent implements OnInit {

  public InformSubmit: boolean = false;
  public showValue: any;
  public IsSelect: boolean = false;
  public UserName: any;
  public BuddyName: any;
  public TaskName: any;
  public time = new Date();
  public task = new FollowDataupdate();
  public SaveTask = new FollowDataupdate()

  constructor(public router: Router, public myAddTask: ServiceDataGLFollow, public Home: HomeComponent) { }

  ngOnInit(): void {
    this.Home.ngOnInit();
  }

  public async SaveToTaskList()
  { 
     try
        {
           this.SaveTask.time = this.time
           const addedTask = await this.myAddTask.AddTask(this.SaveTask);
            this.router.navigateByUrl("/Home");
        } 
           catch (error: any)
        {
           alert(error.message);
        }           
  }

  FunSelect(val:any)
  {
    {
      this.IsSelect=true;

      if(val.target.value=="SHIFT 1" || val.target.value=="SHIFT 2"  || val.target.value=="SHIFT 3"  || val.target.value=="SHIFT 4" )
      {
        this.InformSubmit=true;

      }
      

      this.showValue = val.target.value;
      this.SaveTask.shift=this.showValue;

    }
  }

}
