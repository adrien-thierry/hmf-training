from subprocess import *

commande = ["gcc", "for_user.c", "main.c"];
out = Popen(commande,stdout=PIPE);
(sout,serr) = out.communicate();

_exec = Popen(["./a.out"], stdout=PIPE);
(eOut, eErr) = _exec.communicate();

needed = open ("correct.txt", "r");
user = needed.readline();

eOut = eOut.decode("utf-8");

print (eOut);

if eOut != user:
    print("TECHIO> success false");
else:
    print("TECHIO> success true");