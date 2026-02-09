import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineService } from '../../../core/service/routine-service';
import { Routine, Status } from '../../../core/models/routine';
import { RoutineItem } from '../routine-item/routine-item';

@Component({
  selector: 'app-routine-list',
  imports: [RoutineItem],
  templateUrl: './routine-list.html',
  styleUrl: './routine-list.css',
})
export class RoutineList {

  @Input()
  //Variable optionnelle pour filtrer, soit reçue de^puis le html, soit undefined.
  triStatus? : Status 


  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private routineService = inject(RoutineService);

  //Tableau qui va contenir les routines
  public routines = signal<Routine[]>([]);

  ngOnInit(): void {
    this.chargerRoutines();
  }

  private chargerRoutines() {
    
    //On récupère la liste des routines
    this.routineService.getRoutines({status: this.triStatus}).subscribe({
      next: (listeRoutines) => {
        this.routines.set(listeRoutines);
      },
    });
  }
}
