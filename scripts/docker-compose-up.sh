# !/bin/bash

cd m1

chmod +x scripts/lint-fix-prettier.sh
scripts/lint-fix-prettier.sh

chmod +x scripts/testing.sh
scripts/testing.sh

cd ..
cd m2

chmod +x scripts/lint-and-fix.sh
scripts/lint-and-fix.sh

cd ..

docker-compose up -d

# Запуск скрипта
# chmod +x scripts/docker-compose-up.sh
# scripts/docker-compose-up.sh