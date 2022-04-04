import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { GasModel } from 'src/app/Models/Gas_model';
import { Resume_model } from 'src/app/Models/Resume_model';
import { ModuleService } from 'src/app/Services/ModuleService';
import { ResumeService } from 'src/app/Services/ResumeTaskServer';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-gasfailed',
  templateUrl: './gasfailed.component.html',
  styleUrls: ['./gasfailed.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class GasfailedComponent implements OnInit {

  public GasFailed_List:      GasModel[] = [];
  public StopMouseEnterAlarm: boolean = false;
  public IfSave = false;
  public IsMouseEnter = false
  public dt = new Date();
  public ResumeToTask = new Resume_model();


  constructor(public Home: HomeComponent,public S: ModuleService,public ResumeService: ResumeService ,public route : Router) { }

  ngOnInit(): void {
    this.S.ReturnGasFailedArrayIfback =this.S.ReturnGasFailedArray;
    this.GasFailed_List = this.S.ReturnGasFailedArray;
    this.GasFailed_List.map((x) => {
      x.OldAio=undefined;
      x.NewAio=undefined;
    });
    console.log(this.GasFailed_List);
  }

  Check_oldAIO()
  {
    if(this.StopMouseEnterAlarm == false)
    this.IsMouseEnter = true;

    else
    return;
  }

  ToHideMouseEnterAlarm()
  {
    this.IsMouseEnter = false;
    this.StopMouseEnterAlarm = true;
  }

  Calc_NewAio(val:any, name: any)
  {
      {
         this.GasFailed_List.map((x) =>{
    
            if(val != undefined &&  x.gasname == name)
           {
                 x.OldAio = val.target.value;
                 if(val.target.value.length==0)
                  {
                    x.OldAio = undefined;
                    x.NewAio = undefined;
                  }

                else if(x.Ac != undefined && x.target != undefined && x.OldAio != undefined && x.OldAio < 0)
                 {
                   x.OldAio = undefined;
                   x.NewAio = undefined;
                 }
             else if(x.Ac != undefined && x.target != undefined && x.OldAio != undefined)
                x.NewAio = (x.Ac/x.target) * x.OldAio;
                         
           }

         });
      }  
  }

  CheckIfNoFill(val: any , name: any)
  {
    this.GasFailed_List.map((y) =>{
      if(val.target.value.length == 0 && y.gasname == name)
      {
        y.OldAio = undefined;
        y.NewAio = undefined;
      }
    });
  }

  Next()
  {
    let boolIf_fill = false
    this.GasFailed_List.map(x =>{
      if(x.gasname!= undefined && x.gasname != undefined && x.OldAio == undefined && x.NewAio == undefined)
      boolIf_fill = true;
    })
    if(boolIf_fill == false)
    {
      this.S.ReturnGasFailedArray = this.GasFailed_List;
      this.route.navigateByUrl("/Gas-After_Adj");
      this.S.ReturnGasAioArray = this.GasFailed_List;
    }

    else return;
 
  }

  Return_Back()
  {
    this.route.navigateByUrl("/Gas-List");
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
    const AddResume = await this.ResumeService.AddTaskToSaveResume(this.ResumeToTask);
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
