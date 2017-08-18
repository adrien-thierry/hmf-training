output = open("for_user_sql.txt", "r")
needed = open ("correct_sql.txt", "r")

if output.index("#") > -1:

	correct = output.readline().split("#")[0]
	user = needed.readline()

	if correct != user:
	    print("TECHIO> success false")
	else:
	    print("Bien :)")

else: print("TECHIO> success false")