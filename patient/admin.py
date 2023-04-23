from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from patient.models import *

from .models import custom_userModel as User
# Register your models here.


# admin.site.register(custom_userModel)
@admin.register(User)# registering custom user model
class userModel(admin.ModelAdmin):
        list_display = ['email','first_name','last_name','is_staff']
       
@admin.register(Doctor)
class doctorModel(admin.ModelAdmin):
        list_display = ['doctor_name','category','phone_no','id','available_day','unavailable_Today']
       
@admin.register(Doctor_category)
class Doctor_categoryModel(admin.ModelAdmin):
        list_display = ['category','category_desc']
       
@admin.register(Appointment)
class AppointmentModel(admin.ModelAdmin):
        list_display = ['email','id','patient_name','doctor_name','appointment_date']

        def doctor_name(self,obj):
                link= reverse("admin:patient_doctor_change", args=[obj.doctor.id])
                return format_html('<a href="{}">{}</a>', link, obj.doctor.doctor_name)
       