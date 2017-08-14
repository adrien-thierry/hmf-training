# La faille include

La fonction include() en PHP sert a executer du code php qui se citue dans un autre fichier. Exemple: 

>include(bth.php)

La le c'est le code dans bth.php qui sera executer.
Maintenant un exemple d'URL exploitant cette partie du code :

>www.randomwe.com/index.php?file=default.php

Ici le include execute le code dans "default.php", il est alors possible de changer default.php en un autre fichier du serveur qui n'est normalement pas accesible, ou simplement par du code que vous avez ecris sur votre machine.
Exemple : 

>www.randomwe.com/index.php?file=C:\documents\bth\script.php

