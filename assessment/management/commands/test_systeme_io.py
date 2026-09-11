import sys
import json
from django.core.management.base import BaseCommand
from assessment.models import AssessmentSubmission
from core.integrations.systeme_io import SystemeIoService

class Command(BaseCommand):
    help = "Tests the Systeme.io API integration against a given submission without exposing API keys."

    def add_arguments(self, parser):
        parser.add_argument('submission_id', type=str, help='The ID of the AssessmentSubmission to sync')

    def handle(self, *args, **options):
        submission_id = options['submission_id']
        
        try:
            submission = AssessmentSubmission.objects.get(id=submission_id)
        except AssessmentSubmission.DoesNotExist:
            self.stdout.write(self.style.ERROR(f"Submission with ID {submission_id} does not exist."))
            sys.exit(1)
            
        self.stdout.write(self.style.NOTICE(f"Testing Systeme.io integration for submission {submission_id} ({submission.email})..."))
        
        service = SystemeIoService()
        if not service.is_configured():
            self.stdout.write(self.style.ERROR("Systeme.io API key is not configured in settings."))
            sys.exit(1)
            
        try:
            # Temporarily bypass consent check just for the manual test command if needed?
            # Actually the requirement said: "The technical contact synchronization can still be developed/tested with explicit test contacts in my development account."
            # The method `sync_assessment_submission` skips if no consent. We'll set a flag or bypass it just for testing.
            
            # We'll call the steps manually to print the safe summary.
            
            self.stdout.write(self.style.NOTICE("1. Resolving tags..."))
            tags = service.get_tags()
            self.stdout.write(f"   Found {len(tags)} tags in Systeme.io")
            
            self.stdout.write(self.style.NOTICE("2. Resolving custom fields..."))
            fields = service.get_custom_fields()
            self.stdout.write(f"   Found {len(fields)} custom fields in Systeme.io")
            
            self.stdout.write(self.style.NOTICE("3. Syncing submission..."))
            service.sync_assessment_submission(submission)
            
            self.stdout.write(self.style.NOTICE("4. Verifying contact..."))
            contact = service.get_contact_by_email(submission.email)
            
            if contact:
                self.stdout.write(self.style.SUCCESS(f"Success! Contact {contact.get('email')} created/updated."))
                self.stdout.write(f"Contact ID: {contact.get('id')}")
            else:
                self.stdout.write(self.style.WARNING("Warning: Contact not returned by API after sync."))
                
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Failed during sync: {e}"))
            sys.exit(1)
