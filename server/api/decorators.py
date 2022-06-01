"""
In this module all the common decorators in the API are defined
"""
from functools import wraps
from flask_jwt_extended import get_jwt
from .robot.query import is_robot_in_fleet


def robot_in_fleet_required(f):
    @wraps(f)
    def decorated_view(*args, **kwargs):
        robot_id = kwargs['robot_id']
        fleet_id = get_jwt()['fleet_id']
        if not is_robot_in_fleet(fleet_id, robot_id):
            return {'error': 'Robot not in fleet'}, 403
        return f(*args, **kwargs)
    return decorated_view
