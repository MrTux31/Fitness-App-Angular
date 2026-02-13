import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Routine, Status } from '../models/routine';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  //injection du client http
  private http = inject(HttpClient);

  //Url de l'API REST
  readonly routineAPI = environment.apiUrl + '/routines'; //va chercher dans la var d'environnement

  constructor() {}

  getRoutines(filtres?: { status?: Status }): Observable<Routine[]> {
    //Paramètres pour la requete a faire
    let params: any = {};

    //Si y a le status on l'ajoute dans les params
    if (filtres?.status) {
      params.status = filtres.status;
    }

    return this.http.get<Routine[]>(this.routineAPI, { params });
  }

  getRoutine(id: number): Observable<Routine> {
    return this.http.get<Routine>(this.routineAPI + '/' + id);
  }

  addRoutine(nouvelleRoutine: Routine): Observable<Routine> {
    //Mettre a jour la date de création
    nouvelleRoutine.creationDate = format(new Date(), 'yyyy-MM-dd');
    return this.http.post<Routine>(this.routineAPI, nouvelleRoutine);
  }

  updateRoutine(routine: Routine): Observable<Routine> {
    return this.http.put<Routine>(this.routineAPI + '/' + routine.id, routine);
  }

  deleteRoutine(routine: Routine): Observable<Routine> {
    return this.http.delete<Routine>(this.routineAPI + '/' + routine.id);
  }

  toggleStatus(routine: Routine): Observable<Routine> {
    const newStatus = routine.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE;
    routine.status = newStatus;
    return this.updateRoutine(routine);
  }


}
