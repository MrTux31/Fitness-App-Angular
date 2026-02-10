import { Component, inject, signal } from '@angular/core';
import { Routine } from '../../../core/models/routine';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RoutineService } from '../../../core/service/routine-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-routine-edit',
  imports: [NgClass, FormsModule, RouterLink],
  templateUrl: './routine-edit.html',
  styleUrl: './routine-edit.css',
})
export class RoutineEdit {
  public routine = signal<Routine>(new Routine());
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  routineService = inject(RoutineService);

  ngOnInit(): void {
    //Récupérer l'id de la routine à afficher
    const id = this.route.snapshot.params['id'];
    
    //Cas modification, on pré charge la routine
    if(id){
      this.chargerRoutine(id);
    }
  }

  chargerRoutine(id: number) {
    this.routineService.getRoutine(id).subscribe({
      next: (routine) => {
        this.routine.set(routine);
      },
    });
  }

  onSubmit(formulaire: NgForm) {
    if (formulaire.valid) {
      //Cas modification
      if (this.routine()!.id) {
        this.routineService.updateRoutine(this.routine()!).subscribe({
          next: () => this.router.navigateByUrl('/routines/' + this.routine()!.id),
          error: () => this.router.navigateByUrl('/routines'),
        });
      }
      //Cas création
      else {
        this.routineService.addRoutine(this.routine()!).subscribe({
          next: () => this.router.navigateByUrl('/routines/' + this.routine()!.id),
          error: () => this.router.navigateByUrl('/routines'),
        });
      }
    }
  }
}
