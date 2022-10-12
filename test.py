from unittest import TestCase
from app import app, high_score
from flask import session
from boggle import Boggle
import json


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_homepage(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Boggle</h1>', html)

    def test_check_word(self):
        with app.test_client() as client:
            res = client.get('/check-word?text=dog')
            self.assertEqual(res.status_code, 200)

    def test_record_score(self):
        with app.test_client() as client:
            with client.session_transaction() as sess:
                sess['count'] = 0

            res = client.post('/recordscore', json={ 'score': 1 })
            self.assertEqual(res.status_code, 200)

    def test_load_board(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            self.assertIn('<table id="boggleBoard">', html)

    def test_high_score(self):
        with app.test_client() as client:
            res = client.get('/highscore')
            self.assertEqual(res.status_code, 200)
