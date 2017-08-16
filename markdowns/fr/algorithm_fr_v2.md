# Alghorithm

L'alghorithmie est une suite d'opération ou d'instruction permmettant de résoudre un probléme ou d'obtenir un résultat.

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

Il existe différents type de variables, un int pourra stocker des entier de valeur **–2147483648** à **2147483647**. Pour stocker une valeur plus grande il vous faudra changer de type de variable.

Mintenant que nous avont des variables, parlons des prochain outils.

## La boucle 'tant que' (while)

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

## Le **Si**, **sinon si**, **sinon** (if, else if, else)

Le si est une condition, exemple :

```
int     var = 2;

if (var == 2)
	{
		printf("var vaut bien 2");
	}
```

Ici les instruction dans le if (entre les crochet) ne vont s'executer que si la condition est remplie, **printf()** est une fonction qui permet d'afficher du texte.
Donc dans le cas present mon programme va bien afficher "var vaut bien 2".
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

Vous avez compris ? Parfait ! Exercise mintenant :

