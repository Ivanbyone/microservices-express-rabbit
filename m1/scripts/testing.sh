# !/bin/bash

npm run test

if [ $? -ne 0 ]; then
    echo "Testing was failed!"
    echo "Script stopping"
    exit 1
else
    echo "Testing was correct!"
fi

# Запуск скрипта
# chmod +x scripts/testing.sh
# scripts/testing.sh