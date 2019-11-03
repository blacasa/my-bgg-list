# my-bgg-list
Ecran d'accueil: le menu, et la liste des jeux (si on a la liste déjà stockée).
Un menu: liste des jeux, liste des listes, synchro bgg.

## Liste des jeux:
liste des jeux, basée sur le json de la liste des jeux associée à mon compte BGG.
Une entrée dans le json -> une ligne de la liste des jeux.
Une ligne: checkbox, titre, auteur, editeur, joueur min, joueur max, note, miniature, nombre de parties jouées.
Une ligne de recherche: titre, editeur, auteur, joueur min, joueur max.
Une ligne de tri

Un champ de saisie pour le titre de la liste.
Un bouton d'enregistrement des jeux cochés => création d'un json, stockage en local?

## Liste de listes:
Un écran de liste des listes créées.
Chaque ligne présente le titre de la liste, et le nombre d'éléments.
Le clic sur une ligne "ouvre" la liste: redirection vers la liste des jeux, mais avec un autre json (celui de la liste, et non plus celui de bgg).

## Synchro BGG
Via le site api json pour ne pas à avoir à manipuler de xml.
Un champ de saisie du nom  du compte.
Un bouton de validation. Si vide, affichage d'un message d'erreur.
Si validation de la saisie:
-> enregistrement du login en local
-> appel au WS
-> bouton de synchro direct si on a un compte bgg enregistré

=> La synchro se fait directement via l'api de BGG.

## Technique
- appel à un WS
- stockage en local (localStorage, autre?): lecture/ecriture
- liste/filtre
- routing
Options/Bonus:
- export des listes: téléchargement du json (il faudrait alors pouvoir importer ce même fichier), envoi de mail (voir l'API Gmail)


icones:
C:\packImages\guimegapack_windows\guimegapack\Cartoon_UI\Cartoon_GUI_04

C:\packImages\tabletopbadges_windows\tabletopbadges\TabletopBadges_png



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
