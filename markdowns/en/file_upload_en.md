# File upload

You probably know the HTML tag that allows file upload:
```
<input type="file" />
```

The upload fault is a vulnerability to upload files with an unauthorized extension, this flaw is due to the incorrect configuration of the upload script or the complete absence of security. This is usually present in image upload scripts.

The purpose of this vulnerability is to upload a file with an unauthorized extension. (For example a PHP code) so as to have access to the target server.

There are several methods for passing protection, if there is protection.

You can alter the file at times of upload with '** Tamper Data **', a firefox browser tool. Thanks to this tool you will be able to upload the file as an image.
Once the file upload you no longer have to acceder it and execute it with the URL.

Second method, double exention.

Some site checks ** the extension of the file ** you want to upload, there is a means to bypass this security, ** double extension **.
The idea is to integrate PHP code into a .gif file.
First, create a .gif file with paint for example, then open file with a hexadecimal editor. Add your PHP code in the .gif file, add the .php extension, which we do "file.php.gif".
Uploading will be done without worries!
We went to our file.php.gif?

>http://monsite.com/fichier.php

Done !

## Securing

* Never rely on what the customer can send.
* Check the configuration of Apache to act accordingly.
* Do not place .htaccess in the upload directory
* Do not allow file overwriting
* Generate a random name for the uploaded file and save the name in a database.
* Do not allow to see the index of the upload directory.
* Assign the correct permissions to the directory.
* Check the mime-type with getimagesize () and file extents