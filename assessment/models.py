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
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.company} (Score: {self.assessment_score})"
