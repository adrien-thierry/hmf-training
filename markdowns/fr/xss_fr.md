# Faille XSS

Le cross-site scripting (abrégé XSS), est un type de faille de sécurité des sites web permettant d'injecter du contenu dans une page. Injecter un script dans l'URL de la page cibler ou bien dans un champ a remplir.

Il existe plusiuers types de faille xss,

## La faille xss éphemere

Imaginon que j'ai un champ deroulant qui me propose de choisir un pays.
Une fois avoir selectioner un pays, ici "English", l'URL change, on obtiens quels que chose comme ça:

>http://localhost:81/vulnerabilities/xss_d/?default=English

Se qu'il faut comprendre c'est que "English" est une variable, que l'ont peut editer !  Si dans l'URL je modifie "English" en "Franglais" et que je valide, hop je me retrouve avec "Franglais" dans le champ.

Si on remplacer "English" par un petit script :3 ! Par exemple :

>http://localhost:81/vulnerabilities/xss_d/?default=<script>alert("Ah!")</script>

Quand je valide cette URL une boite d'alerte aparait avec "Ah!" d'afficher !

