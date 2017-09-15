# Alghorithm

L'algorithmie est une suite d'opération ou d'instruction permettant de résoudre un problème ou d'obtenir un résultat.
Prenons comme exemple un language de base, le C.

## Variable

Pour commencer à faire des opérations il va vous falloir des variables, exemple :

```int    A;``` 

j'obtiens une variable de type **int** qui se nome **A**.
Maintenant je vais assigner une valeur à ma variable que je viens de déclarer, exemple : 

```
int    A;
A = 42;
```

Je peux aussi assigner une valeur à ma variable sur la ligne où je la déclare, exemple :

```int    A = 42;```

Il existe différents types de variable, un int pourra stocker des entiers de valeur **–2147483648** à **2147483647**. Pour stocker une valeur plus grande il vous faudra changer de type de variable.

Maintenant que nous avont des variables, parlons des prochains outils.

## La boucle **tant que** (while)

La boucle while va répéter les opérations **tant que** ...
Exemple :

```
int    var = 0;

while (var < 42)
	{
		var = var + 1;
 	}
```

Ici **tant que** ma varibale **var** est strictement infériuer à 42, on effectue les instructions dans la boucle. Donc ici la boucle va se répéter 42 fois. Une fois la condition remplie la lecture du code reprend sous la boucle.

## La boucle **pour** (For)

La boucle "for" vous permet de répéter une ou plusieurs instructions tant qu'un test est vérifié. La boucle "for" la plus utilisée consiste à avoir une variable, "i", initialisée à 0 et répéter une instruction tant que "i" est inférieur à un nombre tel que 3. Ainsi, l'instruction contenue dans la boucle "for" sera répétée 3 fois. (Une fois à 0, une fois à 1, puis à 2, alors "i" est égal à 3, alors "i" ne vérifie pas la condition d'infériorité à 3). Exemple :

```for(var i = 0; i < 3; i++)
{
  console.log(i); // 0, 1, 2
}
```

## Le **Si**, **sinon si**, **sinon** (if, else if, else)

Le si est une condition, exemple :

```
int     var = 2;

if (var == 2)
	{
		printf("var vaut bien 2");
	}
```

Ici les instructions dans le 'if' (entre les crochets) ne vont s'exécuter que si la condition est remplie, **printf()** est une fonction qui permet d'afficher du texte.
Donc dans le cas présent mon programme va bien afficher "var vaut bien 2".
Voilà quels que exemples de condition que l'on peut utiliser dans les conditions :

* \> , < , >=, <= (supérieur, inférieur , supérieur ou egal, inférieur ou egal)
* !=, == (différent, egal)


Maintenant si j'ajoute les else, else if, exemple :

```
int    var = 42;

if (var == 4)
	{
		printf("1");
	}
else if (var == 21)
	{
		printf("2")
	}
else
	{
		printf("3")
	}
```

?[Quel message va s'afficher ?]
- [ ] 1
- [ ] 2
- [x] 3

Vous avez compris ? Parfait !

Vous venez de voir les outils de base pour créer des algorithmes en c, ces outils sont communs à de nombreux languages.
Quelsques exemples de boucle dans d'autres language :

En Ruby :
```
while (compteur <= 4)
  print compteur
  compteur += 1
end
```

En Java
```
while (a < b)
{
  System.out.println("coucou " +a+ " fois !!");
}
```

En Python
```
while i < 10
	print("i")
	i++;
```

Comme vous le voyait toute se resemble.

@[Fait un "Hello World"]({"stubs": ["for_user.c"], "project":"exo1", "command": "python test_for_user.py"})

C'étais simple hien :)
Passons a plus complexe, je vous demande de produire du code qui va afficher l'alphabet. "printf("abcdefghijklmnopqrstuvwxyz");" me dite vous ? **Interdicton d'utiliser la fonction printf**. Vous allez utiliser une **boucle while**, **une variable** et la fonction **my_putchar()** qui affiche le paramètre que vous lui passez entre parenthése.
Pour réussir c'est exercise vous allez avoir besoin de regarder le **tableau ascii**. Dans ce tableau vous allait voir que des valeurs décimales représente des caractères. jettez y un coup d'oeil [MAN ASCII](http://www.linux-france.org/article/man-fr/man7/ascii-7.html)

?[Quelle valeur décimale vaut le caractère 'a' ?]
- [ ] 65
- [ ] 141
- [x] 97
- [ ] 61

@[Ecris une fonction qui va afficher l'alphabet]({"stubs": ["for_user.c"], "project":"exo1bis", "command": "python test_for_user.py"})

::: Un indice ?
Supposont que je déclare une variable de type **int** qui sapelle **i**, je dit que "i = 97". 

```
int i;
i = 97;
my_putchar(i);
```

La variable i contient une valeur décimale qui vaut le caractère 'a' donc je vais bien afficher un 'a'
:::