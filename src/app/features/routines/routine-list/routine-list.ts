import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Routine, Status } from '../../../core/models/routine';
import { RoutineItem } from '../routine-item/routine-item';
import { Fortune } from "../../../shared/fortune/fortune";

@Component({
  selector: 'app-routine-list',
  imports: [RoutineItem, Fortune],
  templateUrl: './routine-list.html',
  styleUrl: './routine-list.css',
})
export class RoutineList {

  @Input()
  //Variable optionnelle pour filtrer, soit reçue de^puis le html, soit undefined.
  triStatus?: Status;


  //Tableau qui va contenir les routines
  @Input() public routines = signal<Routine[]>([]);


  @Output() routineChanged = new EventEmitter<number>();


  routineUpdated(id : number) {
    this.routineChanged.emit(id); // remonte encore un niveau
  }




}
