import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CCCComponent } from './components/ccc/ccc.component';
import { CommentsPageComponent } from './components/comments-page/comments-page.component';
import { GASAdjComponent } from './components/gas-adj/gas-adj.component';
import { GasAfterAdjComponent } from './components/gas-after-adj/gas-after-adj.component';
import { GasfailedComponent } from './components/gasfailed/gasfailed.component';
import { GaslistComponent } from './components/gaslist/gaslist.component';
import { HomeComponent } from './components/home/home.component';
import { MacroComponent } from './components/macro/macro.component';
import { MaintanancePMComponent } from './components/maintanance-pm/maintanance-pm.component';
import { PMComponent } from './components/pm/pm.component';
import { ResumeComponent } from './components/resume/resume.component';
import { RFAComponent } from './components/rfa/rfa.component';
import { ShowTasklistTableComponent } from './components/show-tasklist-table/show-tasklist-table.component';

const routes: Routes = [
  {path: "RFA", component: RFAComponent  },
  {path: "GAS-Adj", component: GASAdjComponent},
  {path: "Macro", component: MacroComponent},
  {path: "PM", component: PMComponent},
  {path: "UpdateData", component: AddTaskComponent},
  {path: "RESUME", component: ResumeComponent},
  {path: "Gas-List", component: GaslistComponent},
  {path: "Gas-failed", component: GasfailedComponent},
  {path: "Gas-After_Adj", component: GasAfterAdjComponent},
  {path: "TaskList", component: ShowTasklistTableComponent},
  {path: "Comments", component: CommentsPageComponent},
  {path: "CCC", component: CCCComponent},
  {path: "Maintanance_PM", component: MaintanancePMComponent},
  {path: "TO_Add_User", component: AddUserComponent},
  {path: "Home", component: HomeComponent },
  {path: "", redirectTo: "/Home", pathMatch: "full"   },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
