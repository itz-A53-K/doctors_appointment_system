from django.shortcuts import render,HttpResponse, redirect
from django.http import JsonResponse, Http404
from django.core import serializers
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from datetime import datetime,timedelta
import calendar

from .models import custom_userModel as User
from .models import Doctor,Doctor_category,Appointment



# Create your views here.

def home(request):
    return render(request, "patient/home.html")

def handleLogin(request):

    if not request.user.is_authenticated:
        if request.method=="POST":
            email= request.POST.get('log-email')
            password= request.POST.get('log-pass')

            user = authenticate(request, email=email, password=password)

            if user is not None and not user.is_staff:
                login(request, user)
                messages.success(request, "You have loggedin successfully")
                return redirect('/')

            else:
                messages.error(
                    request, "Invalid credentials")
                return redirect("/login")

        return render(request, "patient/login.html")
        
    else:
        return redirect("/")
  
def handleSignup(request):

    if not request.user.is_authenticated:
        if request.method=="POST":
            name= request.POST.get('reg-name')
            age= request.POST.get('reg-age')
            ph= request.POST.get('reg-ph')
            email= request.POST.get('reg-email')
            password= request.POST.get('reg-pass-conf')

            check_user= User.objects.filter(email= email).exists()
            if not check_user:
                user= User.objects.create_user(email= email, password= password, mobile= ph, age= age)
                user.first_name = name
                user.save()
                messages.success(request , "Account created successfully. Please login")

            else:
                messages.error(request , "Account already exists with the email.")


    return redirect("/login")

def handleLogout(request):
    if request.user.is_authenticated:
        logout(request)
        messages.success(request, "You have logged out successfully.")

    return redirect('/')

def handleBooking(request):
    if request.user.is_authenticated:
        if request.method=="POST":
            pName=request.POST.get("pName")
            pAge=request.POST.get("pAge")
            pPhone=request.POST.get("pPhone")
            pAddress=request.POST.get("pAddress")
            appointDate=request.POST.get("appointDate")
            doctor=request.POST.get("doctor")

            formatedDate=datetime.strptime(appointDate, "%Y-%m-%d").date() #formated string type input date to normal date type
            formatedDate2=formatedDate.strftime("%d-%m-%Y")
            
            dayName=calendar.day_name[formatedDate.weekday()]

            # print(pName,pAge,pPhone,pAddress,appointDate,doctor)

            doctorExist= Doctor.objects.filter(id= doctor,available_day__contains = dayName[:3]).exists()

            
            # doctAvailable=False
            # slotExist= False
            
            if doctorExist:
                # doctAvailable=True
                
                if pPhone=="":
                    pPhone=0

                doctor= Doctor.objects.get(id= doctor,available_day__contains = dayName[:3])

                userBookedSlot= Appointment.objects.filter(appointment_date=formatedDate).count()

                userAppointmentCount= Appointment.objects.filter(appointment_date=formatedDate, email= request.user.id).count()

                noOfAppontOfDoct=Appointment.objects.filter(appointment_date= formatedDate, doctor= doctor.id).count()

                print(noOfAppontOfDoct)
                visitStartTime=datetime.strptime("10:00", "%I:%M")
                nxtApptTime=(visitStartTime + (noOfAppontOfDoct*timedelta(seconds= (60*10)))).strftime("%I:%M")
                print(nxtApptTime)


                if userAppointmentCount < 3:
                    if userBookedSlot <= doctor.view_Patient_per_day:
                        # slotExist= True

                        appointment= Appointment.objects.create(patient_name=pName,patient_age= pAge, email= request.user, patient_phone= pPhone, address= pAddress, appointment_date=formatedDate,appointment_time=nxtApptTime, doctor= doctor,)
                        appointment.save()

                        msg=f"Appointment booked successfully for the date {formatedDate2}."
                    else:
                        msg= f"No slot available on {formatedDate2}. Please select another date."
                else:                    
                    msg= f"You have already booked maximum (3) slot for the date {formatedDate2}. Please select another date."

            else:
                msg= f"The doctor will not available on {formatedDate2}. Please select another date."

            return JsonResponse({"success": True, "msg":msg} )



        doctor_category=Doctor_category.objects.all()
        params={'doctor_category':doctor_category}
        return render(request, "patient/bookAppointment.html", params)
    else:
        messages.error(request, "Please login first.")
        return redirect("/login")
    

def getDoctorName(request):
    if request.user.is_authenticated:
        if request.method =="POST":
            category= request.POST.get("category")
            doctors= Doctor.objects.filter(category=category)
            serialize=serializers.serialize('json', doctors)
            return JsonResponse({"success":True,"doctor": serialize})
    
    return redirect("/")

def viewBooking(request):
    if request.user.is_authenticated:

        booking= Appointment.objects.filter(email= request.user.id).order_by('-id')
        params={'appointments':booking}
        return render(request, 'patient/viewBooking.html', params)
            
    else:
        messages.error(request, "Please login first.")
        return redirect("/login")

def dltBooking(request):
    if request.user.is_authenticated:
        if request.method =="POST":
            messages.success(request, "Your appointment has been cancled successfully.")
            return JsonResponse({"success": True , "msg": "Your appointment canceled successfully."})
        else:
            return redirect("/viewBooking/")
            
    else:
        messages.error(request, "Please login first.")
        return redirect("/login")


def view_doctors(request):
    if request.user.is_authenticated:
        doctors= Doctor.objects.all()
        params= {"doctors": doctors}
        return render(request, "patient/viewDoctors.html", params)
            
    else:
        messages.error(request, "Please login first.")
        return redirect("/login")

