import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { RFAComponent } from './components/rfa/rfa.component';
import { GASAdjComponent } from './components/gas-adj/gas-adj.component';
import { MacroComponent } from './components/macro/macro.component';
import { PMComponent } from './components/pm/pm.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ModulesComponent } from './components/modules/modules.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GaslistComponent } from './components/gaslist/gaslist.component';
import { GasfailedComponent } from './components/gasfailed/gasfailed.component';
import { GasAfterAdjComponent } from './components/gas-after-adj/gas-after-adj.component';
import { TimePipe } from './pipe/time.pipe';
import { ShowTasklistTableComponent } from './components/show-tasklist-table/show-tasklist-table.component';
import { CommentsPageComponent } from './components/comments-page/comments-page.component';
import { CCCComponent } from './components/ccc/ccc.component';
import { AuthorizatioAlarmComponent } from './components/authorizatio-alarm/authorizatio-alarm.component';
import { MaintanancePMComponent } from './components/maintanance-pm/maintanance-pm.component';
import { AddUserComponent } from './components/add-user/add-user.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LayoutComponent,
    MenuComponent,
    RFAComponent,
    GASAdjComponent,
    MacroComponent,
    PMComponent,
    AddTaskComponent,
    ResumeComponent,
    ModulesComponent,
    GaslistComponent,
    GasfailedComponent,
    GasAfterAdjComponent,
    TimePipe,
    ShowTasklistTableComponent,
    CommentsPageComponent,
    CCCComponent,
    AuthorizatioAlarmComponent,
    MaintanancePMComponent,
    AddUserComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
