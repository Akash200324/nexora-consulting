from django.urls import path
from . import views

app_name = 'assessment'

urlpatterns = [
    path('', views.assessment_view, name='index'),
    path('section-2/', views.assessment_section_02, name='assessment_section_02'),
    path('section-3/', views.assessment_section_03, name='assessment_section_03'),
    path('section-4/', views.assessment_section_04, name='assessment_section_04'),
    path('section-5/', views.assessment_section_05, name='assessment_section_05'),
]
