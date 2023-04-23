from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from patient.models import custom_userModel as User
from patient.models import *
from django.utils.timezone import datetime
from .forms import addDoct_form

# Create your views here.
def clHome( request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            date= datetime.today().strftime("%Y-%m-%d")
            appointments= Appointment.objects.filter(appointment_date= date)
            params= {"appointments": appointments, "date": 'date'}
            return render(request, "clinic/clHome.html", params)

    else:    
        return redirect("/")   
        
def allAppmnt( request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            appointments= Appointment.objects.all().order_by('-id')
            params= {"appointments": appointments}
            return render(request, "clinic/clHome.html", params)

    else:    
        return redirect("/")   
        
def doctors( request):
    if request.user.is_authenticated:
        if request.user.is_staff:
            doctors= Doctor.objects.all()
            params= {"doctors": doctors}
            return render(request, "clinic/clDoctors.html", params)

    else:    
        return redirect("/")       

def clLogin(request):
    if request.user.is_authenticated:
        return redirect("/") 
    else:
        if request.method == "POST":
            email= request.POST.get("clEmail")
            password= request.POST.get("clPass")

            staffUser= authenticate(request, email=email, password=password )
            if staffUser is not None and staffUser.is_staff == True:
                login(request, staffUser)
                messages.success(request, "You have loggedin successfully")
                return redirect('/clinic/home')
            else:
                messages.error(request, "Invalid username or password")
                print("dlkfjhidhfhdjfjdfh")
                return redirect("/clinic/login")

        return render(request, "clinic/clLogin.html")

def clLogout(request):
    if request.user.is_authenticated and request.user.is_staff and not request.user.is_superuser:
        logout(request)
        messages.success(request, "You have been logged out by the system")

    return redirect("/")
    
def new_App(request):
    if request.user.is_authenticated:          
        doctor_category=Doctor_category.objects.all()
        params={'doctor_category':doctor_category}
        return render(request, "clinic/new_App.html", params)
    
    else:
        messages.error(request, "Please login first.")
        return redirect("/login")
    
def add_doct(request):
    if request.user.is_authenticated:
        if request.method=="POST":
            category_id= request.POST.get("category")          
            # Monday= request.POST.get("Monday")
            
            form = addDoct_form(request.POST)
            if form.is_valid():
                name= form.cleaned_data.get("Name")          
                email= form.cleaned_data.get("Email")          
                phone= form.cleaned_data.get("Phone")          
                degrees= form.cleaned_data.get("degrees")          
                view_Patient_per_day= form.cleaned_data.get("view_Patient_per_day")          
                available_day = form.cleaned_data.get("available_day")

                print(category_id,name,email,phone,degrees,view_Patient_per_day,available_day)  

                doctExist= Doctor.objects.filter(doctor_email= email,category=category_id).exists()
                if not doctExist:
                    category= Doctor_category.objects.get(category_id= category_id)

                    newDoct=Doctor.objects.create(doctor_name=name,doctor_email=email, phone_no= phone, degrees= degrees,category= category, available_day= available_day, view_Patient_per_day= view_Patient_per_day)
                    newDoct.save()
                    messages.success(request, "1 New doctor added successfully.")
                    return redirect("/clinic/doctors")        
                else:
                    messages.error(request, "Doctor already exists.")

        doctCategory=Doctor_category.objects.all()
        params={'doctor_category':doctCategory,"form": addDoct_form}
        return render(request, "clinic/add_doct.html", params)
    
    else:
        messages.error(request, "Please login first.")
        return redirect("/login")

def del_doct(request):
    if request.user.is_authenticated:
        if request.method =="GET":
            try:
                doctID= request.GET.get("id")
                doctor= Doctor.objects.get(id= doctID)
                doctor.delete()
                messages.success(request, "1 Doctor entry deleted successfully")
            except:
                messages.error(request, "Some error occured! Please try again.")

        return redirect("/clinic/doctors/")
    

    else:
        return redirect("/")
