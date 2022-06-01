"""
Parent route implements all the user related request
"""
from flask import Blueprint, request
from .auth import auth_bp
from database.db import get_db
import sqlite3

user_bp = Blueprint('user', __name__, url_prefix='/user')

# Register children routes for the user logic
user_bp.register_blueprint(auth_bp)


@user_bp.route('/register', methods=['POST'])
def register():
    """
    Inserts user into the database if users does not exist
    endpoint: /api/user/register
    body:
    {
        "username": "user",
        "password": "test",
        "email": "user@example.com",
        "isAdmin": false,
        "name": "user",
        "lastname": "user lastname"
    }
    :return: JSON response with HTTP code
    """
    # Get the body from request
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    is_admin = request.json.get('isAdmin')
    name = request.json.get('name')
    lastname = request.json.get('lastname')

    # Connect to database and register
    conn = get_db()
    error = None

    user = conn.execute("""SELECT * FROM user 
                        WHERE u_username = ?""", (username,)).fetchone()
    if user is None:
        try:
            # TODO: Need to implement validation/forms
            conn.execute("""INSERT INTO user (u_username, u_password, 
                        u_email, u_isAdmin) VALUES (?, ?, ?, ?)""",
                         (username, password, email, is_admin))
            conn.commit()
            user = conn.execute("""SELECT * FROM user 
                                    WHERE u_username = ?""",
                                (username,)).fetchone()
            conn.execute("""INSERT INTO profile (p_userID, p_name, p_lastname) 
            VALUES (?, ?, ?)""", (user['u_userID'], name, lastname))
            conn.commit()
            return {'msg': 'User register successful'}, 200
        except sqlite3.Error as error:
            print(error.args)
            return {'msg': 'Missing parameters'}, 400
    else:
        error = 'User already exist'
        return {'msg': error}, 400
