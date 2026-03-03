# Gestionnaire de Fitness

Projet réalisé dans le cadre scolaire à l'IUT de Blagnac.

## Objectif
Application Angular permettant aux utilisateurs de créer et suivre leurs routines d’exercices personnelles.  
L’interface intuitive permet de créer, visualiser et gérer les routines et exercices.

---

## Fonctionnalités principales

### Fonctionnalités minimales
- Voir la liste des routines (Page d’accueil)
- Voir le détail d’une routine avec ses exercices
- Ajouter un exercice dans une routine
- Modifier ou supprimer un exercice
- Créer, modifier ou supprimer une routine (avec tous ses exercices)

### Fonctionnalités bonus
- Filtrer les routines : actives, inactives, toutes
- Relancer toutes les routines inactives d’un clic
- Trier les routines par date de création
- Afficher une phrase humoristique aléatoire
- Spinner “Chargement en cours” et gestion des erreurs
- Marquer un exercice comme “fait” ou “non fait”
- Marquer tous les exercices d’une routine d’un coup
- Aide à la saisie du nom des exercices (auto-complétion)
- Afficher le poids total et le nombre total de répétitions d’une routine

---

## Architecture du projet

### Composants
| Composant | Rôle |
|------------|------|
| `accueil` | Page d’accueil avec la liste et filtres des routines |
| `routine-list` | Affiche la liste des routines |
| `routine-item` | Élement d’une routine, permet accès au détail et changement de statut |
| `routine-edit` | Créer ou modifier une routine |
| `routine-detail` | Détail d’une routine avec ses exercices et actions possibles |
| `exercice-list` | Liste des exercices d’une routine, statistiques globales |
| `exercice-item` | Élement d’un exercice, permet modification/suppression/statut |
| `exercice-edit` | Créer ou modifier un exercice |
| `chargement` | Popup de chargement ou message d’erreur |
| `fortune` | Phrase humoristique aléatoire affichée sur la liste |
| `menu` | Header avec navigation |

### Services
| Service | Rôle |
|---------|------|
| `routine-service` | Gestion des routines (CRUD + tri) via l’API |
| `exercice-service` | Gestion des exercices (CRUD + statut “fait/non fait” en localStorage) |
| `exercice-type-service` | Récupère les types d’exercices depuis l’API pour l’auto-complétion |

### Modèles
- `routine` : représente une routine stockée en base
- `exercice` : représente un exercice stocké en base
- `exercice-type` : nom type d’exercice pour l’aide à la saisie

---

## Ergonomie et utilisation
- Accéder au détail d’une routine : cliquer sur la routine depuis la liste
- Changer le statut d’une routine ou d’un exercice :  
  - Bouton check → bascule “fait/non fait”  
  - Bouton refresh → réinitialise le statut
- Affichage du poids d’un exercice : visible seulement si >0kg

### Routes principales
| Route | Composant | Usage |
|-------|-----------|------|
| `/` | Accueil | Liste des routines |
| `/routines/add` | RoutineEdit | Créer une routine |
| `/routines/edit/:id` | RoutineEdit | Modifier une routine |
| `/routines/:id` | RoutineDetail | Détail d’une routine |
| `/routines/:routineId/add` | ExerciceEdit | Ajouter un exercice |
| `/routines/:routineId/edit/:exerciceId` | ExerciceEdit | Modifier un exercice |
| `**` | Redirect | Toutes URL inconnues → Accueil |

---

## API utilisée
- Routines : GET, POST, PUT, DELETE (`/routines`, `/routines/:id`)
- Exercices : GET, POST, PUT, DELETE (`/exercises`, `/routines/:routineId/exercises`)
- Types d’exercices : GET (`/exerciseTypes`)

---

## Tech Stack
- Angular 21
- Bootstrap & Bootswatch
- Font Awesome
- API JSON via `bdd-fitness`

