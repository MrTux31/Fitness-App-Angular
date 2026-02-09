import { Component, Input } from '@angular/core';
import { Exercice } from '../../../core/models/exercice';

@Component({
  selector: 'app-routine-exercices',
  imports: [],
  templateUrl: './routine-exercices.html',
  styleUrl: './routine-exercices.css',
})
export class RoutineExercices {

  @Input()
  exercices!: Exercice []

}
