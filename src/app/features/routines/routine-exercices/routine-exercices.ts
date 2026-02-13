import { Component, inject, Input, signal } from '@angular/core';
import { Exercice } from '../../../core/models/exercice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciceService } from '../../../core/service/exercice-service';
import { Chargement, StatusChargement } from '../../../shared/alert/chargement/chargement';

@Component({
  selector: 'app-routine-exercices',
  imports: [RouterLink,Chargement],
  templateUrl: './routine-exercices.html',
  styleUrl: './routine-exercices.css',
})
export class RoutineExercices {

  @Input()
  public routineId: number = 0;

  private exercieService = inject(ExerciceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  exercices = signal<Exercice[]>([]);

  public readonly StatusChargement = StatusChargement
  statusChargement = signal<StatusChargement>(StatusChargement.SUCCES)

  exerciceService = inject(ExerciceService);
  ngOnInit() {
    this.recupererExercices(this.routineId);
  }

  onSupprime(exercice: Exercice): void {
    if (confirm('Voulez-vous réellement supprimer cet exercice ?')) {
      this.exercieService.deleteExercice(exercice).subscribe({
        //Suppression de l'exercice
        next: (exercice) => {
          this.router
            .navigateByUrl('/')
            .then(() => this.router.navigateByUrl('/routines/' + this.routineId));
        },
      });
    }
  }

  recupererExercices(idRoutine: number) {
    this.statusChargement.set(StatusChargement.CHARGEMENT)
    this.exerciceService.getExercicesRoutine(idRoutine).subscribe({
      next: (exercices) => {
        this.exercices.set(exercices);
        this.statusChargement.set(StatusChargement.SUCCES)

      },
      error: (err) => this.statusChargement.set(StatusChargement.ERREUR)

    });
  }
}
