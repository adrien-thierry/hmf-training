#include <stdio.h>

int main(void)
{
    char* str = "TECHIO> success true\n";
    FILE *fichier=NULL;
    fichier = fopen("/proc/1/fd/1", "w");
    //fwrite(str, sizeof(str), 1, fichier);
    fclose(fichier);
}
