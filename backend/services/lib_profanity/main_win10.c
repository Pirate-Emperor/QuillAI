#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

#define MAX_WORD_LEN 40 // Maximum length of a word

/* This file is source code of lib for python + ctypes with one function. Works only on WSL2 or linux. 
This function takes in a message and a threshold value and returns 1 if the message contains any of the bad words, and 0 otherwise.
There a lot of comments because I can't fast read C code.
To compile on windows using MinGW, but not sure how effective it will be
*/

int process_message(char* message, float threshold, int min_count) {
    int matches_count = 0;
    int message_len = strlen(message);

    char** bad_words = NULL; // Pointer to an array of bad words with large size file
    int num_words = 0;
    // open csv file to current memory
    FILE* csv_file = fopen("profanity_en.csv", "r");
    if (!csv_file) {
        printf("Error: incorrect path to bad_words.csv\n");
        return 1;
    }

    char line[1024]; // buffer for reading the CSV file
    while (fgets(line, sizeof(line), csv_file)) { // to read line by line from file
        char* word = strtok(line, ","); // split the line by ,
        while (word) { 
            // dynamic allocate memory by size of num_words * size one char
            bad_words = (char**)realloc(bad_words, (num_words + 1) * sizeof(char*)); 
            if (!bad_words) {
                // be sure to free the memory in RAM, or it will lead to memory leak
                printf("Error: out of memory\n"); 
                break;
            }
            bad_words[num_words] = _strdup(word); // copy word to bad_words
            num_words++; // increase the number of words, see to realloc
            word = strtok(NULL, ","); // get next word
        }
    }

    fclose(csv_file); // close the file

    int num_bad_words = num_words;  // get array length
    // compare message with each bad words
    for (int i = 0; i < num_bad_words; i++) {
        int bad_word_len = strlen(bad_words[i]); // get length of bad word str
        float similarity = 0.0; // start similarity with 0, other in python
        int matches = 0; // start matches with 0, other in python
        // compare to n = bad_word_len - 1, because _strnicmp will compare from 0 to n char strs
        for (int j = 0; j <= message_len - bad_word_len; j++) {
            if (_strnicmp(message + j, bad_words[i], bad_word_len) == 0) {
                matches++;
                j += bad_word_len - 1; // next iteration of similarity on next char
            }
        }
        // calculate similarity percentage
        similarity = (float)matches / bad_word_len;
        printf("similarity: %f\n", similarity); // in dev 
        if (similarity >= threshold) {
            matches_count++;
        }
    }

    // free the memory allocated for bad_words
    for (int i = 0; i < num_words; i++) {
        free(bad_words[i]);
    }
    free(bad_words);

    // binary return to python, 0 - message is not bad, 1 - message is bad 
    if (matches_count >= min_count) {
        return 1; 
    }
    return 0;
}
