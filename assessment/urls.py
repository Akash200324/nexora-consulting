from django.urls import path
from . import views

app_name = 'assessment'

urlpatterns = [
    path('', views.assessment_view, name='index'),
    path('section-2/', views.assessment_section_02, name='assessment_section_02'),
    path('section-3/', views.assessment_section_03, name='assessment_section_03'),
    path('section-4/', views.assessment_section_04, name='assessment_section_04'),
    path('section-5/', views.assessment_section_05, name='assessment_section_05'),
    path('fga/', views.assessment_fga, name='assessment_fga'),
    path('fga/track-interaction/', views.fga_track_interaction, name='fga_track_interaction'),
    path('bpa/', views.assessment_bpa, name='assessment_bpa'),
    path('bpa/strategy-call/', views.bpa_strategy_call, name='bpa_strategy_call'),
    path('calendly/webhook/', views.calendly_webhook, name='calendly_webhook'),
]
