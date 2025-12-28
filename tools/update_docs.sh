#!/bin/sh
#rm -rf docs;
#(cd ~/CS367/Projects/P2/floating-point-calculator/build/; doxygen doxygen.config)
#cp -r ~/CS367/Projects/P2/floating-point-calculator/build/docs .
rsync --archive ~/CS367/Projects/P2/floating-point-calculator/build/docs .
