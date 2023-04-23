# doctors_appointment_system
Using django

It is a simple doctor's appointment system project . This project is made using Django as a backend language. 
There are some modules used in this project , so we new to install those while use this project in a new machine to run the project properly.

In the fiirst i'm asumeing that the PC have Python installed in it. If not please install it first.

After having Python installed , visit the location where the 'manage.py' file located. Open the terminal ( windows default terminal or any other terminal ) on that location and run the following commands :-
( the terminal location have to be something like this : 'C:\Users\..\doctorAppointment> ' )
1) run the command ' pip install -r requirements.txt '
      This command will download all the modules / packages that are required.
    
2) run ``` python manage.py runserver ```

3) visit ' 127.0.0.1:8000 ' in your browser 

by default use the followinf credentials to login as clinic on the page ' /clinic/login/ ' 
Email:- ab@ab.com
Passwod:- 123123





Note : - If any error occered while running ' python manage.py runserver ' , then try the following steps:-

1) run ' python manage.py makemigrations '
2) run ' python manage.py migrate '
3) run ' python manage.py createsuperuser '
      after running the 3rd one provide any email and password and remember it as it is required to login as ADMIN in the future future .
4) run 'python manage.py runserver '


In case the error was not resolved , please contact us 
