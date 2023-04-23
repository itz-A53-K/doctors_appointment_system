from django.urls import path
from patient import views

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.handleLogin, name="handleLogin"),
    path('signup/', views.handleSignup, name="handleSignup"),
    path('logout/', views.handleLogout, name="handleLogout"),

    path('bookAppointment/', views.handleBooking, name="handleBooking"),
    path('viewBooking/', views.viewBooking, name="viewBooking"),
    path('dltBooking/', views.dltBooking, name="dltBooking"),

    path('getDoctorName/', views.getDoctorName, name="getDoctorName"),
    path('view_doctors/', views.view_doctors, name="view_doctors"),
]
