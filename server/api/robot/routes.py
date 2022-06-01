"""
Parent route implements all the robot related request
"""
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt
from api.decorators import robot_in_fleet_required
from predict.limit.detection import check_limit

from .resources import RobotDataAPI, ActTorAPI, AmptTempAPI, PkVelAPI

from .query import (get_fleet_info, get_robot_specs,
                    get_robot_info, get_robot_alerts)

robot_bp = Blueprint('robot', __name__, url_prefix='/robot')

# API robot resources
robot_bp.add_url_rule('/<robot_id>/filter',
                      view_func=RobotDataAPI.as_view('robot_data_api'))
robot_bp.add_url_rule('/<robot_id>/ActTor',
                      view_func=ActTorAPI.as_view('ActTorque_api'))
robot_bp.add_url_rule('/<robot_id>/AmptTemp',
                      view_func=AmptTempAPI.as_view('AmptTemperature_api'))
robot_bp.add_url_rule('/<robot_id>/PkVel',
                      view_func=PkVelAPI.as_view('PkVelocity_api'))


@robot_bp.route('/fleet', methods=['GET'])
@jwt_required()
def fleet():
    """
    Get all the list of robots with the given fleet id
    endpoint: /api/robot/fleet
    :return: JSON response with robot data for the specific fleet id
    """
    resp = {}
    fleet_id = get_jwt()['fleet_id']
    resp = get_fleet_info(fleet_id)
    return resp


@robot_bp.route('/<robot_id>/specs', methods=['GET'])
@jwt_required()
@robot_in_fleet_required
def specs(robot_id: int):
    """
    Get the specs of the specific robot
    endpoint: /api/robot/<robot_id>/specs
    :param robot_id: integer identifying the robot
    :return: JSON response with robot specs
    """
    resp = {}
    resp = get_robot_specs(robot_id)
    return resp


@robot_bp.route('/<robot_id>', methods=['GET'])
@jwt_required()
@robot_in_fleet_required
def robot(robot_id: int):
    """
    Get the general robot data of the specific robot
    endpoint: /api/robot/<robot_id>
    :param robot_id: integer identifying the robot
    :return: JSON response with robot general data
    """
    resp = {}
    resp = get_robot_info(robot_id)
    return resp


@robot_bp.route('/<robot_id>/alerts', methods=['GET'])
@jwt_required()
@robot_in_fleet_required
def alerts(robot_id: int):
    """
    Endpoint returns all the alerts that are not resolved
    :param robot_id: integer identifying the robot
    :return: JSON response with robot alerts
    """
    resp = {}
    resp = check_limit(robot_id, 'PkVelAx4', 10)
    # resp = get_robot_alerts(robot_id)
    return resp


@robot_bp.route('/<robot_id>/predict/update', methods=['GET'])
@jwt_required()
@robot_in_fleet_required
def predict(robot_id: int):
    """

    :param robot_id: integer identifying the robot
    :return: JSON response with robot new regression line
    """
    from predict.trend.detection import update
    robot_metric = request.args['metric']
    reference_date = request.args['reference-date']
    resp = {}
    resp = update(robot_id, reference_date, robot_metric)
    # resp = get_robot_alerts(robot_id)
    return resp


@robot_bp.route('/<robot_id>/predict/filter', methods=['GET'])
@jwt_required()
@robot_in_fleet_required
def test(robot_id: int):
    """

    :param robot_id: integer identifying the robot
    :return: JSON response with robot new regression line
    """
    from predict.trend.detection import get_predictions
    robot_metric = request.args['metric']
    # reference_date = request.args['reference-date']
    resp = {}
    resp['predict'] = get_predictions("hello", robot_metric)
    # resp = get_robot_alerts(robot_id)
    return resp
