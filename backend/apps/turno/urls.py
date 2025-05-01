from django.urls import path

from .views import ShowTurn, CreateTurn

urlpatterns=[
    path('',ShowTurn.as_view(),name='showt'),
    path('create',CreateTurn.as_view(),name='create'),
]