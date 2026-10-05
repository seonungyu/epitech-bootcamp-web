#!/bin/bash
for file in *.md; do
    if [ -f "$file" ]; then
        echo "This is a new line." >> "$file"
    fi
done
