# File upload

Vous connaissez sûrement la balise HTML qui permet l'upload de fichier :
```
<input type="file" />
```

La faille upload est une faille permettant d’uploader des fichiers avec une extension non autorisée, cette faille est due à la mauvaise configuration du script d’upload ou à l’absence complète de sécurité. Celle-ci est généralement présente dans les scripts d’upload d’images.

Le but de cette faille est d’uploader un fichier avec une extension non autorisée. (Par exemple un code php) de façon à avoir un accès au serveur cible.

Il existe plusieurs méthodes pour passer les protections, si protection il y a.

Vous pouvez altérer le fichier au moment de l'upload avec '**Tamper Data**', un outil du naviagteur de firefox. Grâce à ces outils vous allez pouvoir upload le fichier en tant qu'image.
Une fois le fichier upload vous n'avez plus cas y accéder et l'exécuter avec l'URL.

Deuxième méthode, la double exention.

Certains sites vérifie **l'extention du fichier** que vous voulez upload, il existe un moyen de contournée cette sécurité, la **double extention**.
L'idée c'est d'intégrer du code php dans un fichier .gif.
Tout d'abord crée un fichier .gif avec **paint** par exemple, ensuite ouvrez se fichier avec un éditeur hexadécimal. Ajouter votre code PHP dans le .gif, est ajouté l'extension .php, ce qui nous donne "file.php.gif".
Maintenant l'upload va s'effectuer sans soucis !
On se rendra notre fichier.php.gif ?

>http://monsite.com/fichier.php

Voila !

## Sécurisation 

* Ne jamais se fier à ce que peut envoyer le client.
* Vérifier la configuration d’Apache afin d’agir en conséquence.
* Ne pas placer le .htaccess dans le répertoire d’upload
* Ne pas permettre l’écrasement de fichier
* Générer un nom aléatoire pour le fichier uploadé et enregistré le nom dans une base de données.
* Ne pas permettre de voir l’index of du répertoire d’upload.
* Assigner les bonnes permissions au répertoire.
* Vérifier le mime-type avec getimagesize() et l’extension du fichier.