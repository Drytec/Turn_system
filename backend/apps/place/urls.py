from django.urls import path
from .views import PlaceListAPIView, PlaceDetailAPIView


urlpatterns = [
    path('', PlaceListAPIView.as_view(), name='place_api'),
    path('<int:pid>/', PlaceDetailAPIView.as_view(), name='place_detail'),
]
