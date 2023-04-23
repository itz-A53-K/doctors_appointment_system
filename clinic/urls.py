from django.urls import path
from clinic import views

urlpatterns = [
    path('home/', views.clHome, name="clHome"),
    path('allAppointment/', views.allAppmnt, name="allAppmnt"),
    path('doctors/', views.doctors, name="doctors"),    
    path('new_App/', views.new_App, name="new_App"),
    path('add_doct/', views.add_doct, name="add_doct"),
    path('del_doct/', views.del_doct, name="del_doct"),

    path('login/', views.clLogin, name="clLogin"),
    path('logout/', views.clLogout, name="clLogout"),
    
]
