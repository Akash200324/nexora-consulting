from django.shortcuts import render

def assessment_view(request):
    return render(request, 'assessment/assessment.html', {'is_assessment': True})

def assessment_section_02(request):
    return render(request, 'assessment/assessment_section_02.html', {'is_assessment': True})
