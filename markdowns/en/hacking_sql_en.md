# Injection SQL

SQL is a query language. A query language is a computer language used to access data in a database
SQL injection is a very well known method of attack. It is an extremely powerful attack vector when it is well exploited. It consists in modifying an SQL query by injecting unfiltered pieces of code, usually by means of a form.

If you want to connect to the administration area of ​​a site, you will be asked to fill in the "login" and "password" fields. These two information will be used to search the database of the site if your account exists.
SQL injection consents to send in the connected fields code that will be added as a result of the SQL query to modify its behavior and, for example, to authenticate itself without a password.

```
//Exemple of SQL request
$req = $bdd->query("SELECT * FROM user WHERE login='$login' AND password='$password'");
?>
```
It can be translated as "Select all in the user column or login = yourPassword and password = your password" if the request is valid then your account exists.

If now I use as pseudonym "Flroian09 '#" the request becomes

```
$req = $bdd->query("SELECT * FROM user WHERE login='florian09#' AND password='$password'");
```

Knowing that the '#' is a tag to indicate a comment, the query becomes:

```
$req = $bdd->query("SELECT * FROM user WHERE login='florian09#'")
```

So the passwords are no longer checked!

?[What is an SQL query ?]
-[ ] Send a message 
-[x] Do a search in a database
-[ ] Show something on the website

| Title         | Date out | film Genre |
| :------------ |:-------------:| :-----:|
| Avatar        | 2009          |Fantasy|
| Matrix      | 1999     |   Science-fiction |
| Les Goonies |  1985 |    Ation |

The query in the exercise below can be translated as: "Select ** all ** in the column ** title ** where the genre is ** adventure **". Make sure to change the request so that all genres are selected.

@[Show all film!]({"stubs": ["for_user_sql.txt"], "command": "python tester_sql.py", "project": "exo2"})

:::Need help ?
Use the '#' to comment on the part of the code you want to render inoperative.
:::
