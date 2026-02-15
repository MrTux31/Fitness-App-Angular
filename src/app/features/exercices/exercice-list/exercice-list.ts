import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Exercice } from '../../../core/models/exercice';
import { ExerciceService } from '../../../core/service/exercice-service';
import { Chargement, StatusChargement } from '../../../shared/alert/chargement/chargement';
import { ExerciceItem } from '../exercice-item/exercice-item';

@Component({
  selector: 'app-exercice-list',
  imports: [Chargement,ExerciceItem],
  templateUrl: './exercice-list.html',
  styleUrl: './exercice-list.css',
})
export class ExerciceList {
  public readonly StatusChargement = StatusChargement

  @Input()
  public routineId: number = 0;
  

  public exerciceService = inject(ExerciceService);
  exercices = signal<Exercice[]>([]);
  statusChargement = signal<StatusChargement>(StatusChargement.SUCCES)
  
  //infos à afficher dans la banière de la liste des exos
  nbRepetitionTotales : number = 0
  poidsTotal : number = 0

  //Va stocker les infos du local storage pour savoir les exos faits ou non faits
  exerciceStatus : any


  ngOnInit() {
    this.recupererExercices(this.routineId);
    this.getExerciceStatus()
  }

  

  recupererExercices(idRoutine: number) {
    this.statusChargement.set(StatusChargement.CHARGEMENT)
    this.exerciceService.getExercicesRoutine(idRoutine).subscribe({
      next: (exercices) => {
        this.exercices.set(exercices)
        this.calculerPoidsEtRepetitions()
        this.statusChargement.set(StatusChargement.SUCCES)
      },
      error: (err) => this.statusChargement.set(StatusChargement.ERREUR)

    });

    
  }

  calculerPoidsEtRepetitions(){
    for(const exercice of this.exercices()){
      this.nbRepetitionTotales += exercice.repetitions
      this.poidsTotal += exercice.weight
    }
  }


  //Va chercher dans le local storage pour savoir les exos qui ne sont pas faits
    getExerciceStatus(){
      this.exerciceStatus = this.exerciceService.getExerciceStatus(this.routineId)
    }


  //Permet de changer d'un coup tous les status des exercices de la routine : tout "fait" ou tout "non fait"
  changeAllExerciceStatus(status : boolean){
    this.exerciceService.changeAllExerciceStatus(status, this.exercices())
    this.getExerciceStatus()
  }

}
