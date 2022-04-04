import { ReturnStatement } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication_permissionsModel } from 'src/app/Models/Authentication_permissionsModel';
import { FollowDataupdate } from 'src/app/Models/FollowUpdateDataModel';
import { ImageModel } from 'src/app/Models/ImageModel';
import { TorqueModel } from 'src/app/Models/TorqueModel';
import { Authentication_permissionsService } from 'src/app/Services/Authentication_permissionsService';
import { ServiceDataGLFollow } from 'src/app/Services/FollowDataService';
import { ImgService } from 'src/app/Services/ImgService';
import { ModuleService } from 'src/app/Services/ModuleService';
import { TorqueService } from 'src/app/Services/TorqueSservice';
import { CCCComponent } from '../ccc/ccc.component';
import { ModulesComponent } from '../modules/modules.component';

@Component({
  selector: 'app-maintanance-pm',
  templateUrl: './maintanance-pm.component.html',
  styleUrls: ['./maintanance-pm.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MaintanancePMComponent implements OnInit {
  constructor(public Authentication_Service: Authentication_permissionsService, public ServiceTorque: TorqueService,
     public Modules: ModuleService, public router: Router, public CCC: CCCComponent,
     public myAddTask: ServiceDataGLFollow, public imgService: ImgService) { }
  public str: any = this.Modules.ToolChoice
  public selectedValue: any;
  public pcArrayGTO: string[] = [this.str + "_PC1", this.str + "_PC2", this.str + "_PC3",
  this.str + "_PC4", this.str + "_PC5", this.str + "_PC6"];
  public pcArrayGTA: string[] = [this.str + "_PC1", this.str + "_PC2", this.str + "_PC3",
  this.str + "_PC4", this.str + "_PC5", this.str + "_PC6", this.str + "_PC7", this.str + "_PC8"];
  public PcEmptyArray: string[] = [];
  public IfSelect_Task = false;
  public showTask: any;
  public IfTask_define = false;
  public IfUseTorque = false;
  public i_Preperation = 1;
  public Select_Preperation_Picture = "preperation" + this.i_Preperation;
  public preperation_choice = false;
  public i_disassembly = 1;
  public Select_DisAssembly_Picture = "dissassembly" + this.i_disassembly;
  public i_assembly = 1
  public Select_Assembly_Picture = "Assembly" + this.i_assembly;
  disassembly_choice = false;
  public Pma = false;
  public Pmb = false;
  public Pmc = false;
  public Pmd = false;
  public Pme = false;
  public hlc = false;
  public If_Task_Selct = false;
  public Select_Task: any;
  public ArraySizeOf_Images_Preperation: any[] = [];
  public ArraySizeOf_Images_DisAssembly: any[] = [];
  public ArraySizeOf_Images_Assembly: any[] = [];
  public ShowModuleChoice = this.Modules.ModuleChoice;
  public Assembly_choice = false;
  public IfRegularPc = false;
  public IfAshPc = false;
  public ShowModuleChoiceIfAsh = this.Modules.ModuleChoice + "Ash";
  public IfLogin = false;
  public ShowName = localStorage.getItem("User");
  public TorqueListArray: TorqueModel[] = [];
  public TorqueListArrayAPerTask: TorqueModel[] = [];
  public TorqueCheckAndUpdate : TorqueModel[] = [];
  public IfAskTorqueCheck = false;
  public IfEdit = false;
  public ShowUserDetailes: Authentication_permissionsModel = {}
  public CheckBoxCounter = 0;
  public IfAllTorqueCheck = true;
  public ArrayTorque: [{[key: string]: number}]=[{}];
  public iF_PMA = false;
  public selectSubmit = false;
  public IfInsertBuddy = true;
  public SaveTorque_Check = new FollowDataupdate();
  public buddy:any;
  public time = new Date();
  public ImageData = new ImageModel();
  public Pm_Step: any;
  public ImageLocation=1;
  public ArrayImages: ImageModel [] = []; 
  public ImageChoiceTodescription: ImageModel [] = []; 
  public Show_Images_detailes    : ImageModel [] = [];
  public showSelectTorque: any;
  public VerifyToqrqueList = false;

  ngOnInit(): void {
    if (this.IfLogin == true)
      this.ShowName = localStorage.getItem("User");

    setInterval(() => {
      if (localStorage.getItem("User") != null)
        this.IfLogin = true;

      else
        this.IfLogin = false;
    }, 1000)

    
    if (this.str.charAt(2) == 'A')
      this.PcEmptyArray = this.pcArrayGTA;

    else if (this.str.charAt(2) == 'O')
      this.PcEmptyArray = this.pcArrayGTO;

  }

  public LogoutFun() {this.CCC.LogOut();}

  public CheckBox(val :any)
  {
    if(this.IfEditFunc() == true)
    {
      const partName  = val.target.value;
      const Is_Check  = val.target.checked
        this.TorqueListArrayAPerTask.map((x) => {
        if(x.part == partName)
        {
          if(val.target.checked == true)
          {
            x.ShowTorqueDB = false;
            x.select = Is_Check;
            return;
          }
          else if(val.target.checked == false)
          {
            x.select = false;
            x.ShowTorqueDB = true;
            return;
          }

        }
        else 
        {   
          x.select = false;
          x.ShowTorqueDB = true;
          return;
        }
         return;
      });
    }
    else
    {
   
    if(val.target.checked == true)
    this.CheckBoxCounter++;

    if(val.target.checked == false)
    this.CheckBoxCounter--;

    if(this.CheckBoxCounter == this.TorqueListArrayAPerTask.length)
    this.IfAllTorqueCheck = false;

    else
    this.IfAllTorqueCheck = true;
    }
  }

  public CheckIf_InsertBuddy(val: any)
  {
    if(val.target.value.length > 0)
    this.IfInsertBuddy = false;

    else
    this.IfInsertBuddy = true;
  }

  public async SaveTorqueCheck_Task()
  {
    try
        {
          this.SaveTorque_Check = new FollowDataupdate();
          this.SaveTorque_Check.techname = localStorage.getItem("User")?.toString();
          this.SaveTorque_Check.buddy = this.buddy;
          this.SaveTorque_Check.shift = (await this.ServiceTorque.GetShiftToUpdateTorqueCheck()).toString();
          this.SaveTorque_Check.task = this.selectedValue + " " + this.Select_Task + " Torque List Check Succesfully!";
          this.SaveTorque_Check.time  = this.time;
          const addedTask = await this.myAddTask.AddTask(this.SaveTorque_Check);
          this.CloseTorqueList();
        } 
           catch (error: any)
        {
           alert(error.message);
        } 
  }
  public UpdateTorqueInArray(val: any, part: any)
  {
    this.TorqueListArrayAPerTask.map((x) => {
      if(x.part == part)
      x.torque =val.target.value
    });
  }

  public async Torque() {
    if (localStorage.getItem("token") == null)
      alert("You have to login for Torque data list");

    else {
      this.preperation_choice = false;
      this.Assembly_choice = false;
      this.disassembly_choice = false;

      this.TorqueListArrayAPerTask = [];
      this.TorqueListArray = await this.ServiceTorque.GetTorqueListPerModule(this.ShowModuleChoice);
      this.TorqueListArray.map((x) => {
        if (x.pm == this.showTask)
          this.TorqueListArrayAPerTask.push(x);
      });
      this.TorqueListArrayAPerTask.map((x) => {
        x.ShowTorqueDB = true;
      })

      this.IfAskTorqueCheck = true;
    }
  }

  public Tocancel() {
    this.preperation_choice = false;
    this.Assembly_choice = false;
    this.disassembly_choice = false;
  }

  public Cancel() {
    this.IfAskTorqueCheck = false;
  }

  public IfEditFunc(): boolean {
    if (localStorage.getItem("Command") == "ENG")
    {
      this.IfAllTorqueCheck = false
      return true;
    }
      else
      return false;
  }

  public CloseTorqueList()
  {
    this.IfInsertBuddy = true;
    this.selectSubmit = false;
    this.CheckBoxCounter = 0;
    this.IfAllTorqueCheck = true;
    this.IfAskTorqueCheck = false;
  }

  public async Update()
  {
    this.TorqueListArrayAPerTask.map(async (x) => {
         await this.ServiceTorque.UpdateTorqueVal(x);            
     });
    this.CloseTorqueList();
  }

  public FunShowMainArea(val: any) {
    if (this.selectedValue == null) {
      alert("Not selected tool");
      this.IfSelect_Task = false;
    }
    else {
      this.IfInsertBuddy = true;
      this.selectSubmit = false;
      this.CheckBoxCounter = 0;
      this.IfAllTorqueCheck = true;
      this.IfAskTorqueCheck = false;
      this.IfEdit = false;
      this.showTask = val.target.value;
      this.IfSelect_Task = true;
      this.IfTask_define = true;
      if (val.target.value == "PMA" || val.target.value == "PMD" || val.target.value == "PME")
        this.IfUseTorque = true;

      else
        this.IfUseTorque = false
    }
    this.Assembly_choice = false;
    this.disassembly_choice = false;
    this.preperation_choice = false;
    this.i_Preperation = 1;
    this.Select_Preperation_Picture = "preperation" + this.i_Preperation;
    this.i_disassembly = 1;
    this.Select_DisAssembly_Picture = "dissassembly" + this.i_disassembly;
    this.i_assembly = 1
    this.Select_Assembly_Picture = "Assembly" + this.i_assembly;
    switch (val.target.value) {
      case "PMA":
        if (this.selectedValue.charAt(9) == 7 || this.selectedValue.charAt(9) == 8) {
          this.ShowModuleChoice = this.ShowModuleChoiceIfAsh
          this.IfRegularPc = false;
          this.IfAshPc = true;
          this.If_Task_Selct = false;
          this.Pma = true;
          this.Pmb = false;
          this.Pmc = false;
          this.Pmd = false;
          this.Pme = false;
          this.hlc = false;
          this.If_Task_Selct = this.Pma;
          this.Select_Task = "PMA";
          this.ArraySize_Images_PerModule_PerTask_PerPc();
          break;
        }
        this.ShowModuleChoice = this.Modules.ModuleChoice;
        this.IfRegularPc = true;
        this.IfAshPc = false;
        this.If_Task_Selct = false;
        this.Pma = true;
        this.Pmb = false;
        this.Pmc = false;
        this.Pmd = false;
        this.Pme = false;
        this.hlc = false;
        this.If_Task_Selct = this.Pma;
        this.Select_Task = "PMA";
        this.ArraySize_Images_PerModule_PerTask_PerPc();

        break;
      case "PMB":
        if (this.selectedValue.charAt(9) == 7 || this.selectedValue.charAt(9) == 8) {
          this.ShowModuleChoice = this.ShowModuleChoiceIfAsh
          this.IfRegularPc = false;
          this.IfAshPc = true;
          this.If_Task_Selct = false;
          this.Pmb = true;
          this.Pma = false;
          this.Pmc = false;
          this.Pmd = false;
          this.Pme = false;
          this.hlc = false;
          this.If_Task_Selct = this.Pmb;
          this.Select_Task = "PMB";
          this.ArraySize_Images_PerModule_PerTask_PerPc();
          break;
        }
        this.IfRegularPc = true;
        this.IfAshPc = false;
        this.ShowModuleChoice = this.Modules.ModuleChoice;
        this.If_Task_Selct = false;
        this.Pmb = true;
        this.Pma = false;
        this.Pmc = false;
        this.Pmd = false;
        this.Pme = false;
        this.hlc = false;
        this.If_Task_Selct = this.Pmb;
        this.Select_Task = "PMB";
        this.ArraySize_Images_PerModule_PerTask_PerPc();
        break;
      case "PMC":
        if (this.selectedValue.charAt(9) == 7 || this.selectedValue.charAt(9) == 8) {
          this.ShowModuleChoice = this.ShowModuleChoiceIfAsh
          this.IfRegularPc = false;
          this.IfAshPc = true;
          this.If_Task_Selct = false;
          this.Pmc = true;
          this.Pma = false;
          this.Pmb = false;
          this.Pmd = false;
          this.Pme = false;
          this.hlc = false;
          this.If_Task_Selct = this.Pmc;
          this.Select_Task = "PMC";
          this.ArraySize_Images_PerModule_PerTask_PerPc();
          break;

        }
        this.ShowModuleChoice = this.Modules.ModuleChoice;
        this.IfRegularPc = true;
        this.IfAshPc = false;
        this.If_Task_Selct = false;
        this.Pmc = true;
        this.Pma = false;
        this.Pmb = false;
        this.Pmd = false;
        this.Pme = false;
        this.hlc = false;
        this.If_Task_Selct = this.Pmc;
        this.Select_Task = "PMC"
        this.ArraySize_Images_PerModule_PerTask_PerPc();
        break;

      case "PMD":
        if (this.selectedValue.charAt(9) == 7 || this.selectedValue.charAt(9) == 8) {
          this.ShowModuleChoice = this.ShowModuleChoiceIfAsh;
          this.IfRegularPc = false;
          this.IfAshPc = true;
          this.If_Task_Selct = false;
          this.Pmd = true;
          this.Pmb = false;
          this.Pma = false;
          this.Pmc = false;
          this.Pme = false;
          this.hlc = false;
          this.If_Task_Selct = this.Pmd;
          this.Select_Task = "PMD";
          this.ArraySize_Images_PerModule_PerTask_PerPc();
          break;

        }
        this.ShowModuleChoice = this.Modules.ModuleChoice;
        this.IfRegularPc = true;
        this.IfAshPc = false;
        this.If_Task_Selct = false;
        this.Pmd = true;
        this.Pma = false;
        this.Pmb = false;
        this.Pmc = false;
        this.Pme = false;
        this.hlc = false;
        this.If_Task_Selct = this.Pmd;
        this.Select_Task = "PMD"
        this.ArraySize_Images_PerModule_PerTask_PerPc();
        break;

      case "PME":
        if (this.selectedValue.charAt(9) == 7 || this.selectedValue.charAt(9) == 8) {
          this.IfRegularPc = false;
          this.IfAshPc = false;
          alert("There is not pme in  ash pc");
          break;

        }
        this.ShowModuleChoice = this.Modules.ModuleChoice;
        this.IfRegularPc = true;
        this.IfAshPc = false;
        this.If_Task_Selct = false;
        this.Pme = true;
        this.Pma = false;
        this.Pmb = false;
        this.Pmc = false;
        this.Pmd = false;
        this.hlc = false;
        this.If_Task_Selct = this.Pme;
        this.Select_Task = "PME"
        this.ArraySize_Images_PerModule_PerTask_PerPc();
        break;

      case "HLC":
        if (this.selectedValue.charAt(9) == 7 || this.selectedValue.charAt(9) == 8) {
          this.ShowModuleChoice = this.ShowModuleChoiceIfAsh
          this.IfRegularPc = false;
          this.IfAshPc = true;
          this.If_Task_Selct = false;
          this.hlc = true;
          this.Pma = false;
          this.Pmb = false;
          this.Pmc = false;
          this.Pmd = false;
          this.Pme = false;
          this.If_Task_Selct = this.hlc;
          this.Select_Task = "HLC";
          this.ArraySize_Images_PerModule_PerTask_PerPc();
          break;

        }
        this.ShowModuleChoice = this.Modules.ModuleChoice;
        this.IfRegularPc = true;
        this.IfAshPc = false;
        this.If_Task_Selct = false;
        this.hlc = true;
        this.Pme = false;
        this.Pma = false;
        this.Pmb = false;
        this.Pmc = false;
        this.Pmd = false;
        this.If_Task_Selct = this.hlc;
        this.Select_Task = "HLC"
        this.ArraySize_Images_PerModule_PerTask_PerPc();
        break;
    }
  }

  public SaveToolValue(val: any) {
    this.selectedValue = val.target.value;
  }

  public async submit() {
      this.selectSubmit = true;
      this.VerifyToqrqueList = true;
      this.TorqueListArrayAPerTask.map(async (x) => {
      await this.imgService.UpdateTorqueIfNeeded(x);
      })
  }

  public torefrsh() {
    window.location.reload();
    this.ngOnInit();
  }

  public async StartPmPreperationFun() {
    this.preperation_choice = true;
    this.disassembly_choice = false;
    this.Assembly_choice = false;
    this.IfAskTorqueCheck = false;  
    this.Pm_Step = "PM's Preparations"
    this.i_Preperation = 1;
    this.ImageLocation = this.i_Preperation;   
    this.UploadActiveDataImage();  
  }

  public async StartdisAssembly_pmFun() {
    this.disassembly_choice = true;
    this.preperation_choice = false;
    this.Assembly_choice = false;
    this.IfAskTorqueCheck = false;
    this.Pm_Step = "Disassembly";
    this.i_disassembly = 1;  
    this.ImageLocation = this.i_disassembly;   
    this.UploadActiveDataImage();  

 }

  public async Assembly_pmFun() {
   if(this.VerifyToqrqueList == true)
   {
    this.Assembly_choice = true;
    this.disassembly_choice = false;
    this.preperation_choice = false;
    this.IfAskTorqueCheck = false;    
    this.Pm_Step = "Assembly"; 
    this.i_assembly=1;
    this.ImageLocation = this.i_assembly;   
    this.UploadActiveDataImage();  
   }
   else
   {
    this.Assembly_choice = false;
    alert("Pls select on Torque Value and fill and update check torque");
    return;
   }

  }

  public async UploadActiveDataImage()
  {
    if(this.ShowModuleChoice != null && this.Select_Task != null &&  this.Pm_Step != null && this.ImageLocation != null)
    {
    this.ArrayImages = await this.imgService.GetImageData(this.ShowModuleChoice);   
    this.ImageData = new ImageModel();
    this.ImageData.module = this.ShowModuleChoice;
    this.ImageData.task   = this.Select_Task;
    this.ImageData.pM_Step = this.Pm_Step;
    this.ImageData.imageLocation = this.ImageLocation;
    this.ImageChoiceTodescription =   this.ArrayImages.filter((x) => {
    return (x.task == this.ImageData.task && x.pM_Step == this.ImageData.pM_Step && x.imageLocation == this.ImageData.imageLocation)
  });
    this.Show_Images_detailes = this.ImageChoiceTodescription
return;
 }
}

public async UpdateTorquePerPart(part?: string)
{
  console.log(123)
  // this.TorqueCheckAndUpdate = await this.ServiceTorque.GetTorqueListPerModule(this.ShowModuleChoice)
  // this.TorqueCheckAndUpdate.filter((x) => {
  //   return x.pm == this.Select_Task
  // });
  // this.TorqueCheckAndUpdate.map((x) => {
  //   if(x.part == part)
  //   {
  //   this.showSelectTorque = x.torque;
  //   console.log(x);
  //   }
  // });
  // return;   
}

  public async NextImage() {
    if (this.preperation_choice == true && this.disassembly_choice == false && this.Assembly_choice == false) 
    {
      if(this.i_Preperation<this.ArraySizeOf_Images_Preperation.length)
      {
      this.i_Preperation++;
      this.ImageLocation = this.i_Preperation;
      this.UploadActiveDataImage();  
      this.Select_Preperation_Picture = "preperation" + this.i_Preperation;
      }
      else 
      { 
        this.i_Preperation =  this.ArraySizeOf_Images_Preperation.length;
        this.ImageLocation = this.i_Preperation;
        this.Select_Preperation_Picture = "preperation" + this.i_Preperation;
        alert("Preperation done");
        this.preperation_choice = false;
        this.Assembly_choice = false;
        this.disassembly_choice = false;
        return;
      }
   
    
    }
    if (this.disassembly_choice == true && this.preperation_choice == false && this.Assembly_choice == false) {
        
      if(this.i_disassembly<this.ArraySizeOf_Images_DisAssembly.length)
      {
      this.i_disassembly++;
      this.ImageLocation = this.i_disassembly;
      this.UploadActiveDataImage();  
      this.Select_DisAssembly_Picture = "dissassembly" + this.i_disassembly;
      }
      else
      { 
        this.i_disassembly =  this.ArraySizeOf_Images_DisAssembly.length;
        this.ImageLocation = this.i_disassembly;
        this.Select_DisAssembly_Picture = "dissassembly" + this.i_disassembly;
        alert("DisAssembly done");
        this.preperation_choice = false;
        this.Assembly_choice = false;
        this.disassembly_choice = false;
        return;
      }
      
            
    }

    if (this.Assembly_choice == true && this.preperation_choice == false && this.disassembly_choice == false) {

      if(this.i_assembly<this.ArraySizeOf_Images_Assembly.length)
      {
        this.i_assembly++;
        this.ImageLocation = this.i_assembly;
        this.UploadActiveDataImage();  
        this.Select_Assembly_Picture = "Assembly" + this.i_assembly;
      }

      else 
      { 
        this.i_assembly =  this.ArraySizeOf_Images_Assembly.length;
        this.ImageLocation = this.i_assembly;
        this.Select_Assembly_Picture = "Assembly" + this.i_assembly;
        alert("Assembly done");
        this.preperation_choice = false;
        this.Assembly_choice = false;
        this.disassembly_choice = false;
        return;
      }         
   }
  }

public async  BackImage() {
    if (this.preperation_choice == true && this.disassembly_choice == false && this.Assembly_choice == false) {
      if(this.i_Preperation == 1)
      {
        this.i_Preperation = 1;
        this.ImageLocation = this.i_Preperation;
        this.UploadActiveDataImage();  
        this.Select_Preperation_Picture = "preperation" + this.i_Preperation    
        alert("This is the first picture so not choice to back");
        return;
      }
      else
      {
      this.i_Preperation--;
      this.ImageLocation = this.i_Preperation;
      this.UploadActiveDataImage();  
      this.Select_Preperation_Picture = "preperation" + this.i_Preperation
      }
    }

    if (this.disassembly_choice == true && this.preperation_choice == false && this.Assembly_choice == false) {
      if(this.i_disassembly == 1)
      {
        this.i_disassembly = 1;
        this.ImageLocation = this.i_disassembly;
        this.UploadActiveDataImage();  
        this.Select_DisAssembly_Picture = "dissassembly" + this.i_disassembly
        alert("This is the first picture so not choice to back");
      }
      else
      {
       this.i_disassembly--;
       this.ImageLocation = this.i_disassembly;
       this.UploadActiveDataImage();  
       this.Select_DisAssembly_Picture = "dissassembly" + this.i_disassembly
      }
    }

    if (this.Assembly_choice == true && this.preperation_choice == false && this.disassembly_choice == false) {
      if(this.i_assembly == 1)
      {
        this.i_assembly = 1;
        this.ImageLocation = this.i_assembly;
        this.UploadActiveDataImage();  
        this.Select_Assembly_Picture = "Assembly" + this.i_assembly;
        alert("This is the first picture so not choice to back");
      }
      else
      {
        this.i_assembly--;
        this.ImageLocation = this.i_assembly;
        this.UploadActiveDataImage();  
        this.Select_Assembly_Picture = "Assembly" + this.i_assembly;
      }
    }
  }

  ArraySize_Images_PerModule_PerTask_PerPc() {
    switch (this.Select_Task, this.ShowModuleChoice) {
      case "PMA" && "GTOcu":
        this.ArraySizeOf_Images_Preperation = new Array<any>(7);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(11);
        this.ArraySizeOf_Images_Assembly = new Array<any>(33);
        break;
      case "PMB" && "GTOcu":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTOcu":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTOcu":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PME" && "GTOcu":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "HLC" && "GTOcu":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;



      case "PMA" && "GTOcb":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(4);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
      case "PMB" && "GTOcb":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTOcb":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTOcb":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PME" && "GTOcb":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "HLC" && "GTOcb":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;


      case "PMA" && "GTAcv":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(4);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
      case "PMB" && "GTAcv":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTAcv":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTAcv":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PME" && "GTAcv":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "HLC" && "GTAcv":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMA" && "GTAcvAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(4);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
      case "PMB" && "GTAcvAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTAcvAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTAcvAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      // case "PME" && "GTAcvAsh":
      //   this.ArraySizeOf_Images_Preperation = new Array<any>(4);
      //   this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
      //   this.ArraySizeOf_Images_Assembly    = new Array<any>(4);
      // break;

      case "HLC" && "GTAcvAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;


      case "PMA" && "GTAcs":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(4);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
      case "PMB" && "GTAcs":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTAcs":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTAcs":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PME" && "GTAcs":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "HLC" && "GTAcs":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;


      case "PMA" && "GTAcsAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(4);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
      case "PMB" && "GTAcsAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTAcsAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTAcsAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      // case "PME" && "GTAcsAsh":
      //   this.ArraySizeOf_Images_Preperation = new Array<any>(4);
      //   this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
      //   this.ArraySizeOf_Images_Assembly    = new Array<any>(4);
      // break;

      case "HLC" && "GTAcsAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;



      case "PMA" && "GTAce":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(4);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
      case "PMB" && "GTAce":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTAce":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTAce":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PME" && "GTAce":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "HLC" && "GTAce":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;


      case "PMA" && "GTAceAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(4);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
      case "PMB" && "GTAceAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(6);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(5);
        break;
      case "PMC" && "GTAceAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      case "PMD" && "GTAceAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;

      // case "PME" && "GTAceAsh":
      //   this.ArraySizeOf_Images_Preperation = new Array<any>(4);
      //   this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
      //   this.ArraySizeOf_Images_Assembly    = new Array<any>(4);
      // break;     

      case "HLC" && "GTAceAsh":
        this.ArraySizeOf_Images_Preperation = new Array<any>(4);
        this.ArraySizeOf_Images_DisAssembly = new Array<any>(3);
        this.ArraySizeOf_Images_Assembly = new Array<any>(4);
        break;
    }
  }

}
