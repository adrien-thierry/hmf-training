from subprocess import *

commande = ["gcc", "for_user.c"];
out = Popen(commande,stdout=PIPE);
(sout,serr) = out.communicate();

_exec = Popen(["./a.out"], stdout=PIPE);
(eOut, eErr) = _exec.communicate();
print (eOut)

needed = open ("correct.txt", "r");
user = needed.readline();

if eOut != user:
    print("TECHIO> success false");
else:
    print("Hello World");