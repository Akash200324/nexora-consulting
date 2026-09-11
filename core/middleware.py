from core.utm import capture_utm_parameters

class UTMMiddleware:
    """
    Middleware that inspects incoming requests for UTM parameters.
    If valid UTM parameters are found, it persists them in the session
    as both first-touch (if not already set) and last-touch.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        utm_data = capture_utm_parameters(request)
        
        if utm_data:
            # Ensure the session exists and can be written to
            if not request.session.session_key:
                request.session.create()

            # First-touch logic: only set if no first_touch exists
            if not request.session.get('utm_first_touch'):
                request.session['utm_first_touch'] = utm_data
                
            # Last-touch logic: always update if we see new valid UTM parameters
            request.session['utm_last_touch'] = utm_data
            
        response = self.get_response(request)
        return response
