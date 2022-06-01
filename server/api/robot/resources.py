"""
This module defines all the fixed robot API resources and handles all GET
HTTP request
"""
from flask.views import MethodView
from flask import json, request
from flask_jwt_extended import verify_jwt_in_request
from api.decorators import robot_in_fleet_required
from .query import (get_axis_data_from_date, get_latest_robot_torque,
                    get_latest_robot_temp, get_latest_robot_velocity,
                    get_robot_limits)
from predict.limit.detection import check_limit


"""
Other alternative is to use multiple classes for all the robot data 
resources. This if needed to implement isolated cases. Due to our general case 
we decided to use a single class.
endpoint: /api/robot/<robot_id>/<robot_part>/filters?
class TemperatureAPI(MethodView):
    ....
class TorqueAPI(MethodView):
    ...
class VelocityAPI(MethodView):
    ...
class CycleDutyAPI(MethodView):
    ...
"""


class RobotDataAPI(MethodView):
    """/api/robot/<robot_id>/filter"""
    def __init__(self):
        verify_jwt_in_request()

    @robot_in_fleet_required
    def get(self, robot_id):
        robot_metric = request.args['metric']
        start_date = request.args['start-date']
        end_date = request.args['end-date']
        resp = get_axis_data_from_date(robot_id, robot_metric,
                                       start_date, end_date)
        alerts = check_limit(robot_id, robot_metric, resp['items'])
        resp['alerts'] = alerts
        limits = get_robot_limits(robot_id, robot_metric)
        resp['limits'] = limits
        return json.dumps(resp), 200, {
               'ContentType': 'application/json'}


""" Following endpoints are used for testing purposes only. 
    Endpoints will return the latest 40 points of data from database"""


class ActTorAPI(MethodView):
    """/api/<robot_id>/ActTor"""
    def __init__(self):
        verify_jwt_in_request()

    @robot_in_fleet_required
    def get(self, robot_id):
        resp = get_latest_robot_torque(robot_id)
        return json.dumps(resp), 200, {
                'ContentType': 'application/json'}


class AmptTempAPI(MethodView):
    """/api/<robot_id>/AmptTemp"""
    def __init__(self):
        verify_jwt_in_request()

    @robot_in_fleet_required
    def get(self, robot_id):
        resp = get_latest_robot_temp(robot_id)
        return json.dumps(resp), 200, {
                'ContentType': 'application/json'}


class PkVelAPI(MethodView):
    """/api/<robot_id>/PkVel"""

    def __init__(self):
        verify_jwt_in_request()

    @robot_in_fleet_required
    def get(self, robot_id):
        resp = get_latest_robot_velocity(robot_id)
        return json.dumps(resp), 200, {
            'ContentType': 'application/json'}