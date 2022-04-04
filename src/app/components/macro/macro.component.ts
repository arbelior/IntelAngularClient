import { Component, Injectable, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.component.html',
  styleUrls: ['./macro.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MacroComponent implements OnInit {

  constructor(public Home: HomeComponent) { }

  ngOnInit(): void {
  }

}
