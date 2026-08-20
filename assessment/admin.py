from django.contrib import admin
from .models import AssessmentSubmission

@admin.register(AssessmentSubmission)
class AssessmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'company', 'email', 'whatsapp', 'assessment_score', 'created_at')
    list_filter = ('created_at', 'industry', 'team_size')
    search_fields = ('full_name', 'company', 'email')
    readonly_fields = ('created_at', 'updated_at', 'assessment_score')
