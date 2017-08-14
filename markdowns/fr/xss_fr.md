# Faille XSS

Le cross-site scripting (abrégé XSS), est un type de faille de sécurité des sites web permettant d'injecter du contenu dans une page. Injecter un script dans l'URL de la page cibler ou bien dans un champ a remplir.

Il existe plusiuers types de faille xss,

## La faille xss éphemere

Imaginon que j'ai un champ deroulant qui me propose de choisir un pays.
Une fois avoir selectioner un pays, ici "English", l'URL change, on obtiens quels que chose comme ça:

>http://localhost:81/vulnerabilities/xss_d/?default=English

Se qu'il faut comprendre c'est que "English" est une variable, que l'ont peut editer !  Si dans l'URL je modifie "English" en "Franglais" et que je valide, hop je me retrouve avec "Franglais" dans le champ.

Si on remplacer "English" par un petit script :3 ! Par exemple :

>http://localhost:81/vulnerabilities/xss_d/?default=\<script>alert("Ah!")\</script>

Quand je valide cette URL une boite d'alerte aparait avec "Ah!" d'afficher !
En partant de cette constatation on peut facilement imaginer tout l'etendue des possibilité.

## La faille xss permanante

Il est trés fréquent de trouver un espace dedier au comentaire sur internet, un endroit ou l'on peut laisser une trace, si c'est espace n'est pas correctement protéger il est simple d'y glisser du code :3

Imaginon que je laisse un commentaire qui ressemble a ça :

```
Je suis un trol \<script>alert("Je suis un gros trol")\</script>
```

Mon commentaire qui s'affichera sera "Je suis un trol" est a chaque fois que la page sera charger une boite aparaitra avec a l'intérieur "Je suis un gros trol".

[logo]: https://github.com/adrien-thierry/cg-hmf/blob/master/src/champ_deroulant.png "menu deroulant"

# La solution pour s'en protéger

Une fonction existe pour résoudre se probleme, **htmlspecialchars()**.