import { Component, inject, signal } from '@angular/core';
import { Routine } from '../../../core/models/routine';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RoutineService } from '../../../core/service/routine-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chargement, StatusChargement } from '../../../shared/alert/chargement/chargement';
@Component({
  selector: 'app-routine-edit',
  imports: [ FormsModule, RouterLink,Chargement],
  templateUrl: './routine-edit.html',
  styleUrl: './routine-edit.css',
})
export class RoutineEdit {
  public routine = signal<Routine>(new Routine());
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  routineService = inject(RoutineService);

  public readonly StatusChargement = StatusChargement
  statusChargement = signal<StatusChargement>(StatusChargement.SUCCES)


  ngOnInit(): void {
    //Récupérer l'id de la routine à afficher
    const id = this.route.snapshot.params['id'];

    //Cas modification, on pré charge la routine
    if(id){
      this.chargerRoutine(id);
    }
  }

  chargerRoutine(id: number) {
    this.statusChargement.set(StatusChargement.CHARGEMENT)
    this.routineService.getRoutine(id).subscribe({
      next: (routine) => {
        this.routine.set(routine);
        this.statusChargement.set(StatusChargement.SUCCES);
      },
      error:()=> this.statusChargement.set(StatusChargement.ERREUR)

    });
  }

  onSubmit(formulaire: NgForm) {
    if (formulaire.valid) {
      //Cas modification
      if (this.routine().id) {
        this.routineService.updateRoutine(this.routine()).subscribe({
          next: () => this.router.navigateByUrl('/routines/' + this.routine().id),
          error: () => this.router.navigateByUrl('/routines'),
        });
      }
      //Cas création
      else {
        this.routineService.addRoutine(this.routine()).subscribe({
          next: () => this.router.navigateByUrl('/routines'),
          error: () => this.router.navigateByUrl('/routines'),
        });
      }
    }
  }
}
