from django.db import models

class AssessmentSubmission(models.Model):
    # Assessment Answers (Section 2)
    question_1_answer = models.IntegerField(null=True, blank=True)
    question_2_answer = models.IntegerField(null=True, blank=True)
    question_3_answer = models.IntegerField(null=True, blank=True)
    question_4_answer = models.IntegerField(null=True, blank=True)
    question_5_answer = models.IntegerField(null=True, blank=True)
    question_6_answer = models.IntegerField(null=True, blank=True)
    
    # Computed Score
    assessment_score = models.IntegerField(null=True, blank=True)
    assessment_zone = models.CharField(max_length=255, null=True, blank=True)
    assessment_zone_message = models.TextField(null=True, blank=True)
    assessment_diagnostic_quote = models.TextField(null=True, blank=True)
    assessment_diagnostic_primary = models.TextField(null=True, blank=True)
    assessment_diagnostic_interpretation = models.TextField(null=True, blank=True)
    qualification_route = models.CharField(max_length=100, null=True, blank=True)
    
    # User / Company Information (Section 4)
    full_name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=50, blank=True, null=True)
    industry = models.CharField(max_length=100)
    team_size = models.CharField(max_length=50)
    revenue = models.CharField(max_length=50)
    consent = models.BooleanField(default=False)
    
    # Diagnostic Results (Section 5)
    business_pressure_matrix = models.JSONField(null=True, blank=True)
    primary_constraint = models.JSONField(null=True, blank=True)
    secondary_bottlenecks = models.JSONField(null=True, blank=True)

    # Calendly Booking Tracking
    calendly_event_uri = models.URLField(max_length=500, null=True, blank=True)
    calendly_invitee_uri = models.URLField(max_length=500, null=True, blank=True)
    booking_status = models.CharField(max_length=50, null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # UTM Tracking: First Touch
    first_utm_source = models.CharField(max_length=255, blank=True, null=True)
    first_utm_medium = models.CharField(max_length=255, blank=True, null=True)
    first_utm_campaign = models.CharField(max_length=255, blank=True, null=True)
    first_utm_content = models.CharField(max_length=255, blank=True, null=True)
    first_utm_term = models.CharField(max_length=255, blank=True, null=True)
    first_landing_page = models.URLField(max_length=2000, blank=True, null=True)
    first_touch_at = models.DateTimeField(blank=True, null=True)

    # UTM Tracking: Last Touch
    last_utm_source = models.CharField(max_length=255, blank=True, null=True)
    last_utm_medium = models.CharField(max_length=255, blank=True, null=True)
    last_utm_campaign = models.CharField(max_length=255, blank=True, null=True)
    last_utm_content = models.CharField(max_length=255, blank=True, null=True)
    last_utm_term = models.CharField(max_length=255, blank=True, null=True)
    last_landing_page = models.URLField(max_length=2000, blank=True, null=True)
    last_touch_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} - {self.company} (Score: {self.assessment_score})"

class CTAInteraction(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=50, default="BPA")
    action = models.CharField(max_length=50, default="whatsapp_strategy_call")
    status = models.CharField(max_length=30, default="new")
    
    # Tracking fields
    user_agent = models.TextField(blank=True, null=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    referrer = models.URLField(max_length=2000, blank=True, null=True)
    
    # UTM tracking
    utm_source = models.CharField(max_length=255, blank=True, null=True)
    utm_medium = models.CharField(max_length=255, blank=True, null=True)
    utm_campaign = models.CharField(max_length=255, blank=True, null=True)
    utm_term = models.CharField(max_length=255, blank=True, null=True)
    utm_content = models.CharField(max_length=255, blank=True, null=True)
    
    # Optional link to existing submission if they took the assessment
    submission = models.ForeignKey(AssessmentSubmission, on_delete=models.SET_NULL, null=True, blank=True, related_name="cta_interactions")

    class Meta:
        ordering = ["-created_at"]
        
    def __str__(self):
        return f"{self.source} - {self.action} at {self.created_at.strftime('%Y-%m-%d %H:%M')}"
