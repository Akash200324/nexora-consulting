import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexora.settings')
import django
django.setup()

from core.integrations.systeme_io import SystemeIoService

service = SystemeIoService()
endpoints = [
    "/custom_fields",
    "/contact_fields",
    "/contact-fields",
    "/fields",
    "/contacts/custom_fields"
]

for ep in endpoints:
    try:
        data = service._request("GET", ep)
        print(f"SUCCESS: {ep}")
    except Exception as e:
        print(f"FAIL {ep}: {e}")
