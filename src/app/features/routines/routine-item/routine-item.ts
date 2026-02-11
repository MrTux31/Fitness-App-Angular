import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RoutineService } from '../../../core/service/routine-service';
import { Router, RouterLink } from '@angular/router';
import { Routine, Status } from '../../../core/models/routine';
import { NgClass, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-routine-item',
  imports: [NgClass, TitleCasePipe, RouterLink],
  templateUrl: './routine-item.html',
  styleUrl: './routine-item.css',
})
export class RoutineItem {
  routineService = inject(RoutineService);
  router = inject(Router);

  //Exposition de l'enum
  public readonly Status = Status;

  public isRemoving = false; //Permet de savoir si on met la routine en innactif (on la check)

  @Input()
  public routine!: Routine;

  @Input() triStatus?: Status;

  //On emet un event de sortie pour avertir si la routine est modifiée
  @Output()
  routineUpdated = new EventEmitter<void>();

  //On met la routine innactif
  changerStatusRoutine() {
    // si le filtre est sur "Toutes", pas d'animation
    const doitAnimer = this.triStatus != undefined;

    if (doitAnimer) {
      this.isRemoving = true; // lance l'animation
    }

    this.routineService.toggleStatus(this.routine).subscribe({
      next: () => {
        //On prévient le parent que la routine a été mise à jour (pour refresh la liste)

        //On met un petit délais avant de prévenir le parent de recharger la liste
        setTimeout(() => {
          this.routineUpdated.emit(); // parent peut recharger la liste
        }, 300);
      },
    });
  }
}
