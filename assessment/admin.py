from django.contrib import admin
from .models import AssessmentSubmission, CTAInteraction

@admin.register(AssessmentSubmission)
class AssessmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'company', 'email', 'whatsapp', 'assessment_score', 'created_at')
    list_filter = ('created_at', 'industry', 'team_size')
    search_fields = ('full_name', 'company', 'email')
    readonly_fields = ('created_at', 'updated_at', 'assessment_score')

@admin.register(CTAInteraction)
class CTAInteractionAdmin(admin.ModelAdmin):
    list_display = ('id', 'source', 'action', 'status', 'submission', 'created_at', 'utm_source', 'utm_campaign')
    list_filter = ('status', 'source', 'created_at', 'utm_source', 'utm_campaign')
    search_fields = ('user_agent', 'ip_address', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign')
    readonly_fields = ('created_at',)
