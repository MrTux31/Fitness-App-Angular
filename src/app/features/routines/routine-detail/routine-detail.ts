import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Routine, Status } from '../../../core/models/routine';
import { RoutineService } from '../../../core/service/routine-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoutineExercices } from "../routine-exercices/routine-exercices";
import { Exercice } from '../../../core/models/exercice';
import { ExerciceService } from '../../../core/service/exercice-service';

@Component({
  selector: 'app-routine-detail',
  imports: [NgClass, TitleCasePipe, RoutineExercices, RouterLink],
  templateUrl: './routine-detail.html',
  styleUrl: './routine-detail.css',
})
export class RoutineDetail {

  public readonly Status = Status
  public routine = signal<Routine|null>(null)
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private routineService = inject(RoutineService)
  private exerciceService = inject(ExerciceService);

  public exercices = signal<Exercice[]>([])

  ngOnInit(){
    //Récupérer l'id de la routine à afficher
    const id = this.route.snapshot.params['id']
    this.recupererRoutine(id)
  }

  recupererRoutine(id: number){
    this.routineService.getRoutine(id).subscribe({
      next: (routine) => { this.routine.set(routine), this.recupererExercices(id)},
      error: (err) => this.router.navigateByUrl('/taches')

    })
  }

  recupererExercices(idRoutine : number){
    this.exerciceService.getExercicesRoutine(idRoutine).subscribe({
      next: (exercices) => {this.exercices.set(exercices), console.log(exercices)},
      error: (err) => this.router.navigateByUrl('/taches')
    })
  }



}
