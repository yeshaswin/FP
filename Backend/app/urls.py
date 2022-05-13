from django.urls import path
from rest_framework import routers


from .views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', apioverview),
    path('task-list/', tasklist),

    path('task-detail/<int:pk>/', taskdetail),
    path('task-create/', taskcreate),
    path('login/',loginin),
    path('logout/',logout),
    path('uauth/',uauth),
    path('task-update/<int:pk>/', taskupdate),
    path('task-delete/<int:pk>/', taskdelete),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

