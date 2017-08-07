output = open("file.txt", "r")
needed = open ("test_universe.py", "r")

correct = output.readline()
user = needed.readline()

print ("file.txt = ")
print (correct)
print ("test universe =")
print (user)

if correct != user:
    exit(1)
else:
    exit(0)
