import datetime
import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from web_for_msu_back.app.functions import *


class TestFunctions(unittest.TestCase):
    def test_get_next_monday(self):
        self.assertEqual(get_next_monday(datetime.datetime(2025, 2, 26)),
                         datetime.datetime(2025, 3, 3))

        test_cases = [
            (
                datetime.datetime(2025, 2, 26),
                datetime.datetime(2025, 3, 3),
            ),
            (
                datetime.datetime(2025, 3, 3),
                datetime.datetime(2025, 3, 10),

            ),
        ]
        for date, expected in test_cases:
            with self.subTest(date=date, expected=expected):
                self.assertEqual(get_next_monday(date), expected)
