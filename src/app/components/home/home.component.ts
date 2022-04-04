import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatModel } from 'src/app/Models/ChatModel';
import { ContactArray } from 'src/app/Models/ContactArray';
import { ChatService } from 'src/app/Services/ChatService';
import { ContactsOnlineService } from 'src/app/Services/ContactsOnlineService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {

  public StartIfdate : Date = new Date();
  public contactsArray : ContactArray [] = [];
  public GetAllMessages : ChatModel   [] = [];
  public if_deleteAction = true;
  public saveTime_Whendelete: any;

  constructor(public Service_contacts: ContactsOnlineService, public route: Router,
    public ChatService: ChatService ) { }

     ngOnInit():void {
    }
     
    }


