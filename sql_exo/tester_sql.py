output = open("for_user_sql.txt", "r").readline();
needed = open ("correct_sql.txt", "r").readline();

if output.index("#") > -1:

	correct = output.split("#")[0]

	if correct != needed:
	    print("TECHIO> success false")
	else:
	    print("Bien :)")

else: print("TECHIO> success false")