import { Component, inject, signal } from '@angular/core';
import { RoutineList } from "../routines/routine-list/routine-list";
import { Routine, Status } from '../../core/models/routine';
import { Chargement, StatusChargement } from '../../shared/alert/chargement/chargement';
import { RoutineService } from '../../core/service/routine-service';
import { FormsModule } from "@angular/forms";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-accueil',
  imports: [RoutineList, FormsModule, RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {

  public readonly Status = Status
  public readonly StatusChargement = StatusChargement

  private routineService = inject(RoutineService);
  
  public listeRoutines = signal<Routine[]>([]);

  triStatus?  = Status.ACTIVE

  ngOnInit(){
    this.chargerRoutines()
  }

  public chargerRoutines() {
      //On récupère la liste des routines
      this.routineService.getRoutines({status: this.triStatus}).subscribe({
        next: (listeRoutines) => {

          this.listeRoutines.set(listeRoutines);
        },

      });
    }

}
