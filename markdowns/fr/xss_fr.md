# Faille XSS

Le cross-site scripting (abrégé XSS), est un type de faille de sécurité des sites web permettant d'injecter du contenu dans une page, d'injecter un script dans l'URL de la page cibler ou bien dans un champ a remplir.

Il existe plusieurs types de faille xss,

## La faille xss éphemere

Imaginons que j'ai un champ deroulant qui me propose de choisir un pays.

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/champ_deroulant.PNG "menu déroulant")

Une fois avoir selectioner un pays, ici "English", l'URL change, on obtiens quelque chose comme ça:


>http://localhost/vulnerabilities/xss_d/?default=English

Ce qu'il faut comprendre c'est que "English" est une variable, que l'ont peut éditer !  Si dans l'URL je modifie "English" en "Franglais" et que je valide, hop je me retrouve avec "Franglais" dans le champ.

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/Franglais.PNG "Franglais")

Si on remplacer "English" par un petit script :3 ! Par exemple :

>http://localhost:81/vulnerabilities/xss_d/?default=\<script>alert("Ah!")\</script>

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/ah!.PNG "ah!")

Quand je valide cette URL une boite d'alerte aparait avec "Ah!" d'affiché !
En partant de cette constatation on peut facilement imaginer tout l'etendue des possibilités offertes par l'exploitation de cette faille :
* Récupération de cookies
* Redirection de page (phishing par exemple)
* Keylogging,
* ...

## La faille xss permanante

Il est trés fréquent de trouver un espace dedié aux commentaires sur internet, un endroit ou l'on peut laisser une trace, si cet espace n'est pas correctement protégé il est simple d'y glisser du code :3

Imaginons que je laisse un commentaire qui ressemble a ça :

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/xss_perma2.PNG "xss_perma")


Mon commentaire qui s'affichera sera "Je suis un trol", et à chaque fois que la page sera chargée, une boite de dialogue aparaitra avec a l'intérieur "Je suis un gros trol".

@[Launch the server]({ "stubs": [], "command": "service mysql start", "project": "exo3" })


# La solution pour s'en protéger

Une fonction existe en PHP pour résoudre se probleme, **htmlspecialchars()**.
Elle permet de remplacer les carracteres speciaux par des entités HTML. Exemple :

* Le symbole & devient \&amp;
* Le symbole " devient \&quot;
* Le symbole ' devient &\#39;

Pour se protéger des failles XSS, il est essentiel de ne pas faire confiance en l'utilisateur et de nettoyer en permanence ses entrées.
