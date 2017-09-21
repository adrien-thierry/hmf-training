# Injection SQL

Le SQL est un langage de requête. Un langage de requête est un langage informatique utilisé pour accéder aux données d'une base de données
L'injection SQL est une méthode d'attaque très connue. C'est un vecteur d'attaque extrêmement puissant quand il est bien exploité. Il consiste à modifier une requête SQL en injectant des morceaux de code non filtrés, généralement par le biais d'un formulaire.

Si vous voulez vous connecter à l'espace d'administration d'un site, on va vous demander de remplir les champs "login" et "password". Ces deux informations vont être utilisées pour chercher dans la base de données du site si votre compte existe.
L'injection SQL constiste à envoyer dans les champs de connexion du code qui va être rajoutée à la suite de la requête SQL pour en modifier son comportement et, par exemple, de s'authentifier sans mot de passe.

```
//voilà une requête SQL
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='$login' AND password='$password'");
?>
```
Elle peut se traduire par "Sélectionne tout dans la colonne utilisateurs où le login = votrePseudo et mot de passe = votremotdepasse" si la requête est valide alors votre compte existe.

Si maintenant j'utilise comme pseudonyme "Flroian09#'" la requête devient

```
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='florian09'# AND password='$password'");
```

Sachant que le '#' est une balise pour indiquer un commentaire, la requête devient :
```
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='florian09'#")
```

Du coup le mot de passe n'est plus vérifié !

# #Pratique 

@[Connecte toi au compte 'admin']({"project":"sqli", "command": "./sqli.sh"})

?[A quoi sert une requete SQL ?]
-[ ] Envoyer des messages
-[x] Faire une recherche dans une base de donnée
-[ ] Afficher des images sur le cite

| Titre         | Date de sortie| Genre |
| :------------ |:-------------:| :-----:|
| Avatar        | 2009          |Fantasy|
| Matrix      | 1999     |   Science-fiction |
| Les Goonies |  1985 |    Ation |

La requête dans l'exercice ci-dessous peut se traduire par : "Sélectionne **tout** dans la colonne **titre** où le genre vaut **aventure**". Fais en sorte de transformer la requête pour que tous les genres soient sélectionnés.

@[Affiche tous les films peu importe leurs genres!]({"stubs": ["for_user_sql.txt"], "command": "python tester_sql.py", "project": "exo2"})

:::Besoin d'aide ?
Utilise le '#' pour commenté la partie du code que tu veux rendre inopérante.
:::

