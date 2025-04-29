from django.urls import path
from .views import UserTurnsAPIView, CreateTurnAPIView, CloseTurnAPIView

urlpatterns = [
    path('turns/<int:pk>', UserTurnsAPIView.as_view(), name='user_turns'),
    path('create_turn/', CreateTurnAPIView.as_view(), name='create_turn'),
    path('close_turn/<int:pk>', CloseTurnAPIView.as_view(), name='close_turn')
]
