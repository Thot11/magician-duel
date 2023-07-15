## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Concept de base

Façon versus, 1v1 vue de côté
Chaque joueur doit écrire ses spells pour les activer. Donc plus on écrit vite, plus vite on lance un sort. pas de temps de recharge
Plus un sort est long, plus il est puissant
Il y’a des spells d’attaque, de défense, de buff et débuff
Chaque joueur à un grimoire dans lequel est recensé tous les sorts qu’il connaît
Les joueurs commencent avec un set de sort défini et doivent découvrir/débloqués les autres au fur et à mesure
On peut voler le sort d’un joueur si on le bat

Le jeu repose sur trois pilier:

Le savoir: Accumulé le plus de sort possible
La stratégie: savoir utiliser le bon sort au bon moment
L'exécution: savoir lancer un sort le plus vite possible et sans faute

## Les sorts

Les sorts existent dans 4 éléments: feu, eau, terre et vent 
Il en existe 4 genres: attaque, défense, buff et débuff
Chaque élément est + ou - efficace contre chaque élément feu > eau, terre > feu, etc
