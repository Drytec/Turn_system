
from django.urls import path
from .views import PlaceListAPIView,PlaceRetrieveAPIView,PlaceViewSet
urlpatterns=[
    path('dylan',PlaceListAPIView.as_view(),name='showkkk'),
    path('',PlaceViewSet.as_view({'get': 'list','post':'create'}),name='all'),

]
