import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/Models/Module';
import { Resume_model } from 'src/app/Models/Resume_model';
import { ModuleService } from 'src/app/Services/ModuleService';
import { ResumeService } from 'src/app/Services/ResumeTaskServer';
import { HomeComponent } from '../home/home.component';
import { MaintanancePMComponent } from '../maintanance-pm/maintanance-pm.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  public Allmodules          :   Module [] = [];
  public modules             :   Module [] = [];
  public Alltools            :   Module [] = [];
  public ToolsPer_mod        :   Module [] = [];
  public Check_Module_ToTool :   Module [] = [];
  public Module_Value:  any;
  public selectedValue: any;
  public CheckedItem: boolean = false;
  public IfSave = false;
  public ResumeToTask = new Resume_model();
  public dt = new Date();
  public ShowAlarm = false;


  @Input()
  public Url_direction: any;


  constructor(public Home: HomeComponent,public Service_Mod : ModuleService, public router: Router,public s: ResumeService) { }

  async ngOnInit() {
     
    this.GetAllModulesDistnict();
  }

   async GetAllModulesDistnict()
   {
     this.modules=[];
     let count:number;
     try {
       this.Allmodules = await this.Service_Mod.GetDataModelperMod();
       this.Allmodules.map((x) =>{
         count=0;
         this.modules.map((y) =>{
           if(x.module == y.module)
           {
             count++;
           }           
         });
          if(count == 0)
         this.modules.push(new Module(undefined,x.module));         
       });
     }
      catch (err: any) {
       alert(err.message);
     }
   }

   async GetToolsPerModules(val: any)
   { 
     this.ToolsPer_mod=[];  
     let count: number=0;
     try {
      this.Alltools = await this.Service_Mod.GetToolsPerModule(val);
      this.Service_Mod.ModuleChoice = this.Module_Value;
      console.log(this.Alltools);
      this.Alltools.map((x)=>{
      this.ToolsPer_mod.map((y) =>{
          if(x.tool == y.tool)
          {
            count++;
          }
        });
        if(count == 0)
      {
        this.ToolsPer_mod.push(new Module(x.tool));
      }
        count=0;
      });
     }
      catch (err: any) {
       alert(err.message);
     }
     
   }

   Return()
   {
     this.router.navigateByUrl("/Home");
   }

   async Next()
   {
     let Get = await this.CheckItemFun();
    if(this.CheckedItem == true)
    {
      this.Service_Mod.ToolChoice = this.selectedValue;
      this.router.navigateByUrl(this.Url_direction);
      this.CheckedItem=false;
    }
    else
      // alert("Pls choose Module and Tool and than press NEXT");
      this.ShowAlarm=true;
   }

   async CheckItemFun()
   {
    
      try {
        this.Check_Module_ToTool = await this.Service_Mod.GetAllDataModules();
        this.Check_Module_ToTool.map((x) =>{
          if(this.Module_Value!= undefined && this.selectedValue != undefined)
          {
              if(x.module == this.Module_Value && x.tool == this.selectedValue)
                this.CheckedItem = true;
                return;
          }
          this.CheckedItem = false;       
        });
      } catch (ex: any) {
        alert(ex.message);
        
      }
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
      this.ResumeToTask.router = this.router.url;
    
      try
      {
      const AddResume = await this.s.AddTaskToSaveResume(this.ResumeToTask);
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

    OkToAlarmMessage()
    {
      this.ShowAlarm = false;
    }

    

   }





