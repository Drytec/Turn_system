from django.urls import path
from .views import TurnAPIView, CloseTurnAPIView, TurnStatsAPIView


urlpatterns = [
    # path('turns/<int:pk>', UserTurnsAPIView.as_view(), name='user_turns'),
    path('', TurnAPIView.as_view(), name='turns'),
    path('close_turn/<int:pk>', CloseTurnAPIView.as_view(), name='close_turn'),
    path('stats/', TurnStatsAPIView.as_view(), name='turn_stats'),
]
