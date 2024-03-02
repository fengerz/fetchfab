# FetchFab

## Описание

FetchFab - Fullstack pet-проект онлайн каталога трёхмерных моделей. Данный проект позволяет:
1. Пользователям просматривать категории, коллекции и отдельные экзмепляры 3D моделей
2. Создателям трёхмерных моделей загружать и управлять своими моделями и коллекциями
3. Зарегистрированным пользователям скачивать, оставлять комментарии, сохранять в коллекции и лайкать понравившиеся модели

Возможности:
* Docker для упаковки модулей приложения в контейнеры для дальнейшего развёртывания
* Laravel для обеспечиния Backend окружения данного приложения
* React для отображения UI компонентов приложения
* Redux Toolkit для управления глобальным хранилищем данных
* RTK Query для обработки асинхронных запросов к API
* Material UI библиотека предоставлющая готовые UI компоненты
* Feature Slice Design модульная архитектура для гибкости Frontend разработки

## Быстрый старт

Для запуска проекта локально вы можете использовать docker-compose из данного репозитория. Здесь описано, как запустить этот проект локально с помощью docker-compose:

1. Клонируйте репозиторий и перейдите в папку проекта

`git clone https://github.com/fengerz/fetchfab`

`cd fetchfab`

2. Настройте параметры окружения

Скопируйте файл в папке frontend .env.example и переименуйте в .env

Аналогично скопируйте файла в папке backend .env.example и переименуйте в .env

3. Выполните установку зависимостей

`sudo docker-compose -f docker-compose.dev.yml up --build -d php`

`sudo docker-compose -f docker-compose.dev.yml exec php composer install`

`sudo docker-compose -f docker-compose.dev.yml run --rm npm install`

4. Выполните первичную инициализацию

`sudo docker-compose -f docker-compose.dev.yml exec php /var/www/html/artisan key:generate`

`sudo docker-compose -f docker-compose.dev.yml exec php /var/www/html/artisan storage:link`

`sudo docker-compose -f docker-compose.dev.yml exec php /var/www/html/artisan migrate --seed`

5. Запустите docker-compose

`sudo docker-compose -f docker-compose.dev.yml up --build -d`

## Заполнение базы данных

* Данная команда создаст 10 пользователей в базе данных
* Каждому пользователю будет выдано 10 собственных моделей, 10 понравившихся моделей, 2 коллекции моделей и 10 комментариев

`sudo docker-compose -f docker-compose.dev.yml exec php /var/www/html/artisan db:seed --class=FactorySeeder`

*Примечание: при возникновении ошибки, повторить вызов команды*

## Production сборка

* Для редактирования домена откройте в редакторе файл .env в папке frontend и при необходимости измените значение *VITE_API_URL*, а также откройте в редакторе файл .env в папке backend и при необходимости измените значения *SANCTUM_STATEFUL_DOMAINS* и *SESSION_DOMAIN*. Следует также изменить параметры *server_name* в файле config/nginx/production/default.conf

* Для редактирования пароля базы данных откройте в редакторе файл docker-compose.dev.yml и при необходимости измените значения  *MYSQL_PASSWORD* и *MYSQL_ROOT_PASSWORD*, а также продублируйте пароль в файле backend/.env в значении *DB_PASSWORD*

* Команды для запуска сборки

`sudo docker-compose run --rm npm run build`

`sudo docker-compose up --build -d`

## Получение бесплатного SSL сертификата

Для получения бесплатного SSL сертификата Let's Encrypt необходимо:

* Выполнить команду

`sudo docker-compose exec certbot certbot certonly`

* Укажите домены для которых требуется получить сертификат, например, fetchfab.ru www.fetchfab.ru api.fetchfab.ru
* В качестве метода проверки подлинности выберите вариант webroot
* В качестве пути для webroot введите /var/www/certbot
* После получения сертиката откройте конфигурацию nginx по пути config/nginx/production/default.conf, раскоментируйте все строки и при необходимости измените путь к файлам сертиката в полях *ssl_certificate* и *ssl_certificate_key*
* В файле docker-compose.yml раскоментируйте строки параметра *ports* с портом 443

## Решение возможных проблем

* В случае возникновения ошибок, связанных с Cross-Origin Resource Sharing (CORS) измените значение переменной *allowed_origins* в файле backend/config/cors.php

* В случае возникновения ошибки при запуске Docker контейнеров "sudo: docker-compose: command not found" следует использовать команду "docker compose" вместо "docker-compose"

* В случае возникновения ошибки при сборке контейнеров при подключении к серверу/WSL через Visual Studio Code, используя расширение Remote-SSH, следует разорвать подключение и соединиться с сервером через простой терминал. После сборки можно снова использовать прежний способ подключения