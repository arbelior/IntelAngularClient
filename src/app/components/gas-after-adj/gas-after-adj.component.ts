import { Component, Injectable, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GasModel } from 'src/app/Models/Gas_model';
import { IfdeviationModel } from 'src/app/Models/IfdeviationModel';
import { Resume_model } from 'src/app/Models/Resume_model';
import { ModuleService } from 'src/app/Services/ModuleService';
import { ResumeService } from 'src/app/Services/ResumeTaskServer';
import { GasfailedComponent } from '../gasfailed/gasfailed.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-gas-after-adj',
  templateUrl: './gas-after-adj.component.html',
  styleUrls: ['./gas-after-adj.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class GasAfterAdjComponent implements OnInit {

  public Gaslist_Failed_AfterAdj  : GasModel         [] = [];
  public FailedGasesAfterAdj      : GasModel         [] = [];
  public FillArrayIf_devation     : IfdeviationModel [] = [];
  public CheckIf_deviation        : boolean = false;
  public AlertIfdeviation = false;
  public GasValue: any;
  public Ifdelete = false;
  public ReturnIf_Undifine = false;
  public IfAllPassed = false;
  public IfSave = false;
  public dt = new Date();
  public ResumeToTask = new Resume_model();

  

  constructor(public Home: HomeComponent,public s: ModuleService, public route: Router, public GasFailed: GasfailedComponent, public Ser: ResumeService) { }

  ngOnInit(): void {
    this.Gaslist_Failed_AfterAdj = this.s.ReturnGasFailedArray
    this.Gaslist_Failed_AfterAdj.map((x) => {
      x.Ac= undefined;
      x.status = undefined;
    });
  }

  checkValueAC(val: any, name:  any)
  {
    this.Gaslist_Failed_AfterAdj.map((gas) => {
      if(val != undefined && gas.gasname == name)
      {
        gas.Ac = val.target.value;

         if(gas.Ac != undefined && gas.lower_limit != undefined && gas.upper_limit != undefined )
        { 
        if( this.Ifdelete == true || gas.Ac == 0 || gas.Ac < 0)
        gas.status = undefined;

        else if(gas.Ac >= gas.upper_limit * 1.03 || gas.Ac <= gas.lower_limit * 0.97 && gas.Ac > 0)
          gas.status = "deviation update ENG"
        
        else if(gas.Ac >= gas.lower_limit && gas.Ac <= gas.upper_limit)
              gas.status = "Passed";        

        else if(gas.Ac < gas.lower_limit || gas.Ac > gas.upper_limit && gas.Ac>0)
               gas.status = "Failed";
        
        else
               gas.status = undefined;
        }
               
      }
    });
  }

 async Return_Back()

  {
    this.s.ReturnGasFailedArray = await this.s.ReturnGasFailedArrayIfback;
    this.GasFailed.ngOnInit();
    this.route.navigateByUrl("/Gas-failed");
  }

  CheckIf_Failed()
{
  this.CheckIf_deviation = false;
  this.FailedGasesAfterAdj = this.Gaslist_Failed_AfterAdj.filter((x) => {
    return x.status == "Failed";
  });
}

CheckIf_AC_define(val: any)
{
  if(val.target.value.length == 0)
      this.Ifdelete = true;
  
      else
      this.Ifdelete = false;
}

 

  async Filter()
{
  let Check_FunArray = await this.CheckIf_Failed();
    this.FillArrayIf_devation  = [];
    let Select_Count           = 0;
    let Status_Passed_Count    = 0;
    

    this.Gaslist_Failed_AfterAdj.map((gas) => {
     
        if(gas.status == "Passed")
            Status_Passed_Count++;

        else if(gas.status == "deviation update ENG")
            this.CheckIf_deviation = true;
        
        else if(gas.status == undefined)
            this.ReturnIf_Undifine = true;            
    });

    if(this.CheckIf_deviation == true)
    {
      this.AlertIfdeviation = true;
      return;
    }

    else if(this.ReturnIf_Undifine == true)
    {

      this.ReturnIf_Undifine = false
      return;
    }
        
     else if(this.Gaslist_Failed_AfterAdj.length == Status_Passed_Count)
              this.IfAllPassed = true;
      
  
      else
      {
         this.s.ReturnGasFailedArray=this.FailedGasesAfterAdj;
         this.route.navigateByUrl("/Gas-failed");
      }
 
}

To_hide()
{
  this.AlertIfdeviation = false;
  
}

ToAddNewTask()
{
   this.route.navigateByUrl("/UpdateData")

}

Save()
{
  this.IfSave = true;

}

ToCancel()
{
  this.IfSave = false;
  this.ResumeToTask.name = undefined;
  this.ResumeToTask.task = undefined;
}

async ToSave()
{
  this.ResumeToTask.date = this.dt;
  this.ResumeToTask.router = this.route.url;

  try
  {
  const AddResume = await this.Ser.AddTaskToSaveResume(this.ResumeToTask);
  this.IfSave = false;
  this.ResumeToTask.name = undefined;
  this.ResumeToTask.task = undefined;
  }

  catch(ex: any)
  {
    alert(ex.message);
    this.IfSave = false;   
  }
}


}
