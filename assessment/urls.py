from django.urls import path
from . import views

app_name = 'assessment'

urlpatterns = [
    path('', views.assessment_view, name='index'),
    path('section-2/', views.assessment_section_02, name='assessment_section_02'),
]
