import { Component, inject, Input } from '@angular/core';
import { RoutineService } from '../../../core/service/routine-service';
import { Router } from '@angular/router';
import { Routine, Status } from '../../../core/models/routine';

@Component({
  selector: 'app-routine-item',
  imports: [],
  templateUrl: './routine-item.html',
  styleUrl: './routine-item.css',
})
export class RoutineItem {
  routineService = inject(RoutineService)
  router = inject(Router)

  //Exposition de l'enum
  public readonly Status = Status

  @Input()
  public routine: Routine = new Routine()








}
