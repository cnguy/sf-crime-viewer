from flask_restful import Resource
from app import api
from flask import json
import os

api_base_url = '/api/'

def getData():
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "sf_data.json")
    data = json.load(open(json_url))
    return data


class CrimeIncident(Resource):
    def get(self):
        return getData()


class FilterByCategoryCrimeIncident(Resource):
    def get(self, category):
        filtered = [each for each in getData() if each['category'] == category.upper()]
        return filtered


class FilterByYearCrimeIncident(Resource):
    def get(self, year):
        filtered = [each for each in getData() if each['date'][0:4] == year]
        return filtered


class DoubleFilterCrimeIncident(Resource):
    def get(self, year, category):
        filtered = [
            each for each in getData() if each['date'][0:4] == year and each['category'] == category.upper()
        ]
        return filtered

api.add_resource(CrimeIncident, api_base_url + 'crime/')
api.add_resource(FilterByCategoryCrimeIncident, api_base_url + 'crime/category/<string:category>')
api.add_resource(FilterByYearCrimeIncident, api_base_url + 'crime/year/<string:year>')
api.add_resource(DoubleFilterCrimeIncident, api_base_url + 'crime/year/<string:year>/category/<string:category>')