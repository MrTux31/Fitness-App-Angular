import { Component, inject, Input } from '@angular/core';
import { Exercice } from '../../../core/models/exercice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciceService } from '../../../core/service/exercice-service';

@Component({
  selector: 'app-routine-exercices',
  imports: [RouterLink],
  templateUrl: './routine-exercices.html',
  styleUrl: './routine-exercices.css',
})
export class RoutineExercices {
  @Input()
  exercices!: Exercice[];


  private exercieService = inject(ExerciceService)
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  public routineId!: number;

  ngOnInit() {
    this.routineId = +this.route.snapshot.params['id']; // récupère l'id de la routine sur laquelle on est
  }

  onSupprime(exercice : Exercice): void {
    if (confirm('Voulez-vous réellement supprimer cet exercice ?')) {
      this.exercieService.deleteExercice(exercice).subscribe({
        //Suppression de l'exercice
        next: (exercice) => {
          this.router.navigateByUrl('/').then(() => this.router.navigateByUrl('/routines/'+this.routineId));
        },
      });
    }
  }
}
