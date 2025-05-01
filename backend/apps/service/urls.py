from django.urls import path
from .views import ServiceListAPIView, ServiceDetailAPIView


urlpatterns = [
    path('', ServiceListAPIView.as_view(), name='services'),
    path('services/<int:pk>', ServiceDetailAPIView.as_view(), name='service_detail'),
]
