import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciceType } from '../models/exercice-type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciceTypeService {

  private http = inject(HttpClient)
  readonly exerciceTypeAPI = environment.apiUrl + '/exerciseTypes';
   getExercicesType(): Observable<ExerciceType[]> {
      return this.http.get<ExerciceType[]>(this.exerciceTypeAPI);
    }
}
