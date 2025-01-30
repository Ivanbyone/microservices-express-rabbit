# Пример выполнения тестового задания с применением Express и RabbitMQ

## Инструкция по запуску
1. Скопируйте репозиторий.
```bash
git clone https://github.com/Ivanbyone/microservices-express-rabbit.git
```
2. Создайте .env файлы по аналогии с .env.example.
3. Запустите автоматический скрипт для сборки образов и запуска контейнеров.
```bash
chmod +x scripts/docker-compose-up.sh
```

Затем 

```bash
scripts/docker-compose-up.sh
```

ИЛИ

```bash
docker-compose up -d
```

После запуска контейнеров микросервис m1 доступен на порту 8080, а RabbitMQ Management на порту 15672.