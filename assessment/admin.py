from django.contrib import admin
from .models import AssessmentSubmission, CTAInteraction

@admin.register(AssessmentSubmission)
class AssessmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'company', 'email', 'whatsapp', 'assessment_score', 'first_utm_source', 'last_utm_source', 'created_at')
    list_filter = ('created_at', 'industry', 'team_size', 'first_utm_source', 'last_utm_source')
    search_fields = ('full_name', 'company', 'email', 'first_utm_source', 'first_utm_campaign', 'last_utm_source', 'last_utm_campaign')
    readonly_fields = ('created_at', 'updated_at', 'assessment_score', 
                       'first_utm_source', 'first_utm_medium', 'first_utm_campaign', 'first_utm_content', 'first_utm_term', 'first_landing_page', 'first_touch_at',
                       'last_utm_source', 'last_utm_medium', 'last_utm_campaign', 'last_utm_content', 'last_utm_term', 'last_landing_page', 'last_touch_at')

@admin.register(CTAInteraction)
class CTAInteractionAdmin(admin.ModelAdmin):
    list_display = ('id', 'source', 'action', 'status', 'submission', 'created_at', 'utm_source', 'utm_campaign')
    list_filter = ('status', 'source', 'created_at', 'utm_source', 'utm_campaign')
    search_fields = ('user_agent', 'ip_address', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign')
    readonly_fields = ('created_at',)
