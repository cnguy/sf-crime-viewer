#!env/bin/python
import requests
import unittest


class ApiV1Test(unittest.TestCase):
    api_base_url = '/api/v1/'
    
    def test_crimes(self):
        req = requests.get('http://localhost:5000{api_base_url}crimes'.format(api_base_url=self.api_base_url))
        assert req.status_code == 200

    def test_crimes_by_category(self):
        base_url = 'http://localhost:5000{api_base_url}crimes?category='.format(api_base_url=self.api_base_url)
        categories = [
            'all', 'assault', 'driving under the influence',
            'vehicle theft', 'non-criminal'
            ]

        for category in categories:
            req = requests.get(base_url + category)
            assert req.status_code == 200
    
    def test_crimes_by_year(self):
        base_url = 'http://localhost:5000{api_base_url}crimes?year='.format(api_base_url=self.api_base_url)
        start_year = 2005
        end_year = 2016 # +1 to actual end year
        years = range(2005, 2015)

        for year in years:
            req = requests.get(base_url + str(year))
            assert req.status_code == 200
        
        req = requests.get(base_url + 'all')
        assert req.status_code == 200


if __name__ == '__main__':
    unittest.main()