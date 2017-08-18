output = open("for_user_sql.txt", "r")
needed = open ("correct_sql.txt", "r")

correct = output.readline()
user = needed.readline()

if correct != user:
    print("TECHIO> success false")
else:
    print("Bien :)")
