"""
This module connects to the database and provides all the query services to the
user blueprints
"""
from database.db import get_db
import sqlite3


def get_user_data(username: str):
    """
    Get the row from user table with the given username
    :param username: unique string in the user table
    :return: row with the user data (id, username, password, teamID, fleetID)
    """

    cursor = get_db().cursor()

    try:
        user_data = cursor.execute(
            """SELECT u_userID, u_username, u_password, t_teamID, fl_fleetID
                FROM user, userteam, teamfleet, team, fleet
                WHERE u_userID = ut_userID AND ut_teamID = t_teamID AND
                      t_teamID = tf_teamID AND tf_fleetID = fl_fleetID AND
                      u_username = ?;""", (username,)).fetchone()
        return user_data
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500
