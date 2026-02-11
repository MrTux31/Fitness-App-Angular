import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineService } from '../../../core/service/routine-service';
import { Routine, Status } from '../../../core/models/routine';
import { RoutineItem } from '../routine-item/routine-item';
import { StatusChargement, Chargement } from '../../../shared/alert/chargement/chargement';

@Component({
  selector: 'app-routine-list',
  imports: [RoutineItem, Chargement],
  templateUrl: './routine-list.html',
  styleUrl: './routine-list.css',
})
export class RoutineList {

  @Input()
  //Variable optionnelle pour filtrer, soit reçue de^puis le html, soit undefined.
  triStatus?: Status;

  
  //Tableau qui va contenir les routines
  @Input() public routines = signal<Routine[]>([]);


  @Output() routineChanged = new EventEmitter<void>();


  routineUpdated() {
    this.routineChanged.emit(); // remonte encore un niveau
  }

 


}
