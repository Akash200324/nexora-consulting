import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexora.settings')
django.setup()

from core.models import FGACohort
from datetime import date, time

def seed_cohorts():
    cohorts_data = [
        {
            "cohort_number": 1,
            "start_date": date(2026, 8, 8),
            "start_time": time(10, 0),
            "end_time": time(12, 0),
            "timezone": "Asia/Dubai",
            "duration_weeks": 13,
            "capacity": 10
        },
        {
            "cohort_number": 2,
            "start_date": date(2026, 9, 12),
            "start_time": time(13, 0),
            "end_time": time(15, 0),
            "timezone": "Asia/Dubai",
            "duration_weeks": 13,
            "capacity": 10
        },
        {
            "cohort_number": 3,
            "start_date": date(2026, 10, 10),
            "start_time": time(16, 0),
            "end_time": time(18, 0),
            "timezone": "Asia/Dubai",
            "duration_weeks": 13,
            "capacity": 10
        }
    ]

    for data in cohorts_data:
        obj, created = FGACohort.objects.get_or_create(
            cohort_number=data["cohort_number"],
            defaults=data
        )
        if created:
            print(f"Created Cohort {data['cohort_number']}")
        else:
            print(f"Cohort {data['cohort_number']} already exists")

if __name__ == '__main__':
    seed_cohorts()
