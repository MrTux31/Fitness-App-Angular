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
  public readonly StatusChargement = StatusChargement

  @Input()
  public routineId: number = 0;

  public exerciceService = inject(ExerciceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  exercices = signal<Exercice[]>([]);
  statusChargement = signal<StatusChargement>(StatusChargement.SUCCES)
 
  //Va stocker les infos du local storage pour savoir les exos faits ou non faits
  exerciceStatus : any


  ngOnInit() {
    this.recupererExercices(this.routineId);
    this.getExerciceStatus()
  }

  onSupprime(exercice: Exercice): void {
    if (confirm('Voulez-vous réellement supprimer cet exercice ?')) {
      this.exerciceService.deleteExercice(exercice).subscribe({
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

  //Va chercher dans le local storage pour savoir les exos qui ne sont pas faits
    getExerciceStatus(){
      this.exerciceStatus = this.exerciceService.getExerciceStatus(this.routineId)
  }

  //Déclencher le changement de status sur l'exercice
  toggleExerciceStatus(exercice : Exercice){
    this.exerciceService.toggleExerciceStatus(exercice)
    this.getExerciceStatus()
  }

  //Permet de changer d'un coup tous les status des exercices de la routine : tout "fait" ou tout "non fait"
  changeAllExerciceStatus(status : boolean){
    this.exerciceService.changeAllExerciceStatus(status, this.exercices())
    this.getExerciceStatus()
  }

}
