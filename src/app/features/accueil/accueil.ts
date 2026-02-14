import { Component, inject, signal } from '@angular/core';
import { RoutineList } from '../routines/routine-list/routine-list';
import { Routine, Status } from '../../core/models/routine';
import { Chargement, StatusChargement } from '../../shared/alert/chargement/chargement';
import { RoutineService } from '../../core/service/routine-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [RoutineList, FormsModule, RouterLink, Chargement],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  public readonly Status = Status;
  public readonly StatusChargement = StatusChargement;
  router = inject(Router);
  private routineService = inject(RoutineService);
 public statusChargement = signal<StatusChargement>(StatusChargement.CHARGEMENT);
  public listeRoutines = signal<Routine[]>([]);


  private toUpdateRoutines: Routine[] = [];
  triStatus? = Status.ACTIVE;
  filtre: 'asc' | 'desc' = 'desc'; //Filtre sur la date de création (le type de la var est soit 'asc' soit 'desc')

  ngOnInit() {
    this.chargerRoutines();
  }

  public chargerRoutines() {
    this.statusChargement.set(StatusChargement.CHARGEMENT);
    //On récupère la liste des routines
    this.routineService.getRoutines({ status: this.triStatus }, {champ: "creationDate", ordre: this.filtre}).subscribe({
      next: (listeRoutines) => {
        this.listeRoutines.set(listeRoutines)
        this.statusChargement.set(StatusChargement.SUCCES);

      },
      error:()=> this.statusChargement.set(StatusChargement.ERREUR)

    });
  }

  public supprimerRoutineListe(id : number){

    this.listeRoutines.update(
      (ancienneListe) => {;
        //Si on a un status de tri actif on supprime la routine de la liste grâce a son id
        if(this.triStatus){
          return ancienneListe.filter((r) => r.id != id);
        }
        //Sinon on affiche juste l'ancienne liste
        return ancienneListe
      }
    )



  }

  /**
   * Permet de relancer toutes les routines d'un coup (passsage de inactive à active)
   */
  public resetAll() {
    this.routineService.getRoutines().subscribe({
      next: (routines) => {
        this.toUpdateRoutines = routines.filter((routine) => routine.status != Status.ACTIVE);
        this.updateRoutine();
      },
    });
  }

  private updateRoutine() {
    if (this.toUpdateRoutines.length == 0) {
      this.chargerRoutines();
    } else {
      this.toUpdateRoutines[0].status = Status.ACTIVE;
      this.routineService.updateRoutine(this.toUpdateRoutines[0]).subscribe({
        next: (routine) => {
          this.toUpdateRoutines.shift();
          this.updateRoutine();
        },
      });
    }
  }
}
