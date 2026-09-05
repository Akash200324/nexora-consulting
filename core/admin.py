from django.contrib import admin
from .models import FGACohort

@admin.register(FGACohort)
class FGACohortAdmin(admin.ModelAdmin):
    list_display = ('cohort_number', 'start_date', 'start_time', 'end_time', 'capacity', 'is_active')
    list_filter = ('is_active', 'start_date')
    search_fields = ('cohort_number',)
    ordering = ('start_date', 'start_time')
