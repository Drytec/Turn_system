from django.urls import path
from .views import PlaceListAPIView, PlaceDetailAPIView


urlpatterns = [
    path('', PlaceListAPIView.as_view(), name='places'),
    path('places/<int:pk>', PlaceDetailAPIView.as_view(), name='place_detail'),
]
