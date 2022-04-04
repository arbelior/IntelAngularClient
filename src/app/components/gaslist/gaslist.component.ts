import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GasModel } from 'src/app/Models/Gas_model';
import { IfdeviationModel } from 'src/app/Models/IfdeviationModel';
import { Resume_model } from 'src/app/Models/Resume_model';
import { ModuleService } from 'src/app/Services/ModuleService';
import { ResumeService } from 'src/app/Services/ResumeTaskServer';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-gaslist',
  templateUrl: './gaslist.component.html',
  styleUrls: ['./gaslist.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class GaslistComponent implements OnInit {

  public GasListModel:            GasModel  [] = [];
  public ShowTool:                any =     this.s.ToolChoice;
  public FailedGases:             GasModel  [] = [];
  public FillArrayIf_devation:    IfdeviationModel [] = [];
  public CheckIf_deviation : boolean = false;
  public SaveAcIf_define   : any;
  public checkIfAc_define=false;
  public AlertIfdeviation = false;
  public AlertIfAllPassed = false;
  public divOpen = false;
  public StatusValue = false;
  public color: any
  public ResumeToTask = new Resume_model();
  public IfSave = false;
  public dt = new Date();
  

  constructor(public Home: HomeComponent,public s: ModuleService, public route: Router, public Ser: ResumeService) { }

  async ngOnInit() {
    try
     {
     this.GasListModel = await this.s.GetDataPerTool(this.ShowTool);
     }
    catch (ex: any)
    {
        alert(ex.message);
    }
 }

 checkBox(val: any)
 { 
  const gas_line = val.target.value
  const Is_check = val.target.checked

  this.GasListModel.map((d) =>{
      if(d.gasline == gas_line)
      {
        d.Select = Is_check
        if(d.Select == false)
        {
          d.status=undefined;
          d.Ac = undefined;
        }
        return;
      }
       return;
  })
}

checkValueAC(val: any, name: any)
{
  let i=0;
    this.GasListModel.map((gas) =>{
      if(val != undefined  && gas.gasname == name)
      {
        gas.Ac = val.target.value;

        if(gas.Ac != undefined && gas.lower_limit != undefined && gas.upper_limit != undefined && gas.Select==true)
        {

          if(this.checkIfAc_define == true || gas.Ac == 0 || gas.Ac<0)
                gas.status = undefined;

           else if(gas.Ac >= gas.upper_limit * 1.03 || gas.Ac <= gas.lower_limit * 0.97 && gas.Ac > 0)
             {
              
             
              gas.status = "deviation update ENG";  
              this.StatusValue = false;
             } 

          else if(gas.Ac >= gas.lower_limit && gas.Ac <= gas.upper_limit)
          {
         
             gas.status = "Passed";  
             this.StatusValue = false;
          }
                  
          else if(gas.Ac < gas.lower_limit || gas.Ac > gas.upper_limit && gas.Ac>0)
                  {
                    
                     gas.status = "Failed";
                     this.StatusValue = true;              
                  }   
                                     
           else
           {
             gas.status = undefined;
             this.StatusValue = false;         
           }
        }
      }       
    });
}



CheckIf_Failed()
{
  this.CheckIf_deviation = false;
  this.FailedGases = this.GasListModel.filter((x) => {
    return x.status == "Failed";
  });
}

async Filter()
{
  let Check_FunArray = await this.CheckIf_Failed();
    this.FillArrayIf_devation  = [];
    let Select_Count           = 0;
    let Status_Passed_Count    = 0;
    let logic_Counter          = 0;

    this.GasListModel.map((gas) => {
      if(gas.Select == true)
      {
        Select_Count++;

        if(gas.status == "Passed")
            Status_Passed_Count++;

        if(gas.status == "deviation update ENG")
        {
          this.FillArrayIf_devation.push (new IfdeviationModel(gas.gasname))
          this.CheckIf_deviation = true;
        }

        if(gas.Select == true && gas.status == undefined)
        logic_Counter++;
      }       
    });

    if(this.CheckIf_deviation == true)
    {
      this.divOpen = true;
      this.AlertIfAllPassed = false;
      this.AlertIfdeviation = true;
      return;
    }

    if(Select_Count==0 || logic_Counter > 0)
    {
      this.divOpen = false
      this.AlertIfAllPassed = false;
      this.AlertIfdeviation = false;
      return;
    } 
     
    else
    {
      if(Select_Count == Status_Passed_Count)
      {
        this.divOpen = true;
        this.AlertIfdeviation = false;
        this.AllGasesPassedFun();
      }
  
      else
      {
         this.AlertIfAllPassed = false;
         this.AlertIfdeviation = false;
         this.s.ReturnGasFailedArray=this.FailedGases;
         this.route.navigateByUrl("/Gas-failed");
      }
    }
 
}

AllGasesPassedFun()
{
  this.AlertIfAllPassed = true;
  setTimeout(() =>{
    this.AlertIfAllPassed = false;
    this.divOpen = false;
    this.AlertIfdeviation=false;
    this.route.navigateByUrl("/Home")
  },7000)

}

To_hideIFpassed()
{
  this.AlertIfdeviation=false;
  this.AlertIfAllPassed = false;
  this.divOpen = false;
  this.route.navigateByUrl("/Home")
}

checkIfInvalid(val: any)
{
  let check = val.target.value
  if(check.length == 0)
      this.checkIfAc_define = true;  
  
  else
  this.checkIfAc_define = false;
}

To_hide()
{
  this.AlertIfdeviation=false;
  this.AlertIfAllPassed = false;
  this.divOpen = false;
}

Return_Back()
{
   this.route.navigateByUrl("/GAS-Adj");
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


  
