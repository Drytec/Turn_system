
from  rest_framework.routers import DefaultRouter
from .views import ServicePlaceAPIView,ServiceViewSet

router=DefaultRouter()
#Cuando se usa el viewset se establace el router de la manera siguiente, ahi se aprecia como debe ser construidos
router.register(r'',ServiceViewSet,basename='service')
urlpatterns =router.urls