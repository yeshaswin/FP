# FP
react-django user authentication and file upload

## Setup backend

Install the requirements

```
pip install -r requirements.txt
```

Run the migrations:

```
python manage.py migrate
```

Run the server

```
python manage.py runserver 0.0.0.0:5000

```

Routes:

Go to `localhost:5000/api`, there you will see all the endpoints of the Api.

## Setup front-end

Move to front dir
```
cd frontend
```

Install the requirements

```
npm i
```


Run the server

```
npm start

```
Go to `localhost:3000`, there you will see the application.
