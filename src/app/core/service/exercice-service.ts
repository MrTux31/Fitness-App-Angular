import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exercice } from '../models/exercice';



@Injectable({
  providedIn: 'root',
})
export class ExerciceService {
  //injection du client http
  private http = inject(HttpClient);

  //Url de l'API REST
  readonly exerciceAPI = environment.apiUrl + '/exercises'; //va chercher dans la var d'environnement
  readonly routineApi = environment.apiUrl + '/routines';
  constructor() {}

  getExercices(): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(this.exerciceAPI);
  }

  getExercice(id: number): Observable<Exercice> {
    return this.http.get<Exercice>(this.exerciceAPI + '/' + id);
  }

  getExercicesRoutine(idRoutine: number): Observable<Exercice[]> {
    return this.http.get<Exercice[]>(this.routineApi +'/'+ idRoutine + '/exercises');
  }
  addExercice(nouvelExercice: Exercice): Observable<Exercice> {
    return this.http.post<Exercice>(this.exerciceAPI, nouvelExercice);
  }

  updateExercice(exercice: Exercice): Observable<Exercice> {
    return this.http.put<Exercice>(this.exerciceAPI + '/' + exercice.id, exercice);
  }

  deleteExercice(exercice: Exercice): Observable<Exercice> {
    return this.http.delete<Exercice>(this.exerciceAPI + '/' + exercice.id);
  }


   //Renvoie les status des exos
   //Utilisation de l'id de la routine actuelle pour initialiser son tableau
  getExerciceStatus(idRoutine : number){
    //On récup l'objet exercices dans le local storage, si il existe pas on init avec {}
    let exercices = JSON.parse(localStorage.getItem('exercices') || '{}' )
    
    //On regarde si la routine est présente, sinon on l'init
    if(!exercices[idRoutine]){
      exercices[idRoutine] = {}
    }

    return exercices
  }


  //Permet de marquer un exercice comme fait ou non fait
  toggleExerciceStatus(exercice: Exercice){
    
    let exercices = this.getExerciceStatus(exercice.routineId)

    //undefined = non fait , true = fait

    //Si l'exercice n'existe pas présent on le met à fait
    if(exercices[exercice.routineId][exercice.id] === undefined){
      exercices[exercice.routineId][exercice.id] = true;
    }else{
      //Sinon on l'enève, il n'est pas fait
      delete exercices[exercice.routineId][exercice.id];
    }

    //Sauvegarde
    localStorage.setItem('exercices', JSON.stringify(exercices));
  }

  /**
   * Permet de changer d'un coup le stauts de tous les exercices d'une routine
   * @param status : true si on veut tout mettre à "fait", false si on veut tout mettre à "non fait"
   * @param idRoutine 
   */
  changeAllExerciceStatus(status: boolean , exercicesToUpdate : Exercice[]){
    let exercices = this.getExerciceStatus(exercicesToUpdate[0].routineId)

     //Si true, on met tout à "fait"
    if(status){
      for(const exercice of exercicesToUpdate){ 
        exercices[exercice.routineId][exercice.id] = true;
      }
    }
    //Si non on remet tout à "non fait", donc on supprime ca du local storage
    else{
      for(const exercice of exercicesToUpdate){

        delete exercices[exercice.routineId][exercice.id];

      } 
    }
    //Sauvegarde
    localStorage.setItem('exercices', JSON.stringify(exercices));  }






}
