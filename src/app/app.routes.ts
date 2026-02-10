import { Routes } from '@angular/router';
import { Accueil } from './features/accueil/accueil';
import { RoutineDetail } from './features/routines/routine-detail/routine-detail';
import { RoutineEdit } from './features/routines/routine-edit/routine-edit';
import { ExerciceEdit } from './features/exercices/exercice-edit/exercice-edit';

export const routes: Routes = [
  { path: '', component: Accueil, pathMatch: 'full' },
  { path: 'routines/:routineId/edit', component: ExerciceEdit },
  { path: 'routines/:routineId/edit/:exerciceId', component: ExerciceEdit },
  { path: 'routines/edit/:id', component: RoutineEdit },
  { path: 'routines/:id', component: RoutineDetail },

  { path: '**', redirectTo: '' }, //redirection pour les URL inconnues
];
