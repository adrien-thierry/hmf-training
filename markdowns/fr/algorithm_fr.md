
# Algorithme

Un algorithme est une séquence d'opérations finie et non ambiguë ou des instructions pour résoudre un problème ou obtenir un résultat. Un programme informatique est composé d'un ensemble d'algorithmes. Pour ce cours, nous utiliserons le langage JAVASCRIPT pour des exemples. Dans Javascript, '//' signifie que ce qui suit est un commentaire, et ne sera donc pas considéré comme un code à exécuter.

# Variables


Sur la base d'un algorithme, il existe les variables. Une variable est utilisée pour stocker des données pour une utilisation ultérieure. Pour attribuer une variable, c'est-à-dire pour lui donner une valeur, utilisez le signe '='. Exemple :

```var name = "John Doe";```

## If, esle if, else (si, sinon si, sinon)

Le "if" est un test pour vérifier si une condition est vraie ou fausse. Un exemple :

```var test = 1;
if(test == 1)
{
  console.log("test == 1");
}
```

Pour compléter un "if" , ou l'affiner, nous pouvons ajouter des tests "else" ou "else if":

```var test = 1;
if(test == 1)
{
  console.log("test == 1");
}
else if(test == 0)
{
  console.log("test == 0");
}
else console.log("test != 1 && test != 0");
```

## For (pour)

La boucle "for" vous permet de répéter une ou plusieurs instructions tant qu'un test est vérifié. La boucle "for" la plus utilisée consiste à avoir une variable, "i", initialisée à 0 et répéter une instruction tant que "i" est inférieur à un nombre tel que 3. Ainsi, l'instruction contenue dans la boucle "for" sera répété 3 fois. (Une fois à 0, une fois à 1, puis à 2, alors "i" est égal à 3, alors "i" ne vérifie pas la condition d'infériorité à 3). Exemple :

```for(var i = 0; i < 3; i++)
{
  console.log(i); // 0, 1, 2
}
```

## While (tant que)

La boucle "while" vous permet de répéter une des opération tant qu'une condition est remplie. 
Par exemple :

```while (i < 10)
		{
		 i = i + 1;
		}```	

@[Fait un "Hello World"]({"stubs": ["universe.py","tester.py"], "command": "python universe.py > file.txt ; python tester.py"})