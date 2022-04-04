import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatModel } from 'src/app/Models/ChatModel';
import { ContactArray } from 'src/app/Models/ContactArray';
import { ChatService } from 'src/app/Services/ChatService';
import { ContactsOnlineService } from 'src/app/Services/ContactsOnlineService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LayoutComponent implements OnInit {

  
  constructor() { }

    ngOnInit(): void {
    }
 

}
