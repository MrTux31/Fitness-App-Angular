import { Routes } from '@angular/router';
import { Accueil } from './features/accueil/accueil';

export const routes: Routes = [
  { path: '', component: Accueil, pathMatch: 'full' },
  { path: '**', redirectTo: '' }, //redirection pour les URL inconnues
];
