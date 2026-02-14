import { Component } from '@angular/core';

@Component({
  selector: 'app-fortune',
  imports: [],
  templateUrl: './fortune.html',
  styleUrl: './fortune.css',
})
export class Fortune {


  private phrases: string[] = [
  "Chaque squat compte… même celui que tu as oublié !",
  "Courir, c’est juste marcher vite avec style.",
  "Le seul mauvais entraînement, c’est celui que tu ne fais pas… sauf si tu regardes Netflix, ça compte presque.",
  "Ton corps peut tout… ton esprit fait juste des pauses.",
  "Des abdos ? Non, des cookies… mais on va faire les deux !",
  "Si tu te plains, rappelle-toi que les haltères ne se soulèvent pas toutes seules.",
  "Aujourd’hui c’est dur… demain tu pourras te vanter.",
  "Pas besoin d’être rapide, juste de ne pas abandonner avant la glace post-training.",
  "Tu n’as pas mal… tu brûles du gras !",
  "Chaque push-up est un pas de plus vers la gloire… ou vers le canapé, au choix.",
  "Fais-le pour ton futur moi qui te remerciera… ou te jugera.",
  "Si tu penses à abandonner, pense à ce donut et choisis l’entraînement à la place !",
  "Les muscles se construisent dans la sueur, pas dans les excuses.",
  "Courir c’est bien… sauf quand c’est pour rattraper le bus, là c’est la vraie motivation.",
  "Le seul marathon que tu devrais éviter, c’est celui de séries sur le canapé.",
  "Un jour sans sport est un jour où ton corps te fait des grimaces.",
  "Pas de pression, juste du cardio… beaucoup de cardio.",
  "Ton corps est une machine… parfois avec un mode 'sieste' activé.",
  "Sueur aujourd’hui, bière demain… équilibre parfait.",
  "Si tu peux le rêver, tu peux le soulever… ou au moins essayer !",
  "Les muscles brûlent, les excuses fondent.",
  "Même Spider-Man fait des squats, alors bouge-toi !",
  "Chaque répétition te rapproche de la légende… ou du frigo.",
  "Aujourd’hui tu transpires, demain tu brilles ou tu pleures un peu.",
  "Fais-le pour l’histoire que tu raconteras, pas pour le miroir… mais le miroir est cool aussi.",
  "Le cardio n’a jamais tué personne… sauf peut-être tes genoux.",
  "Les haltères sont tes amis… même s’ils te frappent parfois.",
  "Tu cours comme si quelqu’un avait volé ton Wi-Fi !",
  "Pas de douleur, pas de pizza après l’entraînement !",
  "Le tapis de course ne mord pas… mais ton souffle oui.",
  "Respire… ou pas, tu choisis.",
  "Aujourd’hui c’est jambes, demain c’est regrets.",
  "Si tu pensais à abandonner, pense à ta fierté ou à ton selfie.",
  "Chaque burpee est un pas vers le paradis… ou l’enfer.",
  "Fais du sport comme si ta glace t’attendait au frigo.",
  "La sueur est juste ton corps qui pleure de joie.",
  "Ton corps mérite mieux que des excuses.",
  "Tu soulèves des poids… ou des espoirs ? Les deux !",
  "Courir c’est bien… mais éviter la pizza, c’est mieux.",
  "Fais-le pour ton futur moi… qui sera encore plus cool.",
  "Si tu tombes, relève-toi… sauf si c’est dans le canapé.",
  "Chaque abdos compte… même celui que tu ne sens pas.",
];

  phraseMotivation: string = '';


  ngOnInit(){
    this.genererPhrase()
  }

  genererPhrase(){
    this.phraseMotivation = this.phrases[Math.floor(Math.random() * this.phrases.length )] //Prendre une phrase aléatoire
  }


}
