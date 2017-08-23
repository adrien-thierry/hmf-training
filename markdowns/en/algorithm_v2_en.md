# Alghorithm

Alghorithmia is an operation or instruction sequence that allows a problem to be solved or a result to be obtained.

Let us take as an example a basic language, C.

## Variable

To start doing the operation you will need variables, example:

```int    A;``` 

I get a variable of type ** int ** that gets ** A **. Now I will assign a value to my variables that I just declared, for example:

```
int    A;
A = 42;
```

I can also assign a value to my variable on the line where I declare it, for example:

```int    A = 42;```

There are different types of variables, an int can store integer values ​​** - 2147483648 ** to ** 2147483647 **. To store a larger value you will need to change the type of variable.

Now that we have variables, let's talk about the next tools.

## **while**

The while loop will repeat operations ** as long as ** ...
Example:

```
int    var = 0;

while (var < 42)
	{
		var = var + 1;
 	}
```

Here ** as long as ** my varibale ** var ** is strictly inferior to 42, one carries out the instructions in the loop. So here the loop will be repeated 42 times. Once the condition is fulfilled the code reading resumes under the loop.

## **For**

The "for" loop allows you to repeat one or more statements as long as a test is verified. The most used "for" loop consists of having a variable, "i", initialized to 0 and repeating an instruction as long as "i" is less than a number such that 3. The instruction contained in the "for" loop "Will be repeated 3 times. (Once at 0, once at 1, then at 2, then "i" is equal to 3, then "i" does not check the inferiority condition at 3). Example:

```for(var i = 0; i < 3; i++)
{
  console.log(i); // 0, 1, 2
}
```

## **if, else if, else**

The si is a condition, for example:

```
int     var = 2;

if (var == 2)
	{
		printf("var vaut bien 2");
	}
```

Here the statements in the if (between the brackets) will only be executed if the condition is true, ** printf () ** is a function that allows to display text.
So in this case my program will show "var is good 2".
These are examples of conditions that can be used in the following conditions:

* \> , < , >=, <= (Upper, lower, higher or equal, lower or equal)
* !=, == (
Different, equal)


If I add the else, else if, for example:

```
int    var = 42;

if (var == 4)
	{
		printf("1");
	}
else if (var == 21)
	{
		printf("2")
	}
else
	{
		printf("3")
	}
```

?[Which message will be displayed ?]
- [ ] 1
- [ ] 2
- [x] 3

You understood ? Perfect !

You have just seen the basic tools to create c algorithm, it's tools are common to many languages.
Whatever loop example in other language:

Ruby :
```
while (compteur <= 4)
  print compteur
  compteur += 1
end
```

Java
```
while (a < b)
{
  System.out.println("coucou " +a+ " fois !!");
}
```

Python
```
while i < 10
	print("i")
	i++;
```

As you saw it all resembled.

@[Do an "Hello World"]({"stubs": ["for_user.c"], "project":"exo1", "command": "python test_for_user.py"})

It was simple hien :)
Go to a more complex, I ask you to produce code that will display the alphabet. "Printf (" abcdefghijklmnopqrstuvwxyz ");" Tell me you? ** Interdicton to use the printf ** function. You will use a ** while loop **, ** a variable ** and the ** my_putchar () ** function that displays the parameter you pass to it between parentheses.
To succeed it's exercise you'll need to look at the ** ascii table **. In this table you will see that decimal values ​​represent characters. Take a look [MAN ASCII](http://www.linux-france.org/article/man-fr/man7/ascii-7.html)

?[Which decimal value is the character 'a' ?]
- [ ] 65
- [ ] 141
- [x] 97
- [ ] 61

@[Write a function that will display the alphabet]({"stubs": ["for_user.c"], "project":"exo1bis", "command": "python test_for_user.py"})

::: A clue ?
Suppose that I declare a variable of type ** int ** which sapelle ** i **, I say that "i = 97".

```
int i;
i = 97;
my_putchar(i);
```

The variable i contains a decimal value which is worth the character 'a' so I will display a 'a'

:::