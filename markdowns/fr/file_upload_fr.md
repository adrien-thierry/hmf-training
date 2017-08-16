# File upload

Vous connaissez sûrement la balise HTML qui permet l'upload de fichier :
```
<input type="file" />
```

La faille upload est une faille permettant d’uploader des fichiers avec une extension non autorisée, cette faille est due à la mauvaise configuration du script d’upload ou à l’absence complète de sécurité. Celle ci est généralement présente dans les scripts d’upload d’images.

Le but de cette faille est d’uploader un fichier avec une extension non autorisée. (Par exemple un code php) de façon à avoir un accès au serveur cible.

Il existe plusieur methode pour passer les protection, si protection il y a.

Vous pouvez altérer le fichier au moments de l'upload avec '**Tamper Data**', un outils du naviagteur de firefox. Grace a c'est outils vous allez pouvoir upload le fichier en tant qu'image.
Une fois le fichier upload vous n'avez plus cas y acceder et l'executer avec l'URL.

Deuxieme methode, la double exention.

Certain site vérifier **l'extention du fichier** que vous voulez upload, il existe un moyen de contournée cette securiter, la **double extention**.
L'idée c'est d'integrer du code php dans un fichier .gif.
Tout d'abord crée un fichier .gif avec paint par exemple, ensuite ouvrez se fichier avec un editeur hexadécimal. Ajouter votre code PHP dans le .gif, est ajoueter l'extention .php, se qui nous done "file.php.gif".
Mintenant l'upload va s'effectuer sans soucis !
On se renda notre fichier.php.gif ?

>http://monsite.com/fichier.php

Voila !

## Sécurisation 

* Ne jamais se fier à ce que peut envoyer le client.
* Vérifier la configuration d’Apache afin d’agir en conséquence.
* Ne pas placer le .htaccess dans le répertoire d’upload
* Ne pas permettre l’écrasement de fichier
* Générer un nom aléatoire pour le fichier uploadé et enregistrer le nom dans une base de données.
* Ne pas permettre de voir l’index of du répertoire d’upload.
* Assigner les bonnes permissions au répertoire.
* Vérifier le mime-type avec getimagesize() et l’extension du fichier.