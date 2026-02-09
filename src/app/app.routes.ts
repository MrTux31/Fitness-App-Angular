import { Routes } from '@angular/router';
import { Accueil } from './features/accueil/accueil';
import { RoutineDetail } from './features/routines/routine-detail/routine-detail';

export const routes: Routes = [
  { path: '', component: Accueil, pathMatch: 'full' },
  
  { path: 'routines/:id', component: RoutineDetail },
  
  { path: '**', redirectTo: '' }, //redirection pour les URL inconnues
];
