
# XSS Fault

Cross-site scripting (abbreviated as XSS) is a type of security flaw in websites that allows you to inject content into a page, inject a script into the URL of the target page or into a field .

## How to detect it?

You now arrive on your target's web page, the flaw is found in all forms (search engine, comment systems, guest book chat, try them all!) Provided the HTML is interpreted. To check if HTML is enabled or disabled in a form field you can perform several tests first of all insert basic HTML into the field:

```
<b>Test</b>
```
If the search engine (for example) says this: No results found for the term "Test" is that the XSS fault is there, if it displays this: / B> "there is no flaw look elsewhere on the site or go your way.

There are several types of xss fault,

## The fault xss ephemere

Let's imagine that I have a field that leads me to choose a country.

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/champ_deroulant.PNG "menu déroulant")

Once you have selected a country, here "English", the URL changes, you get something like this:

>http://localhost/vulnerabilities/xss_d/?default=English


What to understand is that "English" is a variable, that can have it edit! If in the URL I change "English" to "Franglais" and I validate, hop I find myself with "Franglais" in the field.

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/Franglais.PNG "Franglais")

If you replace "English" with a small script: 3! For example :

>http://localhost:81/vulnerabilities/xss_d/?default=\<script>alert("Ah!")\</script>

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/ah!.PNG "ah!")

When I validate this URL a warning box aparait with "Ah!" Of posted!
On the basis of this observation, one can easily imagine the full range of possibilities offered by the exploitation of this fault:
* Recovery of cookies
* Redirection of page (phishing for example)
* Keylogging,
* ...

## Permanent xss fault

It is very common to find a space dedicated to comments on the internet, a place where you can leave a trace, if this space is not properly protected it is simple to drag code: 3

Let's say I leave a comment that looks like this:

![alt text](https://raw.githubusercontent.com/adrien-thierry/hmf-training/master/src/xss_perma2.PNG "xss_perma")


My comment will be "I'm a trol", and whenever the page is loaded, a dialog will appear with inside "I'm a big trol".

// here exo dvwa server //


# The solution to protect yourself

A function exists in PHP to solve problem, ** htmlspecialchars () **.
It allows you to replace special characters with HTML entities. Example:

* The symbol & becomes \&amp;
* The symbol " becomes \&quot;
* The symbol ' becomes &\#39;

To protect against XSS faults, it is essential not to trust the user and to clean the inputs permanently.