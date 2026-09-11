import json
import urllib.parse
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import AssessmentSubmissionForm
from .models import AssessmentSubmission, CTAInteraction
from core.utm import get_attribution_from_session, apply_attribution_to_submission
from django.views.decorators.csrf import ensure_csrf_cookie

def assessment_landing(request):
    return render(request, 'assessment/assessment_landing.html', {'is_assessment': True})

def assessment_view(request):
    return render(request, 'assessment/section_01/assessment.html', {'is_assessment': True})

def assessment_section_01(request):
    return render(request, 'assessment/section_01/assessment_section_01.html', {'is_assessment': True})

@ensure_csrf_cookie
def assessment_section_02(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            answers = data.get('answers', {})
            
            # Simple validation: ensure we have 6 answers, and they are integers
            if len(answers) != 6:
                return JsonResponse({'success': False, 'error': 'Missing answers.'}, status=400)
            
            # Save answers to Django session
            request.session['assessment_answers'] = answers
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
            
    return render(request, 'assessment/section_02/assessment_section_02.html', {'is_assessment': True})

def assessment_section_03(request):
    return render(request, 'assessment/section_03/assessment_section_03.html', {'is_assessment': True})

@ensure_csrf_cookie
def assessment_section_04(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = AssessmentSubmissionForm(data)
            
            if form.is_valid():
                # Retrieve answers from session
                answers = request.session.get('assessment_answers')
                if not answers:
                    return JsonResponse({'success': False, 'error': 'Assessment answers not found in session.'}, status=400)
                
                # Calculate score
                score = 0
                for i in range(1, 7):
                    val = answers.get(f'q{i}')
                    if val is not None:
                        score += int(val)
                
                # Determine zone and message
                if score <= 8:
                    zone = "The Builder Zone"
                    zone_message = "Catching warning signs early; structural gaps quietly capping income"
                    diagnostic_quote = "Your business is growing, but your foundations are still catching up."
                    diagnostic_primary = "The assessment indicates that your business is showing early signs of operational pressure, but the underlying structure is still relatively manageable. Revenue potential is present, and the biggest opportunity is to strengthen the systems, processes, and clarity that support sustainable growth."
                    diagnostic_interpretation = "The Builder Zone is where warning signs can be addressed before they become expensive problems. Without stronger operating foundations, small gaps in planning, delegation, and execution can gradually limit your ability to grow with confidence."
                elif score <= 16:
                    zone = "The Survival Zone"
                    zone_message = "Working hard without predictable income; most common and most fixable"
                    diagnostic_quote = "Your revenue is scaling faster than the operational systems required to sustain it."
                    diagnostic_primary = "The assessment indicates a growing divergence between your top-line growth and foundational stability. While market demand may be strong, the internal mechanisms handling fulfilment, team alignment, and strategic execution are beginning to come under pressure."
                    diagnostic_interpretation = "The Survival Zone is common for businesses transitioning from early-stage hustle to a more mature enterprise. The symptoms—founder burnout, inconsistent service delivery, and team confusion—are indicators that your current operating system is approaching its limit."
                else:
                    zone = "The Breaking Point Zone"
                    zone_message = "Costing more than money — health, sleep, relationships"
                    diagnostic_quote = "Your business is costing you more than money."
                    diagnostic_primary = "The assessment indicates that operational pressure has reached a critical level. The systems, team structures, and decision-making mechanisms supporting the business are no longer keeping pace with its demands, creating significant pressure on both performance and the people carrying the business forward."
                    diagnostic_interpretation = "The Breaking Point Zone signals that continuing with the current operating model may come at a significant personal and business cost. Founder exhaustion, team instability, inconsistent delivery, and reactive decision-making are signs that the business needs structural intervention rather than simply more effort."
                
                # Determine Qualification Route
                team_size = form.cleaned_data.get('team_size')
                revenue = form.cleaned_data.get('revenue')
                
                # FGA condition: Revenue under AED 2M
                # BPA condition: Revenue AED 2M+
                if revenue in ['under-500k', '500k-2m']:
                    qualification_route = "Founders Growth Accelerator"
                else:
                    qualification_route = "Business Profit Accelerator"
                
                # Evaluate Business Pressure Matrix
                scores = {
                    'revenue': [int(answers.get('q3', 0))],
                    'systems': [int(answers.get('q4', 0))],
                    'team': [int(answers.get('q1', 0)), int(answers.get('q6', 0))],
                    'strategy': [int(answers.get('q2', 0)), int(answers.get('q5', 0))]
                }
                
                matrix_data = {}
                avg_scores = {}
                
                labels = {
                    'revenue': 'Velocity',
                    'systems': 'Capacity',
                    'team': 'Alignment',
                    'strategy': 'Clarity'
                }
                
                colors = {
                    'revenue': 'secondary',
                    'systems': 'error',
                    'team': 'tertiary-container',
                    'strategy': 'primary'
                }
                
                for dim, vals in scores.items():
                    avg = sum(vals) / len(vals)
                    avg_scores[dim] = avg
                    
                    if avg <= 1.5:
                        level = "High" if dim == "revenue" else "Optimal"
                        width = 85
                    elif avg <= 2.5:
                        level = "Moderate"
                        width = 60
                    elif avg <= 3.5:
                        level = "Low"
                        width = 40
                    else:
                        level = "Critical"
                        width = 25
                        
                    matrix_data[dim] = {
                        'label': labels[dim],
                        'level': level,
                        'width': width,
                        'color': colors[dim],
                        'avg_score': avg
                    }
                
                sorted_dims = sorted(avg_scores.items(), key=lambda x: x[1], reverse=True)
                primary_dim = sorted_dims[0][0]
                secondary_dims = [sorted_dims[1][0], sorted_dims[2][0]]
                
                CONSTRAINT_DATA = {
                    'revenue': {
                        'title': 'Revenue Volatility',
                        'primary_desc': 'Your business experiences significant revenue unpredictability. The lack of a predictable growth engine means strategic planning is constantly derailed by cash flow concerns. Stabilizing your revenue generation is your highest priority.',
                        'secondary_desc': 'Revenue unpredictability limits long-term planning and creates ongoing pressure on cash flow.'
                    },
                    'systems': {
                        'title': 'Operational Capacity',
                        'primary_desc': 'Your current systems and processes are breaking under the weight of your growth. Without standardized operating procedures, fulfillment relies on brute force rather than scalable infrastructure. Upgrading your systems is critical.',
                        'secondary_desc': 'Fragile systems create unnecessary friction and limit your ability to scale operations smoothly.'
                    },
                    'team': {
                        'title': 'Team Alignment',
                        'primary_desc': 'You remain the primary router for decisions and quality control. This dependency severely caps your growth potential and directly contributes to leadership fatigue. Moving forward requires decoupling your time from daily execution.',
                        'secondary_desc': 'Without clear documented standards and autonomy, your team operates on assumptions rather than aligned strategy.'
                    },
                    'strategy': {
                        'title': 'Strategic Focus',
                        'primary_desc': 'Tactical firefighting has completely replaced long-term planning. You are trapped working IN the business rather than ON it, obscuring your vision for future growth. Reclaiming your strategic time is essential.',
                        'secondary_desc': 'Tactical firefighting has replaced long-term planning, obscuring your vision for future growth.'
                    }
                }
                
                primary_constraint = {
                    'dimension': primary_dim,
                    'title': CONSTRAINT_DATA[primary_dim]['title'],
                    'description': CONSTRAINT_DATA[primary_dim]['primary_desc']
                }
                
                secondary_bottlenecks = [
                    {
                        'dimension': d,
                        'title': CONSTRAINT_DATA[d]['title'],
                        'description': CONSTRAINT_DATA[d]['secondary_desc']
                    } for d in secondary_dims
                ]
                
                # Create submission
                submission = form.save(commit=False)
                submission.question_1_answer = answers.get('q1')
                submission.question_2_answer = answers.get('q2')
                submission.question_3_answer = answers.get('q3')
                submission.question_4_answer = answers.get('q4')
                submission.question_5_answer = answers.get('q5')
                submission.question_6_answer = answers.get('q6')
                submission.assessment_score = score
                submission.assessment_zone = zone
                submission.assessment_zone_message = zone_message
                submission.assessment_diagnostic_quote = diagnostic_quote
                submission.assessment_diagnostic_primary = diagnostic_primary
                submission.assessment_diagnostic_interpretation = diagnostic_interpretation
                submission.qualification_route = qualification_route
                submission.business_pressure_matrix = matrix_data
                submission.primary_constraint = primary_constraint
                submission.secondary_bottlenecks = secondary_bottlenecks
                
                # Apply UTM attribution from session
                session_attribution = get_attribution_from_session(request)
                submission = apply_attribution_to_submission(submission, session_attribution)
                
                submission.save()
                
                # Try to sync with Systeme.io
                try:
                    from core.integrations.systeme_io import SystemeIoService
                    service = SystemeIoService()
                    service.sync_assessment_submission(submission)
                except Exception as e:
                    import logging
                    logger = logging.getLogger(__name__)
                    logger.error(f"Systeme.io sync failed for submission {submission.id}: {e}")
                
                # Clear session answers, but store submission ID for Section 5
                if 'assessment_answers' in request.session:
                    del request.session['assessment_answers']
                request.session['assessment_submission_id'] = submission.id
                
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'errors': form.errors}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
            
    return render(request, 'assessment/section_04/assessment_section_04.html', {'is_assessment': True})

def assessment_section_05(request):
    submission_id = request.session.get('assessment_submission_id')
    
    if not submission_id:
        return redirect('assessment:index')
        
    try:
        submission = AssessmentSubmission.objects.get(id=submission_id)
        score = submission.assessment_score
        zone = submission.assessment_zone
        zone_message = submission.assessment_zone_message
        qualification_route = submission.qualification_route
    except AssessmentSubmission.DoesNotExist:
        return redirect('assessment:index')
        
    return render(request, 'assessment/section_05/assessment_section_05.html', {
        'is_assessment': True,
        'assessment_score': score,
        'assessment_zone': zone,
        'assessment_zone_message': zone_message,
        'assessment_diagnostic_quote': submission.assessment_diagnostic_quote,
        'assessment_diagnostic_primary': submission.assessment_diagnostic_primary,
        'assessment_diagnostic_interpretation': submission.assessment_diagnostic_interpretation,
        'qualification_route': qualification_route,
        'business_pressure_matrix': submission.business_pressure_matrix,
        'primary_constraint': submission.primary_constraint,
        'secondary_bottlenecks': submission.secondary_bottlenecks
    })

from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import hmac
import hashlib
import base64

@ensure_csrf_cookie
def assessment_fga(request):
    submission_id = request.session.get('assessment_submission_id')
    submission = None
    if submission_id:
        try:
            submission = AssessmentSubmission.objects.get(id=submission_id)
        except AssessmentSubmission.DoesNotExist:
            pass

    return render(request, 'assessment/section_05/fga.html', {
        'is_assessment': True,
        'submission_id': submission_id,
        'submission': submission,
        'calendly_event_url': settings.CALENDLY_FGA_EVENT_URL
    })

def assessment_bpa(request):
    submission_id = request.session.get('assessment_submission_id')
    return render(request, 'assessment/section_05/bpa.html', {
        'is_assessment': True,
        'submission_id': submission_id,
        # TODO: Add calendly_event_url for BPA if needed in the future
    })

@csrf_exempt
def calendly_webhook(request):
    if request.method == 'POST':
        # Optional: Verify Webhook Signature if a key is provided
        signing_key = getattr(settings, 'CALENDLY_WEBHOOK_SIGNING_KEY', None)
        if signing_key:
            signature_header = request.headers.get('Calendly-Webhook-Signature')
            if not signature_header:
                return JsonResponse({'error': 'Missing signature'}, status=403)
            
            try:
                # Format: t=1614616781,v1=...
                parts = dict(part.split('=', 1) for part in signature_header.split(','))
                t = parts.get('t')
                v1 = parts.get('v1')
                
                payload = f"{t}.{request.body.decode('utf-8')}"
                expected_sig = hmac.new(
                    signing_key.encode('utf-8'),
                    payload.encode('utf-8'),
                    hashlib.sha256
                ).hexdigest()
                
                if not hmac.compare_digest(v1, expected_sig):
                    return JsonResponse({'error': 'Invalid signature'}, status=403)
            except Exception as e:
                return JsonResponse({'error': 'Signature verification failed'}, status=403)

        try:
            data = json.loads(request.body)
            event_type = data.get('event')
            payload = data.get('payload', {})
            
            # Calendly returns tracking object with utm and salesforce_uuid parameters
            tracking = payload.get('tracking', {})
            
            # We pass submission_id in utm_source or salesforce_uuid
            submission_id = tracking.get('salesforce_uuid') or tracking.get('utm_source')
            
            if submission_id:
                try:
                    submission = AssessmentSubmission.objects.get(id=submission_id)
                    
                    if event_type == 'invitee.created':
                        submission.booking_status = 'booked'
                        submission.calendly_event_uri = payload.get('event')
                        submission.calendly_invitee_uri = payload.get('uri')
                        submission.save()
                        
                        try:
                            from core.integrations.systeme_io import SystemeIoService
                            service = SystemeIoService()
                            if submission.consent:
                                service.add_tag_to_contact(submission.email, "FGA Booked")
                        except Exception as e:
                            import logging
                            logger = logging.getLogger(__name__)
                            logger.error(f"Systeme.io FGA Booked tag failed for submission {submission.id}: {e}")
                    elif event_type == 'invitee.canceled':
                        submission.booking_status = 'canceled'
                        submission.save()
                        
                    return JsonResponse({'success': True})
                except AssessmentSubmission.DoesNotExist:
                    # Could not find submission, but webhook processed successfully
                    pass
            
            return JsonResponse({'success': True, 'message': 'Event ignored or no submission ID'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def fga_track_interaction(request):
    if request.method == 'POST':
        submission_id = request.session.get('assessment_submission_id')
        if not submission_id:
            return JsonResponse({'error': 'No active session'}, status=403)
            
        try:
            submission = AssessmentSubmission.objects.get(id=submission_id)
        except AssessmentSubmission.DoesNotExist:
            return JsonResponse({'error': 'Invalid submission ID'}, status=403)
            
        try:
            data = json.loads(request.body)
            event_type = data.get('event')
            
            # Map calendly events to meaningful actions
            action_map = {
                'calendly.event_type_viewed': 'calendly_viewed',
                'calendly.date_and_time_selected': 'calendly_time_selected'
            }
            
            action = action_map.get(event_type)
            if not action:
                return JsonResponse({'success': True, 'message': 'Event ignored'})
                
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')
                
            # Create pre-booking tracking record
            CTAInteraction.objects.create(
                source='FGA_Calendly',
                action=action,
                status='started',
                user_agent=request.META.get('HTTP_USER_AGENT'),
                ip_address=ip,
                referrer=request.META.get('HTTP_REFERER'),
                submission=submission
            )
            return JsonResponse({'success': True})
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
            
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def bpa_strategy_call(request):
    submission_id = request.session.get('assessment_submission_id')
    submission = None
    if submission_id:
        try:
            submission = AssessmentSubmission.objects.get(id=submission_id)
        except AssessmentSubmission.DoesNotExist:
            pass

    if not submission:
        return redirect('assessment:index')

    # Get IP Address safely
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')

    # Preserve UTM parameters from submission or session
    if submission:
        utm_source = submission.last_utm_source
        utm_medium = submission.last_utm_medium
        utm_campaign = submission.last_utm_campaign
        utm_term = submission.last_utm_term
        utm_content = submission.last_utm_content
    else:
        session_attribution = get_attribution_from_session(request)
        last_touch = session_attribution.get('last_touch') or {}
        utm_source = last_touch.get('utm_source')
        utm_medium = last_touch.get('utm_medium')
        utm_campaign = last_touch.get('utm_campaign')
        utm_term = last_touch.get('utm_term')
        utm_content = last_touch.get('utm_content')

    # Record Interaction
    interaction = CTAInteraction.objects.create(
        source='BPA',
        action='whatsapp_strategy_call',
        status='new',
        user_agent=request.META.get('HTTP_USER_AGENT'),
        ip_address=ip,
        referrer=request.META.get('HTTP_REFERER'),
        utm_source=utm_source,
        utm_medium=utm_medium,
        utm_campaign=utm_campaign,
        utm_term=utm_term,
        utm_content=utm_content,
        submission=submission
    )

    if submission and submission.consent:
        try:
            from core.integrations.systeme_io import SystemeIoService
            service = SystemeIoService()
            service.add_tag_to_contact(submission.email, "BPA Strategy Call")
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Systeme.io BPA Strategy Call tag failed for submission {submission.id}: {e}")

    # WhatsApp logic
    whatsapp_number = getattr(settings, 'WHATSAPP_BUSINESS_NUMBER', '918590031893')
    
    if submission and getattr(submission, 'full_name', None):
        message = f"Hi George Martin, I’m {submission.full_name}. I’ve completed the Business Performance Assessment and I’d like to discuss my results and explore how the Business Performance Accelerator can help me.\n\nMy assessment reference is {submission.id}."
    else:
        message = 'Hi George Martin, I’m interested in the BPA Strategy Call. I’d like to discuss my business and explore how the Business Performance Accelerator can help me.'
        
    encoded_message = urllib.parse.quote(message)
    
    whatsapp_url = f'https://wa.me/{whatsapp_number}?text={encoded_message}'
    return redirect(whatsapp_url)
