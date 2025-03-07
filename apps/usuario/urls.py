from backend.Desarrollo1.urls import urlpatterns
from django.urls import path
from .views import UserApiView,UserExplain
urlpatterns=[
    path('',UserApiView,name='usuario'),
    path('usuario/<int:pk>',UserExplain,name='explain'),
]
