from django.test import TestCase, Client, override_settings
from django.urls import reverse
from unittest.mock import patch
from assessment.models import AssessmentSubmission, CTAInteraction

@patch('core.integrations.systeme_io.SystemeIoService.sync_assessment_submission')
@patch('core.integrations.systeme_io.SystemeIoService.add_tag_to_contact')
class UTMTrackingTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_organic_visitor(self, mock_add_tag, mock_sync):
        # Scenario 4: Organic/direct visitor
        # Hit some pages
        self.client.get('/')
        self.client.get('/assessment/')
        
        # Submit assessment
        session = self.client.session
        session['assessment_answers'] = {'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1, 'q6': 1}
        session.save()
        
        response = self.client.post('/assessment/section-4/', {
            'full_name': 'Test Organic',
            'company': 'Organic Inc',
            'email': 'organic@test.com',
            'industry': 'Tech',
            'team_size': '1-10',
            'revenue': 'under-500k',
            'consent': True
        }, content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        
        sub = AssessmentSubmission.objects.get(email='organic@test.com')
        self.assertIsNone(sub.first_utm_source)
        self.assertIsNone(sub.last_utm_source)
        self.assertTrue(mock_sync.called)

    def test_facebook_campaign_persistence(self, mock_add_tag, mock_sync):
        # Scenario 1 & 2: Tagged URL, then remove parameters, then submit
        self.client.get('/?utm_source=facebook&utm_medium=paid_social&utm_campaign=fga_test')
        self.client.get('/explore/')
        self.client.get('/assessment/')
        
        session = self.client.session
        session['assessment_answers'] = {'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1, 'q6': 1}
        session.save()
        
        response = self.client.post('/assessment/section-4/', {
            'full_name': 'Test Facebook',
            'company': 'FB Inc',
            'email': 'fb@test.com',
            'industry': 'Tech',
            'team_size': '1-10',
            'revenue': 'under-500k',
            'consent': True
        }, content_type='application/json')
        
        sub = AssessmentSubmission.objects.get(email='fb@test.com')
        self.assertEqual(sub.first_utm_source, 'facebook')
        self.assertEqual(sub.first_utm_campaign, 'fga_test')
        self.assertEqual(sub.last_utm_source, 'facebook')
        self.assertEqual(sub.last_utm_campaign, 'fga_test')

    def test_first_touch_preservation(self, mock_add_tag, mock_sync):
        # Scenario 3: First touch remains, last touch updates
        self.client.get('/?utm_source=facebook&utm_campaign=campaign_A')
        self.client.get('/?utm_source=google&utm_campaign=campaign_B')
        
        session = self.client.session
        session['assessment_answers'] = {'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1, 'q6': 1}
        session.save()
        
        self.client.post('/assessment/section-4/', {
            'full_name': 'Test Multi',
            'company': 'Multi Inc',
            'email': 'multi@test.com',
            'industry': 'Tech',
            'team_size': '1-10',
            'revenue': 'under-500k',
            'consent': True
        }, content_type='application/json')
        
        sub = AssessmentSubmission.objects.get(email='multi@test.com')
        self.assertEqual(sub.first_utm_source, 'facebook')
        self.assertEqual(sub.first_utm_campaign, 'campaign_A')
        self.assertEqual(sub.last_utm_source, 'google')
        self.assertEqual(sub.last_utm_campaign, 'campaign_B')

    def test_cta_interaction_linking(self, mock_add_tag, mock_sync):
        # Scenario 5 & 7: Assessment -> BPA -> Strategy call retains link
        self.client.get('/?utm_source=facebook&utm_campaign=campaign_A')
        
        session = self.client.session
        session['assessment_answers'] = {'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1, 'q6': 1}
        session.save()
        
        self.client.post('/assessment/section-4/', {
            'full_name': 'Test BPA',
            'company': 'BPA Inc',
            'email': 'bpa@test.com',
            'industry': 'Tech',
            'team_size': '1-10',
            'revenue': 'under-500k',
            'consent': True
        }, content_type='application/json')
        
        # Submission created, session has ID
        sub = AssessmentSubmission.objects.get(email='bpa@test.com')
        
        response = self.client.get('/assessment/bpa/strategy-call/')
        self.assertEqual(response.status_code, 302) # Redirect to WA
        
        interaction = CTAInteraction.objects.first()
        self.assertIsNotNone(interaction)
        self.assertEqual(interaction.submission, sub)
        self.assertEqual(interaction.utm_source, 'facebook')
        self.assertTrue(mock_add_tag.called)

    def test_no_assessment_cta(self, mock_add_tag, mock_sync):
        # Scenario 6: Visitor without assessment -> BPA call redirects
        response = self.client.get('/assessment/bpa/strategy-call/')
        # Usually redirects to index
        self.assertEqual(response.status_code, 302)
        self.assertNotIn('wa.me', response.url)

    def test_snapshot_remains(self, mock_add_tag, mock_sync):
        # Scenario 8: Complete assessment, then another campaign
        self.client.get('/?utm_source=facebook&utm_campaign=campaign_A')
        
        session = self.client.session
        session['assessment_answers'] = {'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1, 'q6': 1}
        session.save()
        
        self.client.post('/assessment/section-4/', {
            'full_name': 'Test Snapshot',
            'company': 'Snapshot Inc',
            'email': 'snap@test.com',
            'industry': 'Tech',
            'team_size': '1-10',
            'revenue': 'under-500k',
            'consent': True
        }, content_type='application/json')
        
        sub = AssessmentSubmission.objects.get(email='snap@test.com')
        self.assertEqual(sub.last_utm_campaign, 'campaign_A')
        
        # New campaign hit
        self.client.get('/?utm_source=google&utm_campaign=campaign_B')
        
        # Sub should NOT be modified
        sub.refresh_from_db()
        self.assertEqual(sub.last_utm_campaign, 'campaign_A')

    def test_csrf_final_submission(self, mock_add_tag, mock_sync):
        # Regression test for CSRF cookie on final submission
        # Use a client with enforce_csrf_checks to simulate browser
        client = Client(enforce_csrf_checks=True)
        
        # Make a GET request to section-2 to receive the csrf cookie
        response = client.get(reverse('assessment:assessment_section_02'))
        self.assertEqual(response.status_code, 200)
        
        # Ensure the csrf token cookie was sent back by the server
        self.assertIn('csrftoken', response.cookies)
        csrf_token = response.cookies['csrftoken'].value
        
        # Make a POST request with the CSRF token
        post_data = {'answers': {'q1':1, 'q2':1, 'q3':1, 'q4':1, 'q5':1, 'q6':1}}
        response = client.post(
            reverse('assessment:assessment_section_02'),
            data=post_data,
            content_type='application/json',
            HTTP_X_CSRFTOKEN=csrf_token
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])

    def test_fga_page_renders_submission(self, mock_add_tag, mock_sync):
        sub = AssessmentSubmission.objects.create(
            full_name='Test FGA',
            email='test@fga.com',
            company='FGA Inc'
        )
        session = self.client.session
        session['assessment_submission_id'] = sub.id
        session.save()
        
        response = self.client.get(reverse('assessment:assessment_fga'))
        self.assertEqual(response.status_code, 200)
        
        self.assertEqual(response.context['submission'], sub)
        self.assertEqual(response.context['submission_id'], sub.id)
        
        content = response.content.decode('utf-8')
        # Django urlencode encodes space as '+' or '%20'. Let's check both possibilities.
        self.assertTrue('name=Test+FGA' in content or 'name=Test%20FGA' in content)
        self.assertIn('email=test%40fga.com', content)

    def test_fga_track_interaction(self, mock_add_tag, mock_sync):
        sub = AssessmentSubmission.objects.create(
            full_name='Test Track',
            email='track@fga.com'
        )
        session = self.client.session
        session['assessment_submission_id'] = sub.id
        session.save()
        
        response = self.client.post(
            reverse('assessment:fga_track_interaction'),
            data={'event': 'calendly.event_type_viewed'},
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        
        interaction = CTAInteraction.objects.get(submission=sub)
        self.assertEqual(interaction.source, 'FGA_Calendly')
        self.assertEqual(interaction.action, 'calendly_viewed')
        self.assertEqual(interaction.status, 'started')

    def test_fga_track_interaction_unauthorized(self, mock_add_tag, mock_sync):
        response = self.client.post(
            reverse('assessment:fga_track_interaction'),
            data={'event': 'calendly.event_type_viewed'},
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 403)

    @override_settings(CALENDLY_WEBHOOK_SIGNING_KEY='')
    def test_calendly_webhook_processing(self, mock_add_tag, mock_sync):
        sub = AssessmentSubmission.objects.create(
            full_name='Test Webhook',
            email='hook@fga.com'
        )
        
        payload = {
            "event": "invitee.created",
            "payload": {
                "event": "https://api.calendly.com/events/123",
                "uri": "https://api.calendly.com/invitees/456",
                "tracking": {
                    "utm_source": str(sub.id)
                }
            }
        }
        
        response = self.client.post(
            reverse('assessment:calendly_webhook'),
            data=payload,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        
        sub.refresh_from_db()
        self.assertEqual(sub.booking_status, 'booked')
        self.assertEqual(sub.calendly_event_uri, "https://api.calendly.com/events/123")
