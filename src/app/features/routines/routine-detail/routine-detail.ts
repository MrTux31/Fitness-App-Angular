import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Routine, Status } from '../../../core/models/routine';
import { RoutineService } from '../../../core/service/routine-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExerciceList } from '../../exercices/exercice-list/exercice-list';
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
  public readonly StatusChargement = StatusChargement;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private routineService = inject(RoutineService);
  private exerciceService = inject(ExerciceService);

  public routine = signal<Routine>(new Routine());
  public statusChargement = signal<StatusChargement>(StatusChargement.CHARGEMENT);

  private exercices: Exercice[] = [];
  public idRoutine = 0;

  ngOnInit() {
    //Récupérer l'id de la routine à afficher
    this.idRoutine = this.route.snapshot.params['id'];
    this.recupererRoutine(this.idRoutine);
    this.recupererExercices(this.idRoutine);
  }

  recupererRoutine(id: number) {
    this.statusChargement.set(StatusChargement.CHARGEMENT);
    this.routineService.getRoutine(id).subscribe({
      next: (routine) => {
        this.routine.set(routine);
        this.statusChargement.set(StatusChargement.SUCCES);
      },
      error: (err) => {
        this.router.navigateByUrl('/');
      },
    });
  }

  recupererExercices(idRoutine: number) {
    this.statusChargement.set(StatusChargement.CHARGEMENT);
    this.exerciceService.getExercicesRoutine(idRoutine).subscribe({
      next: (exercices) => {
        this.exercices = exercices;
        this.statusChargement.set(StatusChargement.SUCCES);
      },
      error: (err) => this.statusChargement.set(StatusChargement.ERREUR),
    });
  }


  //On met la routine innactif
  changeStatusRoutine() {
    this.routineService.toggleStatus(this.routine()).subscribe({
      next: (routine) => this.routine.set(routine),
    });
  }

  onSupprime(): void {
    if (confirm('Voulez-vous réellement supprimer cette routine ?')) {
      this.supprimerRoutine();
    }
  }

  

  /**
   * Permet de supprimer tous les exercices liés à la routine PUIS la routine
   */

  supprimerRoutine() {
    if (this.exercices.length == 0) {
      this.routineService.deleteRoutine(this.routine()).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: () => this.router.navigateByUrl('/'),
      });
    } else {
      this.exerciceService.deleteExercice(this.exercices[0]).subscribe({
        next: () => {
          this.exercices.shift();
          this.supprimerRoutine();
        },
      });
    }
  }
}
