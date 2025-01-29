#!/bin/bash
# Скрипт для линтинга и фикса ошибок, если они есть

npm run pr:lint

if [ $? -ne 0 ]; then
    echo "Lint errors occured!"
    echo "Go fix"
    npm run pr:fix
else
    echo "Lint was correct!"
fi

# Запуск скрипта
# chmod +x scripts/lint-fix-prettier.sh
# scripts/lint-fix-prettier.sh