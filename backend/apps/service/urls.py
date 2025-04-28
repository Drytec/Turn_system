from django.urls import path
from .views import ServiceListAPIView, ServiceDetailAPIView


urlpatterns=[
    path('services/', ServiceListAPIView.as_view(), name='service_api'),
    path('services/<int:pk>', ServiceDetailAPIView.as_view(), name='service_detail'),
]