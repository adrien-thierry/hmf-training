# Faille XSS

Le cross-site scripting (abrégé XSS), est un type de faille de sécurité des sites web permettant d'injecter du contenu dans une page, d'injecter un script dans l'URL de la page cibler ou bien dans un champ à remplir.

##Comment la déceler ?

Vous arrivez maintenant sur la page internet de votre cible, la faille se trouve dans tous les formulaires (moteur de recherche, systèmes de commentaires, livre d'or chat, essayez-les tous !) à condition que le HTML soit interprété. Pour vérifier si le HTML est activé ou désactivé dans un champ de formulaire on peut effectuer plusieurs tests commencés tout d'abord par insérer du HTML basique dans le champ :
```
<b>Test</b>
```
si le moteur de recherche (par exemple) indique ceci : aucun résultat trouvé pour le terme "Test" c'est que la faille XSS est bien là, s'il affiche ceci : Aucun résultat trouvé pour le terme "<b>Test</b>" il n'y a pas de faille cherchez ailleurs sur le site ou passez votre chemin.

Il existe plusieurs types de faille xss,

## La faille xss éphemere

Imaginons que j'ai un champ déroulant qui me propose de choisir un pays.

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/champ_deroulant.PNG "menu déroulant")

Une fois avoir sélectionné un pays, ici "English", l'URL change, on obtiens quelque chose comme ça:


>http://localhost/vulnerabilities/xss_d/?default=English

Ce qu'il faut comprendre c'est que "English" est une variable, que l'on peut éditer !  Si dans l'URL je modifie "English" en "Franglais" et que je valide, hop je me retrouve avec "Franglais" dans le champ.

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/Franglais.PNG "Franglais")

Si on remplaçait "English" par un petit script :3 ! Par exemple :

>http://localhost:81/vulnerabilities/xss_d/?default=\<script>alert("Ah!")\</script>

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/ah!.PNG "ah!")

Quand je valide cette URL une boîte d'alerte apparaît avec "Ah!" d'afficher !
En partant de cette constatation on peut facilement imaginer toute l'étendue des possibilités offertes par l'exploitation de cette faille :
* Récupération de cookies
* Redirection de page (phishing par exemple)
* Keylogging,
* ...

## La faille xss permanante

Il est très fréquent de trouver un espace dédié aux commentaires sur internet, un endroit ou l'on peut laisser une trace, si cet espace n'est pas correctement protégé il est simple d'y glisser du code :3

Imaginons que je laisse un commentaire qui ressemble à ça :

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/xss_perma2.PNG "xss_perma")


Mon commentaire qui s'affichera sera "Je suis un trol", et à chaque fois que la page sera chargée, une boîte de dialogue aparaitra avec a l'intérieur "Je suis un gros trol".

@[Essaye de rajouter un script alert comme dans les exemple précédent]({ "stubs": [], "project":"exo3", "command": "./page.sh" })

# La solution pour s'en protéger

Une fonction existe en PHP pour résoudre ce problème, **htmlspecialchars()**.
Elle permet de remplacer les carractères spéciaux par des entités HTML. Exemple :

* Le symbole & devient \&amp;
* Le symbole " devient \&quot;
* Le symbole ' devient &\#39;

Pour se protéger des failles XSS, il est essentiel de ne pas faire confiance en l'utilisateur et de nettoyer en permanence ses entrées.
