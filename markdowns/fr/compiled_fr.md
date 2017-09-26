# Compilateur & Décompilateur

Un compilateur est le terme utilisé pour désigner un programme qui transforme un code source écrit dans un langage de programmation en un autre langage informatique.
Il transforme un langage simple compréhensible par l'homme en un language plus complexe compréhensible par la machine, le language machine.
Inversement, un programme effectuant la tâche inverse est un décompilateur.

Par exemple, après avoir écrit un programme en language C, on peut le compiler avec GCC afin d'avoir un exécutable de notre programme.

`gcc mon_programme.c -o mon_executable`

Pour réussir l'exercice suivant, décommente le code, compile le programme et exécute le :

`gcc hello.c -o hello`

puis

`./hello`

Ici c'est un language qui doit être compilé avant d'être exécuté, du C.

@[Décommente le code, compile le et exécute le pour réussir l'exercice]({"project":"compilation", "stubs": ["hello.c"], "command": "./install.sh"})

# Interpréteur

L'interpréteur est un outil qui analyse votre code source, le traduit en language machiné et l'exécute.
Là où votre compilateur compile votre code une seule fois et génère un exécutable, l'interpréteur va réinterpréter votre code à chaque lancement de votre programme.


* Un programme script est exécuté à partir du fichier source via un interpréteur de script.
* Un programme compilé est exécuté à partir d'un bloc en langage machine issu de la traduction du fichier source.
* Un langage "semi-interprété" ou "semi-compilé" comprend un interprète qui lit le langage cible avant de générer un "Bytecode". Une machine virtuelle va ensuite exécuter ce bytecode. Le langage semi-interprété le plus connu est le Java.

Ici on a un language interprété, du Python. Pour l'exécuter utilise la commande :

`python hello.py`

@[Décommente le code et exécute le pour réussir l'exercice]({"project":"interpreter", "stubs": ["hello.py"], "command": "./install.sh"})

On saute l'étape compilation, l'interpréteur lit est-on interprète directement le code.

Ici un autre example en ruby. Pour l'exécuter utilise la commande :

`ruby hello.rb`

@[Décommente le code et exécute le pour réussir l'exercice]({"project":"interpreter_php", "stubs": ["hello.rb"], "command": "./install.sh"})
