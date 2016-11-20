from flask_restful import Resource
from app import api
from flask import json, request
import os

api_base_url = '/api/v1/'

def getData():
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "sf_data.json")
    data = json.load(open(json_url))
    return data


class CrimeIncident(Resource):
    def get(self):
        data = getData()
        args = request.args.to_dict()
        if 'category' not in args and 'year' not in args:
            return data
        if 'category' in args and args['category'] != 'all':
            data = [crime for crime in data if crime['category'] == args['category'].upper()]
        if 'year' in args and args['year'] != 'all':
            data = [crime for crime in data if crime['date'][0:4] == args['year']]
        return data


api.add_resource(CrimeIncident, api_base_url + 'crimes')