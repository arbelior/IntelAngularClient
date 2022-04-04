import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatModel } from './Models/ChatModel';
import { ContactArray } from './Models/ContactArray';
import { ChatService } from './Services/ChatService';
import { ContactsOnlineService } from './Services/ContactsOnlineService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent {

  title = 'IntelProject';
  
  constructor(public Service_contacts: ContactsOnlineService, public route: Router,
    public ChatService: ChatService,public Menu: MenuComponent ) { }
    
  
 ngOnInit():void
{  
    
}

}
