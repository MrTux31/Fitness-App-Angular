import { Component, inject, signal } from '@angular/core';
import { RoutineList } from "../routines/routine-list/routine-list";
import { Routine, Status } from '../../core/models/routine';
import { Chargement, StatusChargement } from '../../shared/alert/chargement/chargement';
import { RoutineService } from '../../core/service/routine-service';


@Component({
  selector: 'app-accueil',
  imports: [RoutineList, Chargement],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

  public readonly Status = Status
  public readonly StatusChargement = StatusChargement

  private routineService = inject(RoutineService)
  public chargement = StatusChargement.CHARGEMENT
  public routines = signal<Routine[]>([])

  ngOnInit(){
    this.chargerRoutines()
  }

  private chargerRoutines() {
    this.chargement = StatusChargement.CHARGEMENT
    //On récupère la liste des routines
    this.routineService.getRoutines().subscribe({
      next: (listeRoutines) => {
        this.chargement = StatusChargement.SUCCES

        this.routines.set(listeRoutines);
      },
      error: () => this.chargement = StatusChargement.ERREUR


    });
}

}
