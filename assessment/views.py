import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import AssessmentSubmissionForm
from .models import AssessmentSubmission

def assessment_landing(request):
    return render(request, 'assessment/assessment_landing.html', {'is_assessment': True})

def assessment_view(request):
    return render(request, 'assessment/section_01/assessment.html', {'is_assessment': True})

def assessment_section_01(request):
    return render(request, 'assessment/section_01/assessment_section_01.html', {'is_assessment': True})

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
                elif score <= 16:
                    zone = "The Survival Zone"
                    zone_message = "Working hard without predictable income; most common and most fixable"
                else:
                    zone = "The Breaking Point Zone"
                    zone_message = "Costing more than money — health, sleep, relationships"
                
                # Leave qualification_route unimplemented for now
                qualification_route = ""
                
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
                submission.qualification_route = qualification_route
                submission.save()
                
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
        'qualification_route': qualification_route
    })
