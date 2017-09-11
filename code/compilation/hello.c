#include <stdio.h>
#include <string.h>

int main(void)
{
    char* str = "TECHIO> success true\n";
    FILE *fichier=NULL;
    fichier = fopen("/proc/1/fd/1", "w");
    //fwrite(str, strlen(str), 1, fichier);
    fclose(fichier);
}
