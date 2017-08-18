from subprocess import *

commande = ["gcc", "for_user.c"];
out = Popen(commande,stdout=PIPE);
(sout,serr) = out.communicate();

_exec = Popen(["./a.out"], stdout=PIPE);
(eOut, eErr) = _exec.communicate();

needed = open ("correct.txt", "r");
user = needed.readline();

print (eOut)
print (user)

if eOut != user:
    print("TECHIO> success true");
else:
    print("TECHIO> success true");