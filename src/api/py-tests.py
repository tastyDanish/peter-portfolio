import unittest
from resume import parse_resume, resume


class MyTestCase(unittest.TestCase):
    def test_resume_parser(self):
        print(parse_resume(resume, ["WORK EXPERIENCE"]))
        self.assertEqual(1 + 1, 2)


if __name__ == "__main__":
    unittest.main()
