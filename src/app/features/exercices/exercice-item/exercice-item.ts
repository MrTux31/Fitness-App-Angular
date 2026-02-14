import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Exercice } from '../../../core/models/exercice';
import { Router, RouterLink } from '@angular/router';
import { ExerciceService } from '../../../core/service/exercice-service';

@Component({
  selector: 'app-exercice-item',
  imports: [RouterLink],
  templateUrl: './exercice-item.html',
  styleUrl: './exercice-item.css',
})
export class ExerciceItem {

  @Input()
  exercice : Exercice = new Exercice()
  
  @Input()
  exerciceStatus : any //Un objet complet contenant les status des exercices, provient du local storage. Fourni par exercice service à exercice list

  @Output()
  exerciceUpdated = new EventEmitter()

  exerciceService = inject(ExerciceService);
  router = inject(Router)

  //Déclencher le changement de status sur l'exercice
  toggleExerciceStatus(exercice : Exercice){
    this.exerciceService.toggleExerciceStatus(exercice)
    this.exerciceUpdated.emit() //Previes le parent pour refresh la liste
  }

  onSupprime(): void {
      if (confirm('Voulez-vous réellement supprimer cet exercice ?')) {
        this.exerciceService.deleteExercice(this.exercice).subscribe({
          //Suppression de l'exercice
          next: (exercice) => {
            this.router
              .navigateByUrl('/')
              .then(() => this.router.navigateByUrl('/routines/' + this.exercice.routineId));
          },
        });
      }
    }

}
