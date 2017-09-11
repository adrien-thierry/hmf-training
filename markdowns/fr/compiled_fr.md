# Compilateur & Décompilateur

Un compilateur est le terme utilisé pour désigner un programme qui transforme un code source écrit dans un langage de programmation en un autre langage informatique.*
Il transforme un langage simple compréhensible par l'homme en un language plus complexe compréhensible par la machine, le language machine.
Inversement, un programme effectuant la tache inverse est un décompilateur.

Par exemple, apres avoir écrit un programme en language C, on peut le compiler avec GCC afin d'avoir un executable de notre programme.

`gcc mon_programme.c -o mon_executable`

Pour réussir l'exericde suivant, décommente le code, compile le programme et exécute le :

`gcc hello.c -o hello`

puis

`./hello`

@[Décommente le code, compile le et exécute le pour réussir l'exercice]({"project":"compilation", "stubs": ["hello.c"], "command": "./install.sh"})

# Interpréteur

L'interpréteur est un outils qui analyze votre code source, le traduit en language machine et l'éxécute.
Là où votre compilateur compile votre code une seule fois et génére un executable, l'interpréteur va ré-interpréter votre code a chaque lancement de votre programme.

* Un programme script est exécuté à partir du fichier source via un interpréteur de script.
* Un programme compilé est exécuté à partir d'un bloc en langage machine issu de la traduction du fichier source.
* Un langage "semi-interprété" ou "semi-compilé" comprend un interpéreur qui lit le langage cible avant de générer un "Bytecode". Une machine virtuelle va ensuite exécuter ce bytecode. Le langage semi-interprété le plus connu est le Java.
