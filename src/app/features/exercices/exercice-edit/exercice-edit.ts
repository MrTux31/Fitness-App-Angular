import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Exercice } from '../../../core/models/exercice';
import { ExerciceService } from '../../../core/service/exercice-service';
import { Chargement, StatusChargement } from '../../../shared/alert/chargement/chargement';
import { ExerciceType } from '../../../core/models/exercice-type';
import { ExerciceTypeService } from '../../../core/service/exercice-type-service';

@Component({
  selector: 'app-exercice-edit',
  imports: [ FormsModule, RouterLink,Chargement],
  templateUrl: './exercice-edit.html',
  styleUrl: './exercice-edit.css',
})
export class ExerciceEdit {
  public exercice = signal<Exercice>(new Exercice());
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private exerciceTypeService = inject(ExerciceTypeService)
  private exerciceService = inject(ExerciceService);

  public routineId!: number; //Sera assigné après
  public exerciceId!: number

  public readonly StatusChargement = StatusChargement
  statusChargement = signal<StatusChargement>(StatusChargement.SUCCES)

  public exercicesType :ExerciceType[] = []

  ngOnInit() {
    //Récupérer l'id de la routine concernée
    this.routineId = Number(this.route.snapshot.params['routineId']);
    //Récupérer l'id de l'exercice concerné
    this.exerciceId = Number(this.route.snapshot.params['exerciceId']);

    //Si l'id de l'exercice n'est pas présent, on quitte
    if(!this.routineId){
      this.router.navigateByUrl('/');
    }

    //Cas modification, on pré charge l'exercice
    if(this.exerciceId){
      this.chargerExercice(this.exerciceId);
    }

    this.chargerNomsExercices();
  }

  chargerExercice(id: number) {
    this.statusChargement.set(StatusChargement.CHARGEMENT)
    this.exerciceService.getExercice(id).subscribe({
      next: (exercice) => {
        this.exercice.set(exercice);
        this.statusChargement.set(StatusChargement.SUCCES);
      },
      error: () => {
        this.statusChargement.set(StatusChargement.ERREUR);
      },
    });
  }

  /**
   * Permet de charger la liste des exercices type
   */
  chargerNomsExercices(){
    this.exerciceTypeService.getExercicesType().subscribe({
      next: (exercicesType) => this.exercicesType = exercicesType
    })
  }

  onSubmit(formulaire: NgForm) {
    //si le formulaire est bien valide
    if (formulaire.valid) {
      //Cas modification
      if (this.exercice().id) {
        this.exerciceService.updateExercice(this.exercice()).subscribe({
          next: () => this.router.navigateByUrl('/routines' + '/' + this.routineId),
          error: () => this.router.navigateByUrl('/'),
        });
      }
      //Cas création
      else {
        //on associe l'exercice à sa routine
        this.exercice().routineId = this.routineId
        this.exerciceService.addExercice(this.exercice()).subscribe({
          next: () => this.router.navigateByUrl('/routines' + '/' + this.routineId),
          error: () => this.router.navigateByUrl('/'),
        });
      }
    }
  }
}
