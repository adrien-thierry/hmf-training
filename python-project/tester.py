output = open("file.txt", "r")
needed = open ("test_universe.py", "r")

correct = output.readline()
user = needed.readline()

if correct != user:
    println "TECHIO> success false"
else:
    exit(0)
