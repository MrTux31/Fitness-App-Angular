import { Component, inject, signal } from '@angular/core';
import { RoutineList } from "../routines/routine-list/routine-list";
import { Routine, Status } from '../../core/models/routine';
import { Chargement, StatusChargement } from '../../shared/alert/chargement/chargement';
import { RoutineService } from '../../core/service/routine-service';


@Component({
  selector: 'app-accueil',
  imports: [RoutineList, Chargement],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

  public readonly Status = Status
  public readonly StatusChargement = StatusChargement



}
