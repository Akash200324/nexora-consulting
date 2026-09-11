import os
import django
from django.test import Client

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexora.settings')
django.setup()

c = Client(enforce_csrf_checks=True)
resp = c.post('/assessment/section-2/', '{"answers":{"q1":1,"q2":1,"q3":1,"q4":1,"q5":1,"q6":1}}', content_type='application/json')
print('STATUS:', resp.status_code)
print('CONTENT:', resp.content[:200])
