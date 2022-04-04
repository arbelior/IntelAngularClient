import { Component, Injectable, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ModulesComponent } from '../modules/modules.component';

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class PMComponent implements OnInit {

  constructor(public Home: HomeComponent, public module: ModulesComponent) { }

  ngOnInit(): void {
  }

}
