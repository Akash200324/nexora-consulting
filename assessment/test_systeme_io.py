import urllib.error
from unittest.mock import patch, MagicMock
from django.test import TestCase, Client, override_settings
from django.urls import reverse
from assessment.models import AssessmentSubmission
from core.integrations.systeme_io import SystemeIoService

class SystemeIoIntegrationTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.submission = AssessmentSubmission.objects.create(
            full_name="Test User",
            email="testuser@example.com",
            whatsapp="1234567890",
            assessment_score=85,
            qualification_route="Founders Growth Accelerator",
            consent=True
        )

    @patch('core.integrations.systeme_io.urllib.request.urlopen')
    @override_settings(SYSTEME_IO_API_KEY='test_api_key')
    def test_contact_creation_success(self, mock_urlopen):
        # Setup mock response
        mock_response = MagicMock()
        mock_response.read.return_value = b'{"id": "c_123", "email": "testuser@example.com"}'
        mock_response.__enter__.return_value = mock_response
        mock_urlopen.return_value = mock_response

        service = SystemeIoService()
        result = service.create_or_update_contact("testuser@example.com", {"first_name": "Test"})
        
        self.assertEqual(result.get("id"), "c_123")
        self.assertTrue(mock_urlopen.called)

    @patch('core.integrations.systeme_io.SystemeIoService._request')
    @override_settings(SYSTEME_IO_API_KEY='test_api_key')
    def test_contact_update_on_duplicate(self, mock_request):
        # First call POST raises 422
        def side_effect(method, endpoint, payload=None):
            if method == "POST" and endpoint == "/contacts":
                err = urllib.error.HTTPError(url="", code=422, msg="Conflict", hdrs={}, fp=None)
                err.read = MagicMock(return_value=b'{}')
                raise err
            if method == "GET" and endpoint.startswith("/contacts?email="):
                return {"items": [{"id": "c_456"}]}
            if method == "PATCH" and endpoint == "/contacts/c_456":
                return {"id": "c_456", "email": "testuser@example.com"}
            return {}

        mock_request.side_effect = side_effect

        service = SystemeIoService()
        result = service.create_or_update_contact("testuser@example.com", {"first_name": "Test"})
        self.assertEqual(result.get("id"), "c_456")

    @override_settings(SYSTEME_IO_API_KEY=None)
    def test_api_key_missing(self):
        service = SystemeIoService()
        self.assertFalse(service.is_configured())
        result = service._request("GET", "/tags")
        self.assertIsNone(result)

    @patch('core.integrations.systeme_io.SystemeIoService._request')
    @override_settings(SYSTEME_IO_API_KEY='test_api_key')
    def test_tag_resolution(self, mock_request):
        mock_request.return_value = {"items": [{"id": "t_1", "name": "FGA Qualified"}]}
        service = SystemeIoService()
        tag_id = service.get_tag_id_by_name("FGA Qualified")
        self.assertEqual(tag_id, "t_1")
        
        tag_id_missing = service.get_tag_id_by_name("Missing Tag")
        self.assertIsNone(tag_id_missing)

    @patch('core.integrations.systeme_io.SystemeIoService._request')
    @override_settings(SYSTEME_IO_API_KEY='test_api_key')
    def test_custom_field_resolution(self, mock_request):
        mock_request.return_value = {"items": [{"id": 1, "slug": "score_field", "name": "assessment_score"}]}
        service = SystemeIoService()
        slug = service.resolve_custom_field_slug("assessment_score")
        self.assertEqual(slug, "score_field")

    @patch('core.integrations.systeme_io.SystemeIoService.sync_assessment_submission')
    def test_assessment_completion_syncs_safely(self, mock_sync):
        # Even if sync raises error, view should succeed
        mock_sync.side_effect = Exception("Systeme.io is down")
        
        session = self.client.session
        session['assessment_answers'] = {'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1, 'q6': 1}
        session.save()
        
        response = self.client.post(reverse('assessment:assessment_section_04'), {
            'full_name': 'Safe Test',
            'company': 'Safe Inc',
            'email': 'safe@test.com',
            'industry': 'Tech',
            'team_size': '1-10',
            'revenue': 'under-500k',
            'consent': True
        }, content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue(mock_sync.called)
        
        # Check it actually saved in db
        self.assertTrue(AssessmentSubmission.objects.filter(email='safe@test.com').exists())

    @patch('core.integrations.systeme_io.SystemeIoService.add_tag_to_contact')
    @override_settings(CALENDLY_WEBHOOK_SIGNING_KEY='')
    def test_calendly_booking_syncs_safely(self, mock_add_tag):
        mock_add_tag.side_effect = Exception("API error")
        
        payload = {
            "event": "invitee.created",
            "payload": {
                "event": "https://api.calendly.com/events/123",
                "uri": "https://api.calendly.com/invitees/456",
                "tracking": {
                    "utm_source": str(self.submission.id)
                }
            }
        }
        
        response = self.client.post(
            reverse('assessment:calendly_webhook'),
            data=payload,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(mock_add_tag.called)
        
        # Booking still saved
        self.submission.refresh_from_db()
        self.assertEqual(self.submission.booking_status, 'booked')

    @patch('core.integrations.systeme_io.SystemeIoService.add_tag_to_contact')
    def test_bpa_strategy_call_syncs_safely(self, mock_add_tag):
        mock_add_tag.side_effect = Exception("API error")
        
        session = self.client.session
        session['assessment_submission_id'] = self.submission.id
        session.save()
        
        response = self.client.get(reverse('assessment:bpa_strategy_call'))
        self.assertEqual(response.status_code, 302) # Redirects to whatsapp
        self.assertTrue(mock_add_tag.called)
