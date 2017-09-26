# Alghorithm

L'alghorithmie est une suite d'opérations ou d'instructions permettant de résoudre un probléme ou d'obtenir un résultat.

Prenons comme exemple un language de base, le C.

## Variable

Pour commencer a faire des opération il va vous falloir des variables, exemple :

```int    A;```

j'obtiens une variable de type **int** qui se nome **A**.
Mintenant je vais assigner une valeur a ma variables que je viens de déclarer, exemple :

```
int    A;
A = 42;
```

Je peut aussi assigné une valeur a ma variable sur la ligne ou je la déclare, exemple :

```int    A = 42;```

Il existe différents type de variables, un **int** pourra stocker des entier de valeur **–2147483648** à **2147483647**. Pour stocker une valeur plus grande il vous faudra changer de type de variable.

Mintenant que nous avont des variables, parlons des prochain outils.

## La boucle **tant que** (while)

La boucle while va répeter les opérations **tant que** ...
Exemple :

```
int    var = 0;

while (var < 42)
	{
	var = var + 1;
 	}
```

Ici **tant que** ma varibale **var** est strictement infériuer a 42, on effectue les instruction dans la boucle. Donc ici la boucle va se repter 42 fois. Une fois la condition remplie la lecture du code reprend sous la boucle.

## La boucle **pour** (For)

La boucle "for" vous permet de répéter une ou plusieurs instructions tant qu'un test est vérifié.

La boucle "for" la plus utilisée consiste à avoir une variable, "i", initialisée à 0 et répéter une instruction tant que "i" est inférieur à un nombre tel que 3, par exemple.

Ainsi, l'instruction contenue dans la boucle "for" sera répété 3 fois. (Une fois à 0, une fois à 1, puis à 2, alors "i" est égal à 3, alors "i" ne vérifie pas la condition d'infériorité à 3). Exemple :

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

Ici les instruction dans le if (entre les crochet) ne vont s'executer que si la condition est remplie.
**printf()** est une fonction qui permet d'afficher du texte.

Donc dans le cas present mon programme va bien afficher "var vaut bien 2".
Voila quels que exemples de condition que l'on peut utiliser dans les condition :

* \> , < , >=, <= (supérieur, inférieur , supérieur ou egal, inférieur ou egal)
* !=, == (différent, egal)


Mintenant si j'ajoute les else, else if, exemple :

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

?[Quels message vas s'afficher ?]
- [ ] 1
- [ ] 2
- [x] 3

Vous avez compris ? Parfait !

Vous venez de voir les outils de base pour crée des algorithme en c, c'est outils sont commun a de nombreux languages.
Quels que exemple de boucle dans d'autre language :

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

Comme vous le voyez, toute se resemblent.

@[Fait un "Hello World"]({"stubs": ["for_user.c"], "project":"exo1", "command": "python test_for_user.py"})

C'etais simple hien :)
Passont a plus complexe !
Je vous demande de produire du code qui va afficher l'alphabet.

`printf("abcdefghijklmnopqrstuvwxyz");` me dite vous ?

**Interdicton d'utiliser la fonction printf**.
Vous aller utiliser :
- une **boucle while**
- **une variable**
- la fonction **my_putchar()** (qui affiche le parametre que vous lui passer entre parenthése)

Pour réussir c'est exercise vous aller avoir besoin de regarder le **tableau ascii**. Dans ce tableau vous aller voir que des valeurs decimale represente des caractéres. jettez y un coup d'oeil [MAN ASCII](http://www.linux-france.org/article/man-fr/man7/ascii-7.html)

?[Quels valeur decimal vaut le caractére 'a' ?]
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

La variable i contient une valeur décimal qui vaut le caractère 'a' donc je vais bien afficher un 'a'
:::

:::Solution
 ```
	int i = 'a'; // déclaration de la varibale et je lui donne la valueur 'a'
	while(i <= 'z') // tant que i (qui vaut le caractére 'a') est inférieur ou egal au caractére 'z'
	{
		my_putchar(i); // afficher i
		i++; // incrémenter i
	}
 ```
