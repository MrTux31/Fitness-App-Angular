import { Component, inject, Input } from '@angular/core';
import { Exercice } from '../../../core/models/exercice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-routine-exercices',
  imports: [RouterLink],
  templateUrl: './routine-exercices.html',
  styleUrl: './routine-exercices.css',
})
export class RoutineExercices {

  @Input()
  exercices!: Exercice []

  private route = inject(ActivatedRoute);
  public routineId!: number;

ngOnInit() {
  this.routineId = +this.route.snapshot.params['id']; // récupère l'id de la routine sur laquelle on est
}

}
