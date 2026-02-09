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
}
