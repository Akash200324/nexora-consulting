from django.db import models
from django.utils import timezone
from datetime import datetime
import zoneinfo

class FGACohort(models.Model):
    cohort_number = models.PositiveIntegerField(unique=True)
    start_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    timezone = models.CharField(max_length=50, default="Asia/Dubai", help_text="Timezone for the cohort schedule (e.g. Asia/Dubai for GST)")
    duration_weeks = models.PositiveIntegerField(default=13)
    capacity = models.PositiveIntegerField(default=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_date', 'start_time']
        verbose_name = "FGA Cohort"
        verbose_name_plural = "FGA Cohorts"

    def __str__(self):
        return f"Cohort {self.cohort_number} - {self.start_date}"

    @classmethod
    def get_next(cls):
        """
        Returns the next upcoming active cohort based on timezone-aware start datetime.
        """
        now = timezone.now()
        active_cohorts = cls.objects.filter(is_active=True).order_by('start_date', 'start_time')
        
        for cohort in active_cohorts:
            try:
                tz = zoneinfo.ZoneInfo(cohort.timezone)
            except Exception:
                tz = zoneinfo.ZoneInfo("Asia/Dubai")
                
            local_dt = datetime.combine(cohort.start_date, cohort.start_time)
            aware_dt = local_dt.replace(tzinfo=tz)
            
            if aware_dt > now:
                return cohort
                
        return None
