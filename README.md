# SiteBenchmark
Express + Postgresql

## Установка
```sh
npm i
node server.js
```

## БД
Подключение к БД осуществляется через  db/db_connect.json
Пример файла подключения: 
```json
{
    "user": "postgres",
    "host": "localhost",
    "database": "benchmarkdb",
    "password": "1337",
    "port": 5432
}
```
