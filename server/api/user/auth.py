"""
This module implements the authentication for all the user request using JWT
Implementation not meant for production
WARNING: Consider CSRF attacks vulnerabilities
"""
from datetime import datetime, timedelta, timezone
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, get_jwt, get_jwt_identity,
    set_access_cookies, unset_access_cookies
    )
from .query import get_user_data

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Creates a JSON Web Token if valid user
    endpoint: /api/user/auth/login
    body:
    {
        "username": "admin",
        "password": "test"
    }
    :return: JSON response with JWT cookies and HTTP code
    """

    # Get the body from request
    username = request.json.get('username')
    password = request.json.get('password')

    error = None
    user = get_user_data(username)

    if user is None:
        error = 'Invalid username'
    elif user['u_password'] != password:
        error = 'Invalid password'

    # Return token if database return valid user data
    if error is None:
        resp = jsonify({'msg': 'Login successful'})
        # Set other required info
        additional_claims = {'team_id': user['t_teamID'],
                             'fleet_id': user['fl_fleetID']}
        # Set the JWT cookies in the response
        set_access_cookies(resp, create_access_token(
            identity=username, additional_claims=additional_claims))
        return resp, 200
    return {'error': error}, 401


@auth_bp.route('/logout', methods=['POST'])
def logout():
    """
    Removes cookies from client
    endpoint: /api/user/auth/logout
    :return: JSON response with HTTP code
    """
    resp = jsonify({'msg': 'Logout successful'})
    unset_access_cookies(resp)
    return resp, 200


@auth_bp.after_request
def refresh_expiring_jwt(response):
    """
    Refreshes the expiration of a token if a request is made within 30 min from
    the expiration of the token
    :param response: JSON
    :return: JSON response with action and a fresh token
    """
    try:
        # Check if token is close from expiring
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            claims = get_jwt()
            additional_claims = {'team_id': claims['team_id'],
                                 'fleet_id': claims['fleet_id']}
            access_token = create_access_token(
                identity=get_jwt_identity(),
                additional_claims=additional_claims)
            set_access_cookies(response, access_token)
        return response, 200
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT
        return response

