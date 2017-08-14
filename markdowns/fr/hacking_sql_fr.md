# Injection SQL

Le SQL est un langage de requête. Un langage de requête est un langage informatique utilisé pour accéder aux données d'une base de données
L'injection SQL est une méthode d'attaque très connue. C'est un vecteur d'attaque extrêmement puissant quand il est bien exploité. Il consiste à modifier une requête SQL en injectant des morceaux de code non filtrés, généralement par le biais d'un formulaire.

Si vous voulez vous connecter a n'importe quels cite on va vous demander de remplir les champs "login" et "password", c'est deux information vont etre utiliser pour chercher dans la base de donnée du cite si votre compte existe.
L'injection SQL constiste a envoyer dans les champ de connection du code qui va etre interpreter par le cite, est donc vous permetre de faire exectuer votre code par le cite.

```
<?php

// On récupère les variables envoyées par le formulaire
$login = $_POST['login'];
$password = $_POST['password'];

// Connection a la base do donnée
try { $bdd = new PDO('mysql:host=localhost;dbname=bdd','root',''); }
catch (Exeption $e) { die('Erreur : ' .$e->getMessage())  or die(print_r($bdd->errorInfo())); }

// Requête SQL
$req = $bdd->query("SELECT * FROM utilisateurs WHERE login='$login' AND password='$password'");

?>
```