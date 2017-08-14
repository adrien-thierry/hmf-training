output = open("file.txt", "r")
needed = open ("test_universe.py", "r")

correct = output.readline()
user = needed.readline()

if correct != user:
    raise NameError('ERREUR')
else:
    exit(0)
