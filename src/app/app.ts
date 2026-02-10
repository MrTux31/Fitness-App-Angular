import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './shared/menu/menu';
import { Chargement, StatusChargement } from "./shared/alert/chargement/chargement";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Chargement],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-todo');



  ngOnInit(){
    
  }
}
