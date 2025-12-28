#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef struct list {
  char entry[255];
  struct list *next;
} List;

typedef struct categories {
  List *cs367;
  List *cs471;
  List *cs367_complete;
  List *cs471_complete;
} Categories;

int count_list(List *list);

char timestamp[50];
FILE *fp_tasks = NULL;
FILE *fp_list = NULL;
Categories *cat = NULL;

void init_lists() {
  cat = malloc(sizeof(Categories));
  cat->cs367 = NULL;
  cat->cs367_complete = NULL;
  cat->cs471 = NULL;
  cat->cs471_complete = NULL;
}

void insert_list(List **list, char *str) {
  List *new = malloc(sizeof(List));
  List *walker = *list;
  new->next = NULL;
  strncpy(new->entry, str, strlen(str));
  if(*list == NULL) {
    *list = new;
    return;
  }
  
  while(walker && walker->next) {
    walker = walker->next;
  }
  walker->next = new;
  return;
}

void gen_headers() {
  fprintf(fp_tasks, "<!DOCTYPE html>\n");
  fprintf(fp_tasks, "<html>\n");
  fprintf(fp_tasks, "<title>Task Progress</title>\n");
  fprintf(fp_tasks, "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n");
  fprintf(fp_tasks, "<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">\n");
  fprintf(fp_tasks, "<link rel=\"stylesheet\" type=\"text/css\" href=\"default.css\">\n");
  fprintf(fp_tasks, "<body>\n");
  fprintf(fp_tasks, "<div id=\"toc_container\">\n");
  fprintf(fp_tasks, "<p class=\"toc_title\"><h1>Index</h1></p>\n");
  fprintf(fp_tasks, "<ul class=\"toc_list\">\n");
  fprintf(fp_tasks, "  <li><a href=\"#471\"> CS471 Current Tasks [%2d]</a></li>\n", count_list(cat->cs471));
  fprintf(fp_tasks, "  <li><a href=\"#367\"> CS367 Current Tasks [%2d]</a></li>\n", count_list(cat->cs367));
  fprintf(fp_tasks, "  <li><a href=\"#471_Completed\"> CS471 Completed Tasks [%2d]</a></li>\n", count_list(cat->cs471_complete));
  fprintf(fp_tasks, "  <li><a href=\"#367_Completed\"> CS367 Completed Tasks [%2d]</a></li>\n", count_list(cat->cs367_complete));
  fprintf(fp_tasks, "</ul>\n");
  fprintf(fp_tasks, "</div>\n");
  fprintf(fp_tasks, "<div class=\"w3-container\">\n");
  fprintf(fp_tasks, "<h1>Prof. Andrea's Progress</h1>\n");
  fprintf(fp_tasks, "<b>Last Update:</b> %s\n", timestamp);
}

void get_color(long pct, char *color) {
  if(pct == 100)      strncpy(color, "blue-grey", 255);
  else if(pct >= 90)  strncpy(color, "purple", 255);
  else if (pct >= 75) strncpy(color, "blue", 255);
  else if (pct >= 50) strncpy(color, "green", 255);
  else if (pct >= 25) strncpy(color, "yellow", 255);
  else if (pct >= 15) strncpy(color, "orange", 255);
  else                strncpy(color, "red", 255);
  return;
}

void gen_tasks() {
  char buffer[255];
  char entry_buffer[512];
  char task_name[255];
  char color[255];
  char *tok = NULL;
  long pct = 0;

  while(fgets(buffer, 255, fp_list) != NULL) {
    tok = strtok(buffer, "%");
    sprintf(task_name, "%s</p>\n", tok);
    tok = strtok(NULL, "\n");
    pct = strtol(tok, NULL, 10);

    get_color(pct, color);    

    sprintf(entry_buffer, "%s<div class=\"w3-border\">\n  <div class=\"w3-%s w3-center\" style=\"height:24px;width:%d\%\">%d\%</div>\n</div>\n", task_name, color, pct, pct);
    if(strstr(entry_buffer, "[CS367]") != NULL) {
      if(pct < 100) insert_list(&cat->cs367, entry_buffer);
      else insert_list(&cat->cs367_complete, entry_buffer);
    }
    else if(strstr(entry_buffer, "[CS471]") != NULL) {
      if(pct < 100) insert_list(&cat->cs471, entry_buffer);
      else insert_list(&cat->cs471_complete, entry_buffer);
    }
  }
}

int count_list(List *list) {
  int count = 0;
  while(list) {
    count++;
    list = list->next;
  }
  return count;
}

void print_list(List *list) {
  int task_num = 0;
  while(list) {
    fprintf(fp_tasks, "<p>%2d) %s", ++task_num, list->entry);
    list = list->next;
  }
}

void print_tasks() {
  fprintf(fp_tasks, "<h2 id=\"471\">CS471 Pending Tasks [%2d]</h2>\n", count_list(cat->cs471));
  print_list(cat->cs471);
  fprintf(fp_tasks, "<h2 id=\"367\">CS367 Pending Tasks [%2d]</h2>\n", count_list(cat->cs367));
  print_list(cat->cs367);
  fprintf(fp_tasks, "<h2 id=\"471_Completed\">CS471 Completed Tasks [%2d]</h2>\n", count_list(cat->cs471_complete));
  print_list(cat->cs471_complete);
  fprintf(fp_tasks, "<h2 id=\"367_Completed\">CS367 Completed Tasks [%2d]</h2>\n", count_list(cat->cs367_complete));
  print_list(cat->cs367_complete);
}

void gen_footers() {
  fprintf(fp_tasks, "</div>\n");
  fprintf(fp_tasks, "</body>\n");
  fprintf(fp_tasks, "</html>\n");
}

int main() {
  time_t time_cur;
  struct tm *time_info;
  time(&time_cur);
  time_info = localtime(&time_cur);
  strncpy(timestamp, asctime(time_info), 50);

  fp_tasks = fopen("tasks.html", "w");
  fp_list = fopen("list.txt", "r");

  init_lists();
  gen_tasks();
  gen_headers();
  print_tasks();
  gen_footers();
  fclose(fp_tasks);

  return 0;
}
