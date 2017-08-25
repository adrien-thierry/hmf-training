# Compiler & Decompiler

A compiler is the term used to designate a program that transforms a written source code in a programming language into another computer language.
It transforms a simple language comprehensible by man into a more complex language comprehensible by machine, machine language.
Conversely, a program performing the inverse stain is a decompiler.

For example, after writing a program in C language, we can compile it with GCC in order to have an executable of our program.

`gcc mon_programme.c -o mon_executable`

# Interpreteur

The interpreter is a tool that analyzes your source code, translates it into machine language and executes it.
Where your compiler compiles your code once and generates an executable, the interpreter will re-interpret your code every time you launch your program.

* A script program is executed from the source file via a script interpreter.
* A compiled program is executed from a block in machine language resulting from the translation of the source file.
* A "semi-interpreted" or "semi-compiled" language includes an interpreter that reads the target language before generating a "Bytecode". A virtual machine will then execute this bytecode. The best-known semi-interpreted language is Java.