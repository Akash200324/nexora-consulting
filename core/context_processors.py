from core.models import FGACohort

def next_fga_cohort(request):
    """
    Adds the next active FGA cohort to the global template context.
    """
    return {
        'next_fga_cohort': FGACohort.get_next()
    }
