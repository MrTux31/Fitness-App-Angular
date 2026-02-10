import { Component, Input } from '@angular/core';
import { retry, RetryConfig } from 'rxjs';

export enum StatusChargement{
  CHARGEMENT,
  SUCCES,
  ERREUR
}

@Component({
  selector: 'app-chargement',
  imports: [],  
  templateUrl: './chargement.html',
  styleUrl: './chargement.css',
})

export class Chargement {

  //Le status du chargement en cours
  @Input() public status! : StatusChargement
  
  public readonly StatusChargement = StatusChargement
}
