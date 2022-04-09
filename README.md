# API
## Descripton
This API allows you to get the stored data from mysql database with the needed percentages that will be shown in frontend.


## Technologies
    -Django for the server side:
        Django enables rapid development with many features.
    -React JS for the client side:
        React is component-based and makes it super easy to create User Interfaces.
    -MYSQL Database.
    -flake8 as a linter.
    -autopep8 for formatting.
    -Testing by django.test

## How To Run The App locally
``` 
    Backend

    clone repo: git clone https://github.com/moatazalazamy/Case-Study.git 
    pip3 install virtualenv
    cd project
    virtualenv env
    import the database file: https://drive.google.com/file/d/1VGQ11lGPNPfyH0rxunwMV8EotX-4IIX7
    source env/bin/activate
    add .env file like .env.example(defines your database and secret key)
    pip3 install -r requirements.txt
    python manage.py runserver 
```
```
    Frontend

    cd jumia-front
    npm install
    npm start
```
## How To Run The App through Docker
```
    docker-compose up -d --build
```

## Run tests
``` python manage.py test ```

## Database file for importing
https://drive.google.com/file/d/1VGQ11lGPNPfyH0rxunwMV8EotX-4IIX7

## Recorded Local Run
https://drive.google.com/file/d/10D8mQve8qX49IPZ3qbO2M54njnN1TMVf


