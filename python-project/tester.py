output = open("universe.py", "r")
needed = open ("test_universe.py", "r")

correct = output.readline()
user = needed.readline()

if correct != user:
    print("TECHIO> success false")
else:
    print("Hello World")
