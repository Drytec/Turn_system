
from django.urls import path
from .views import PlaceListAPIView,PlaceRetrieveAPIView,PlaceViewSet
urlpatterns=[
    path('show/<int:pk>',PlaceRetrieveAPIView.as_view(),name='showCreateDestroy'),
    path('',PlaceViewSet.as_view({'get': 'list','post':'create'}),name='all'),

]
