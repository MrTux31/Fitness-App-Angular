import { Component } from '@angular/core';
import { RoutineList } from "../routines/routine-list/routine-list";
import { Status } from '../../core/models/routine';

@Component({
  selector: 'app-accueil',
  imports: [RoutineList],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

  public readonly Status = Status
}
