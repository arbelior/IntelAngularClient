import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatModel } from 'src/app/Models/ChatModel';
import { ContactArray } from 'src/app/Models/ContactArray';
import { ChatService } from 'src/app/Services/ChatService';
import { ContactsOnlineService } from 'src/app/Services/ContactsOnlineService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class HeaderComponent implements OnInit {
constructor() { }
   ngOnInit(): void { }

}
