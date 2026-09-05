import os
import django
import sys
from datetime import datetime
import zoneinfo
from unittest import mock

sys.path.insert(0, r'c:\Users\AKASH\OneDrive\Desktop\Nexora Consulting')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexora.settings')
django.setup()

from core.models import FGACohort
from django.utils import timezone

def run_tests():
    gst_tz = zoneinfo.ZoneInfo("Asia/Dubai")
    
    # 1. Scenario A: 5 September 2026
    dt = datetime(2026, 9, 5, 12, 0, tzinfo=gst_tz)
    with mock.patch('django.utils.timezone.now', return_value=dt):
        nxt = FGACohort.get_next()
        print(f"Scenario A (5 Sept): Next is Cohort {nxt.cohort_number if nxt else 'None'} - Expected 2")

    # 2. Scenario B: 12 September 2026 at 12:59 GST
    dt = datetime(2026, 9, 12, 12, 59, tzinfo=gst_tz)
    with mock.patch('django.utils.timezone.now', return_value=dt):
        nxt = FGACohort.get_next()
        print(f"Scenario B (12 Sept 12:59): Next is Cohort {nxt.cohort_number if nxt else 'None'} - Expected 2")

    # 3. Scenario C: 12 September 2026 at 13:00 GST
    dt = datetime(2026, 9, 12, 13, 0, tzinfo=gst_tz)
    with mock.patch('django.utils.timezone.now', return_value=dt):
        nxt = FGACohort.get_next()
        print(f"Scenario C (12 Sept 13:00): Next is Cohort {nxt.cohort_number if nxt else 'None'} - Expected 3")
        
    # 4. Scenario D: 15 September 2026
    dt = datetime(2026, 9, 15, 12, 0, tzinfo=gst_tz)
    with mock.patch('django.utils.timezone.now', return_value=dt):
        nxt = FGACohort.get_next()
        print(f"Scenario D (15 Sept): Next is Cohort {nxt.cohort_number if nxt else 'None'} - Expected 3")

    # 5. Scenario E: After 10 October 2026
    dt = datetime(2026, 10, 11, 12, 0, tzinfo=gst_tz)
    with mock.patch('django.utils.timezone.now', return_value=dt):
        nxt = FGACohort.get_next()
        print(f"Scenario E (After 10 Oct): Next is {nxt.cohort_number if nxt else 'None'} - Expected None")

    # 6. Inactive cohort test
    c2 = FGACohort.objects.get(cohort_number=2)
    c2.is_active = False
    c2.save()
    dt = datetime(2026, 9, 5, 12, 0, tzinfo=gst_tz)
    with mock.patch('django.utils.timezone.now', return_value=dt):
        nxt = FGACohort.get_next()
        print(f"Scenario F (Cohort 2 inactive on 5 Sept): Next is Cohort {nxt.cohort_number if nxt else 'None'} - Expected 3")
    c2.is_active = True
    c2.save()

if __name__ == '__main__':
    run_tests()
