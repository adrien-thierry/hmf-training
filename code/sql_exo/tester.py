output = open("for_user.txt", "r")
needed = open ("correct.txt", "r")

correct = output.readline()
user = needed.readline()

if correct != user:
    print("TECHIO> success false")
else:
    print("Bien :)")
