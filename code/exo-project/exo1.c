#include "my.h"

int	disp(char *str)
{
  int	i = 0;
  while (str[i] != '\0')
    i++;
  write(0, &str, i);
}
