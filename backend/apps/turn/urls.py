from django.urls import path
from .views import TurnAPIView, CloseTurnAPIView, TurnStatsAPIView, NextTurnAPIView, UserActiveTurnAPIView, UserTurnsAPIView


urlpatterns = [
    path('user_turns/<int:uid>', UserTurnsAPIView.as_view(), name='user_turns'),
    path('', TurnAPIView.as_view(), name='turns'),
    path('close_turn/<int:uid>/<int:tid>',
         CloseTurnAPIView.as_view(), name='close_turn'),
    path('stats/', TurnStatsAPIView.as_view(), name='turn_stats'),
    path('user_active_turn/<int:uid>',
         UserActiveTurnAPIView.as_view(), name='user_active_turn'),
    path('next_turn/<int:uid>/<int:pid>/',
         NextTurnAPIView.as_view(), name='next_turn')
]
