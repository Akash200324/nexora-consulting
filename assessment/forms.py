import re
from django import forms
from .models import AssessmentSubmission

class AssessmentSubmissionForm(forms.ModelForm):
    class Meta:
        model = AssessmentSubmission
        fields = [
            'full_name',
            'company',
            'email',
            'whatsapp',
            'industry',
            'team_size',
            'revenue',
            'consent'
        ]

    def clean_whatsapp(self):
        whatsapp = self.cleaned_data.get('whatsapp')
        if whatsapp:
            # Check length of digits
            digits_only = re.sub(r'\D', '', whatsapp)
            if len(digits_only) < 7 or len(digits_only) > 15:
                raise forms.ValidationError("Please enter a valid phone number.")
            
            # Check for invalid characters (allow +, space, hyphen, digits)
            if not re.match(r'^[\+\s\-\d]*$', whatsapp):
                raise forms.ValidationError("Please enter a valid phone number.")
        return whatsapp

    def clean_consent(self):
        consent = self.cleaned_data.get('consent')
        if not consent:
            raise forms.ValidationError("You must agree to continue.")
        return consent
