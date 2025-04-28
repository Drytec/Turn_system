from django.contrib.auth.views import LoginView
from django.urls import path
from .views import UserApiView,UserExplain,Login,Logout
urlpatterns=[
    path('',UserApiView,name='usuario'),
    path('usuario/<int:pk>',UserExplain,name='explain'),
    path('login',Login.as_view(),name='login'),
    path('logout',Logout.as_view(),name='logout'),

]
