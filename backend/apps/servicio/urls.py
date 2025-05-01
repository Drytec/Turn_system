
from django.urls import path
from .views import ServicePlaceAPIView
urlpatterns=[
    path('<int:pk>/',ServicePlaceAPIView.as_view(),name='all'),

]