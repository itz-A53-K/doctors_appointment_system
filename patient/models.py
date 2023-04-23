from django.db import models

from django.contrib.auth.models import AbstractUser
from .manager import customUserManager
from multiselectfield import MultiSelectField # installed as "pip install django-multiselectfield"

# Create your models here.

class custom_userModel(AbstractUser):
    # custom user model
    username= None
    email= models.EmailField(unique=True)
    
    mobile= models.BigIntegerField(null=True, blank=True)

    age= models.IntegerField(null=True,blank=True)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS = []

    objects = customUserManager()
    def __str__(self):
        return self.email

class Doctor_category(models.Model):
    category_id=models.BigAutoField(primary_key=True)
    category=models.CharField(max_length=100)
    category_desc=models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.category
    
    # CATEGORY            CATEGORY DESC

	# Endocrinologist	  :Diabetes and Thyroid Specialist
	# Dentist	           -
	# Pediatrician        :Child Specialist
	# Therapist	           -
	# Dermatologist       :Skin, Hair, Nails Specialist
	# Gynaecologist        -
	# Cardiologist        :Heart Disease Specialis
	# Orthopedist	       -
	# Audiologists        :Ear specialist

class Doctor(models.Model):
   

    DAYS_OF_WEEK = (
        ("Mon", ("Monday")),
        ("Tue", ("Tuesday")),
        ("Wed", ("Wednesday")),
        ("Thu", ("Thursday")),
        ("Fri", ("Friday")),
        ("Sat", ("Saturday")),
        ("Sun", ("Sunday")),
    )
    
    id=models.BigAutoField(primary_key=True)
    doctor_name= models.CharField(max_length=200)
    doctor_email= models.EmailField(max_length=254, null=True, blank=True)
    phone_no= models.BigIntegerField(null=True, blank=True)
    degrees= models.CharField(max_length=100)
    category=models.ForeignKey(Doctor_category, on_delete=models.CASCADE)
    available_day= MultiSelectField(choices=DAYS_OF_WEEK,max_choices=7, max_length=50)

    view_Patient_per_day= models.PositiveIntegerField()
    
    unavailable_Today= models.BooleanField(default=False)

    def __str__(self):
        return self.doctor_name
    

class Appointment(models.Model):
    id= models.BigAutoField(primary_key=True)
    patient_name= models.CharField(max_length=100)
    patient_age= models.PositiveSmallIntegerField()
    email= models.ForeignKey(custom_userModel,on_delete=models.CASCADE)
    patient_phone= models.PositiveBigIntegerField(null=True,blank=True)
    address= models.CharField(max_length=300)
    appointment_date= models.DateField()
    appointment_time= models.TimeField( null= True, blank=True)
    doctor=models.ForeignKey(Doctor, on_delete=models.CASCADE)
    bookTime= models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.email.email

