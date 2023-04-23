# doctors_appointment_system
Using django

This is a doctor's appointment system project created using Django as the backend language. To properly run the project on a new machine, we need to install some modules and/or packages.

Assuming that Python is already installed on the machine. If not please install it first.

Now navigate to the directory where the 'manage.py' file is located. Open the terminal (Windows default terminal or any other terminal) at that location and run the following commands: (The terminal location should look something like this: ``` C:\Users..\doctorAppointment> ``` )

1) Run the command ``` pip install -r requirements.txt ``` . This command will download all the required modules/packages.

2) Run ``` python manage.py runserver ```.

3) Now visit " 127.0.0.1:8000 " in your browser.

By default, use the following credentials to log in as a clinic on the page "/clinic/login/":
Email: ab@ab.com
Password: 123123




Note: If an error occurs while running ``` python manage.py runserver ```, try the following steps:

1) Run ``` python manage.py makemigrations ```.

2) Run ``` python manage.py migrate ```.

3) Run ``` python manage.py createsuperuser ```. 
      After running the third command, provide any email and password and remember it, as it will be required to log in as ADMIN in the future.

4) Run  ``` python manage.py runserver ```.

If the error still not resolved , please contact us.
