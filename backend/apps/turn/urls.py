from django.urls import path
from .views import TurnAPIView, CloseTurnAPIView, TurnStatsAPIView, NextTurnAPIView


urlpatterns = [
    # path('user_turns/<int:pk>', UserTurnsAPIView.as_view(), name='user_turns'),
    path('', TurnAPIView.as_view(), name='turns'),
    path('close_turn/<int:pk>', CloseTurnAPIView.as_view(), name='close_turn'),
    path('stats/', TurnStatsAPIView.as_view(), name='turn_stats'),
    # path('user_active_turn/<int:pk>', UserActiveTurnAPIView.as_view(), name='user_active_turn'),
    path('<int:pk>/next_turn/', NextTurnAPIView.as_view(), name='next_turn')
]
