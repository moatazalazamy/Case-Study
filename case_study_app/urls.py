from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
#router.register("mydata", views.MyModelViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("mydata/",views.get_data),
]
