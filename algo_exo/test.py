from subprocess import *

commande = ["gcc", "for_user.c"]
out = Popen(commande,stdout=PIPE)
(sout,serr) = out.communicate();
print sout;

_exec = Popen(["./a.out"], stdout=PIPE);
(eOut, eErr) = _exec.communicate();
print eOut;
