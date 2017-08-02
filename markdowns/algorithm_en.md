# Algorithm

An algorithm is a finite and unambiguous sequence of operations or instructions for solving a problem or obtaining a result. A computer program is composed of a set of algorithms. For this course, we will use the JAVASCRIPT language for examples. In Javascript, '//' meeans that the following is a comment, and will therefore not be considered to be code to be executed.

# Variables

On the basis of an algorithm, there are the variables. A variable is used to store data for later use. To assign a variable, ie to give it a value, use the '=' sign. Example:

```var name = "John Doe";```

## If, esle if, else

The 'if' is a test to check whether a condition is true or false. An example :

```var test = 1;
if(test == 1)
{
  console.log("test == 1");
}
```

To complete an 'if', or refine it, we can add 'else' or 'else if' tests :

```var test = 1;
if(test == 1)
{
  console.log("test == 1");
}
else if(test == 0)
{
  console.log("test == 0");
}
else console.log("test != 1 && test != 0");
```
## For

The 'for' loop allows you to repeat one or more instructions as long as a test is verified. The most used 'for' loop consists of having a variable, 'i', initialized to 0, and repeating an instruction as long as 'i' is less than a number, such as 3. Thus, the instruction contained in the loop 'For' will be repeated 3 times. (Once at 0, once at 1, then at 2, then 'i' is equal to 3, so 'i' does not check the inferiority condition at 3). Example :

> for(var i = 0; i < 3; i++)
{
  console.log(i); // 0, 1, 2
}
  