import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Routine, Status } from '../../../core/models/routine';
import { RoutineService } from '../../../core/service/routine-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciceList } from "../../exercices/exercice-list/exercice-list";
import { Exercice } from '../../../core/models/exercice';
import { ExerciceService } from '../../../core/service/exercice-service';
import { Chargement, StatusChargement } from '../../../shared/alert/chargement/chargement';

@Component({
  selector: 'app-routine-detail',
  imports: [NgClass, TitleCasePipe, ExerciceList, RouterLink, Chargement],
  templateUrl: './routine-detail.html',
  styleUrl: './routine-detail.css',
})
export class RoutineDetail {
  public readonly Status = Status;
  public readonly StatusChargement = StatusChargement
  public routine = signal<Routine>(new Routine());
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public statusChargement = signal<StatusChargement>(StatusChargement.CHARGEMENT);


  private routineService = inject(RoutineService);
  private exerciceService = inject(ExerciceService);

  public exercices = signal<Exercice[]>([]);
  public idRoutine = 0

  ngOnInit() {
    //Récupérer l'id de la routine à afficher
    this.idRoutine = this.route.snapshot.params['id'];
    this.recupererRoutine(this.idRoutine);
  }

  recupererRoutine(id: number) {
    this.statusChargement.set(StatusChargement.CHARGEMENT)
    this.routineService.getRoutine(id).subscribe({
      next: (routine) => {
        this.routine.set(routine)
        this.statusChargement.set(StatusChargement.SUCCES)

      },
      error: (err) => {this.router.navigateByUrl('/taches')
      },
    });
  }

  onSupprime(): void {
    if (confirm('Voulez-vous réellement supprimer cette routine ?')) {
      this.routineService.deleteRoutine(this.routine()).subscribe({
        next: (routine) => {

          //On suppprime les exercices liés à la routine
          this.supprimerExercicesRoutine()

          this.router
            .navigateByUrl('/')
            .then(() => this.router.navigateByUrl('/routines/' + this.routine().id));
        },
      });
    }
  }

  //On met la routine innactif
  changeStatusRoutine(){
    this.routineService.toggleStatus(this.routine()).subscribe({
      next:(routine)=> this.routine.set(routine)
    })
  }

  /**
   * Permet de supprimer tous les exercices liés à la routine
   */
  supprimerExercicesRoutine(){
    for(const exercice of this.exercices()){
      this.exerciceService.deleteExercice(exercice).subscribe()
    }
  }
}
