import os
import sys
import json
import urllib.request
import urllib.error
import django

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexora.settings')
django.setup()

from django.conf import settings

def setup_webhook():
    token = getattr(settings, 'CALENDLY_ACCESS_TOKEN', None)
    if not token:
        print("Error: CALENDLY_ACCESS_TOKEN is not set in environment.")
        return

    # User must provide their public webhook URL
    print("Calendly Webhook Setup")
    print("-" * 22)
    print("To receive webhooks locally, you must use a tunnel like ngrok.")
    print("Example: https://your-ngrok-url.app/assessment/calendly/webhook/")
    webhook_url = input("Enter your public webhook URL: ").strip()

    if not webhook_url:
        print("URL cannot be empty.")
        return

    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    }

    # Step 1: Get user organization and user URI
    try:
        req = urllib.request.Request('https://api.calendly.com/users/me', headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            organization = data['resource']['current_organization']
            user_uri = data['resource']['uri']
    except Exception as e:
        print(f"Failed to fetch user data: {e}")
        return

    # Step 2: Check existing webhooks to prevent duplicates
    try:
        url = f"https://api.calendly.com/webhook_subscriptions?organization={organization}&scope=organization"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            existing_webhooks = json.loads(response.read().decode())['collection']
            
            for wh in existing_webhooks:
                if wh['callback_url'] == webhook_url and wh['state'] == 'active':
                    print(f"Webhook already exists and is active: {wh['callback_url']}")
                    return
                elif wh['callback_url'] == webhook_url:
                    print(f"Webhook exists but is not active: {wh['callback_url']}")
                    # Could choose to delete or ignore
    except Exception as e:
        print(f"Failed to check existing webhooks. Your Calendly plan might not support webhooks: {e}")
        return

    # Step 3: Create webhook
    payload = {
        "url": webhook_url,
        "events": [
            "invitee.created",
            "invitee.canceled"
        ],
        "organization": organization,
        "user": user_uri,
        "scope": "organization"
    }

    try:
        req = urllib.request.Request(
            'https://api.calendly.com/webhook_subscriptions', 
            data=json.dumps(payload).encode('utf-8'), 
            headers=headers, 
            method='POST'
        )
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            print("\nSuccess! Webhook created.")
            print(f"ID: {result['resource']['uri']}")
            print("Note: The webhook signing key should be obtained from your Calendly dashboard (Integrations -> API & Webhooks) and added to CALENDLY_WEBHOOK_SIGNING_KEY in .env")
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode()
        print(f"\nFailed to create webhook (HTTP {e.code}):")
        print(error_msg)
        print("\nNote: Webhooks require a Calendly Professional, Teams, or Enterprise plan.")
    except Exception as e:
        print(f"\nFailed to create webhook: {e}")

if __name__ == '__main__':
    setup_webhook()
