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
* Material UI библиотека предоставлющая готовые UI компоненты
* Redux Toolkit для управления глобальным хранилищем данных
* RTK Query для обработки асинхронных запросов к API

## Быстрый старт

Для запуска проекта локально вы можете использовать docker-compose из данного репозитория. Здесь описано, как запустить этот проект локально с помощью docker-compose:

1. Клонируйте репозиторий

`git clone https://github.com/fengerz/fetchfab`

2. Настройте параметры окружения

Скопируйте файл в папке frontend .env.example и переименуйте в .env

Аналогично скопируйте файла в папке backend .env.example и переименуйте в .env

3. Выполните установку зависимостей

`sudo docker-compose exec php composer install`

`sudo docker-compose run --rm npm run install`

4. Выполните первичную инициализацию

`sudo docker-compose exec php /var/www/html/artisan key:generate`

`sudo docker-compose exec php /var/www/html/artisan storage:link`

`sudo docker-compose exec php /var/www/html/artisan migrate --seed`

5. Запустите docker-compose

`sudo docker-compose -f docker-compose.dev.yml up --build -d`

## Заполнение базы данных

* Данная команда создаст 10 пользователей в базе данных
* Каждому пользователю будет выдано 10 собственных моделей, 10 понравившихся моделей, 2 коллекции моделей и 10 комментариев

`sudo docker-compose exec php /var/www/html/artisan db:seed --class=FactorySeeder`

*Примечание: при возникновении ошибки, повторить вызов команды*

## Сборка для продакшн

* Для редактирования домена откройте в редакторе файл .env в папке frontend и при необходимости измените значение *VITE_API_URL*, а также откройте в редакторе файл .env в папке backend и при необходимости измените значения *SANCTUM_STATEFUL_DOMAINS* и *SESSION_DOMAIN*. Следует также изменить параметры *server_name* в файле config/nginx/production/default.conf

* Для редактирования пароля базы данных откройте в редакторе файл docker-compose.dev.yml и при необходимости измените значения  *MYSQL_PASSWORD* и *MYSQL_ROOT_PASSWORD*, а также продублируйте пароль в файле backend/.env в значении *DB_PASSWORD*

* Команды для запуска сборки

`sudo docker-compose run --rm npm run build`

`sudo docker-compose up --build -d`

## Решение возможных проблем

* В случае возникновения ошибок, связанных с Cross-Origin Resource Sharing (CORS) измените значение переменной *allowed_origins* в файле backend/config/cors.php