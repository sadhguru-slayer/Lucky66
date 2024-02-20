from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'budgetc', BudgetCalcViewSet, basename='budgetc')
urlpatterns = [
    path('', include(router.urls)),
]
