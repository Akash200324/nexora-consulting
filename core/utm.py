from django.utils import timezone

UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

def capture_utm_parameters(request):
    """
    Extracts UTM parameters from the current request.
    Returns a dictionary of the UTM parameters found, or an empty dict if none.
    """
    utm_data = {}
    has_utm = False
    
    for param in UTM_PARAMS:
        val = request.GET.get(param)
        if val:
            # simple validation to truncate overly long parameters for safety
            utm_data[param] = val[:255]
            has_utm = True
            
    if has_utm:
        # Also capture context
        utm_data['landing_page'] = request.path[:2000]
        referrer = request.META.get('HTTP_REFERER')
        if referrer:
            utm_data['referrer'] = referrer[:2000]
        utm_data['captured_at'] = timezone.now().isoformat()
        
    return utm_data if has_utm else None

def get_attribution_from_session(request):
    """
    Returns the first_touch and last_touch dictionaries from the session.
    """
    return {
        'first_touch': request.session.get('utm_first_touch'),
        'last_touch': request.session.get('utm_last_touch')
    }

def apply_attribution_to_submission(submission, session_attribution):
    """
    Applies the session attribution data to an AssessmentSubmission instance.
    The submission must be saved after calling this.
    """
    first_touch = session_attribution.get('first_touch')
    last_touch = session_attribution.get('last_touch')
    
    if first_touch:
        submission.first_utm_source = first_touch.get('utm_source')
        submission.first_utm_medium = first_touch.get('utm_medium')
        submission.first_utm_campaign = first_touch.get('utm_campaign')
        submission.first_utm_content = first_touch.get('utm_content')
        submission.first_utm_term = first_touch.get('utm_term')
        submission.first_landing_page = first_touch.get('landing_page')
        submission.first_touch_at = first_touch.get('captured_at')
        
    if last_touch:
        submission.last_utm_source = last_touch.get('utm_source')
        submission.last_utm_medium = last_touch.get('utm_medium')
        submission.last_utm_campaign = last_touch.get('utm_campaign')
        submission.last_utm_content = last_touch.get('utm_content')
        submission.last_utm_term = last_touch.get('utm_term')
        submission.last_landing_page = last_touch.get('landing_page')
        submission.last_touch_at = last_touch.get('captured_at')
        
    return submission
