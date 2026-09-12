import os
import sys

# Setup django
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexora.settings')

import django
django.setup()

from django.conf import settings
from core.integrations.systeme_io import SystemeIoService
from assessment.models import AssessmentSubmission

def run_checks():
    has_key = bool(getattr(settings, 'SYSTEME_IO_API_KEY', None))
    print(f"CHECK_API_KEY:{has_key}")
    
    service = SystemeIoService()
    if not service.is_configured():
        print("ERROR_NOT_CONFIGURED")
        return
        
    try:
        tags = service.get_tags()
        print("CHECK_AUTH:PASS")
    except Exception as e:
        print(f"CHECK_AUTH:FAIL - {e}")
        return
        
    fields = service.get_custom_fields()
    field_names = [f.get('name') for f in fields] + [f.get('slug') for f in fields]
    
    required_fields = [
        "assessment_reference", "assessment_score", "qualification_route",
        "first_utm_source", "first_utm_medium", "first_utm_campaign", "first_utm_content", "first_utm_term",
        "last_utm_source", "last_utm_medium", "last_utm_campaign", "last_utm_content", "last_utm_term"
    ]
    missing_fields = [req for req in required_fields if req not in field_names]
    if missing_fields:
        print("MISSING_FIELDS:" + ",".join(missing_fields))
    else:
        print("CHECK_FIELDS:PASS")
        
    tag_names = [t.get('name').lower() for t in tags]
    required_tags = ["nexora consulting"]
    missing_tags = [req for req in required_tags if req not in tag_names]
    if missing_tags:
        print("MISSING_TAGS:" + ",".join(missing_tags))
    else:
        print("CHECK_TAGS:PASS")
        
    if missing_fields or missing_tags:
        print("STOPPING_DUE_TO_MISSING")
        return
        
    print("RUNNING_SYNC_TEST")
    test_email = "info.nexoraconsulting@gmail.com"
    
    # Clean up any previous test runs
    AssessmentSubmission.objects.filter(email=test_email).delete()
    
    sub = AssessmentSubmission(
        full_name="Agent Test User",
        email=test_email,
        whatsapp="9876543210",
        consent=True,
        assessment_score=95,
        qualification_route="Founders Growth Accelerator",
        first_utm_source="test_first_source",
        first_utm_medium="test_first_medium",
        last_utm_source="test_last_source",
        last_utm_medium="test_last_medium",
        last_utm_campaign="test_last_campaign"
    )
    sub.save()
    
    # Verify DB record
    db_exists = AssessmentSubmission.objects.filter(email=test_email).exists()
    print(f"DB_VERIFICATION:{'PASS' if db_exists else 'FAIL'}")
    if not db_exists:
        print("STOPPING_DUE_TO_DB_FAIL")
        return

    try:
        service.sync_assessment_submission(sub)
        print("SYNC_EXECUTION:PASS")
        
        # Verify in CRM
        contact = service.get_contact_by_email(test_email)
        if contact:
            print("CONTACT_FETCH:PASS")
            # Usually contact['fields'] is a dict or list
            print(f"CONTACT_FIELDS:{contact.get('fields')}")
            
            # Verify Nexora Consulting tag is applied to contact
            contact_id = contact.get('id')
            # Fetch tags for the contact if possible, wait, does get_contact_by_email return tags?
            # systeme.io contact fetch might not include tags, we might have to rely on no errors during sync.
            # but let's check if there's a tags field in contact
            print(f"CONTACT_TAGS:{contact.get('tags', 'NOT_RETURNED_BY_API')}")
            
        else:
            print("CONTACT_FETCH:FAIL")
            
    except Exception as e:
        print(f"SYNC_EXECUTION:FAIL - {e}")
        
    finally:
        # Cleanup
        sub.delete()

if __name__ == '__main__':
    run_checks()
