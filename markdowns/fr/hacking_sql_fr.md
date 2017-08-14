# Injection SQL

Le SQL est un langage de requête. Un langage de requête est un langage informatique utilisé pour accéder aux données d'une base de données
L'injection SQL est une méthode d'attaque très connue. C'est un vecteur d'attaque extrêmement puissant quand il est bien exploité. Il consiste à modifier une requête SQL en injectant des morceaux de code non filtrés, généralement par le biais d'un formulaire.

Si vous voulez vous connecter a n'importe quels cite on va vous demander de remplir les champs "login" et "password", c'est deux information vont etre utiliser pour chercher dans la base de donnée du cite si votre compte existe.
L'injection SQL constiste a envoyer dans les champ de connection du code qui va etre interpreter par le cite, est donc vous permetre de faire exectuer votre code par le cite.

```
//voila une requete SQL
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='$login' AND password='$password'");
?>
```
Elle peut se traduire par "Selectione tout dans la colone utilisateurs ou le login = votrePseudo et mots de passee = votremotdepasse" si la requete est valide alors votre compte existe.

Si mintenant j'utilise comme pseudonyme "Flroian09'#" la requete deviens 

```
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='florian09#' AND password='$password'");
```