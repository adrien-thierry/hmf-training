# Injection SQL

Le SQL est un langage de requête. Un langage de requête est un langage informatique utilisé pour accéder aux données d'une base de données
L'injection SQL est une méthode d'attaque très connue. C'est un vecteur d'attaque extrêmement puissant quand il est bien exploité. Il consiste à modifier une requête SQL en injectant des morceaux de code non filtrés, généralement par le biais d'un formulaire.

Si vous voulez vous connecter à l'espace d'administration d'un site, on va vous demander de remplir les champs "login" et "password". Ces deux informations vont être utilisées pour chercher dans la base de donnée du site si votre compte existe.
L'injection SQL constiste a envoyer dans les champ de connection du code qui va être rajouté à la suite de la requête SQL pour en modifier son comportement et, par exemple, de s'authentifier sans mot de passe.

```
//voila une requete SQL
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='$login' AND password='$password'");
?>
```
Elle peut se traduire par "Selectionne tout dans la colone utilisateurs ou le login = votrePseudo et mot de passe = votremotdepasse" si la requete est valide alors votre compte existe.

Si maintenant j'utilise comme pseudonyme "Flroian09'#" la requete deviens 

```
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='florian09#' AND password='$password'");
```

Sachant que le '#' est une balise pour indiquer un commentaire, la requête devient :
```
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='florian09#'")
```

Du coup le mots de passe n'est plus vérifié !

?[A quoi sert une requete SQL ?]
-[ ] Envoyer des messages
-[x] Faire une recherche dans une base de donnée
-[ ] Afficher des images sur le cite

@[Affiche tout les films peut importe leur genres !]({"stubs": [], "root":"sql_exo", "command": "python tester_sql.py"})