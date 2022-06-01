"""
This module contains the database setup, connection, and commands
"""
import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext
import pandas as pd

import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


def get_db():
    """Creates a connection with the database file"""
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE_URI'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def init_db():
    """Creates tables using the defined schema"""
    db = get_db()

    with current_app.open_resource('database\\schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(populate_db_command)


def close_db(e=None):
    """
    Used to close database after committing
    :param e: Errors if any
    """
    db = g.pop('db', None)

    if db is not None:
        db.close()


def populate_robot_data(filename: str, robot_id: int) -> None:
    """
    Use a pandas data frame to populate the database tables
    :param robot_id: id value with the robot id in Robot table
    :param filename: name of the file in the data directory
    :return: No output, but populates data
    """
    # Get database connection
    conn = get_db()

    # Data files should be in the data directory
    data_path = BASE_DIR + '\\data\\' + filename
    df = pd.read_csv(data_path)

    # Drop undesired columns for the RobotData table
    # NOTE: Assuming the robot data has been added to the Robot table
    df_robot_data = df.drop(['ro_workcell',
                             'ro_serialNumber',
                             'HDUsageAx1',
                             'HDUsageAx2',
                             'HDLifeAx1',
                             'HDLifeAx2',
                             'dummy',
                             'RC_PP_Time',
                             'SEQ',
                             'TIMESTAMP_UTC'], 1)
    df_robot_data['rd_robotID'] = robot_id

    df_robot_data.to_sql('robotdata', conn, if_exists='append', index=False)


def populate_users():
    """
    Adds dummy users to the Users table
    :return: Updates Users/Profile tables in database
    """
    conn = get_db()

    # Add dummy users
    sql_query = """INSERT INTO user 
                (u_username, u_password, u_email, u_isAdmin)
                VALUES (?, ?, ?, ?)"""
    user_rows = [('admin', 'test', 'admin@gmail.com', 1),
                 ('user', 'test', 'user@ucmerced.edu', 0),
                 ('user1', 'test1', 'test1@gmail.com', 0)]
    conn.executemany(sql_query, user_rows)
    conn.commit()

    # Add dummy data to the users profiles
    sql_query = """INSERT INTO profile (p_userID, p_name, p_lastname) 
                VALUES (?, ?, ?)"""
    profile_rows = [(1, 'Alberto', 'Valle'),
                    (2, 'Jose', 'Flores'),
                    (3, 'Jessica', 'Chien')]
    conn.executemany(sql_query, profile_rows)
    conn.commit()


def populate_team_fleet():
    """
    Adds dummy team/fleet data
    :return: Updates Team and Fleet tables
    """
    conn = get_db()

    # Add dummy team
    sql_query = """INSERT INTO team (t_userID, t_name, t_access_code) 
                VALUES (?, ?, ?)"""
    team_rows = [(1, 'Facility#1', '1234ABCD'),
                 (2, 'Facility#2', '5678EFGH')]
    conn.executemany(sql_query, team_rows)
    conn.commit()

    # add dummy user team data
    sql_query = """INSERT INTO userteam (ut_userID, ut_teamID) VALUES (?, ?)"""
    user_team_rows = [(1, 1),
                      (2, 1),
                      (3, 1)]
    conn.executemany(sql_query, user_team_rows)
    conn.commit()

    # Add dummy fleet
    sql_query = """INSERT INTO fleet (fl_teamID, fl_name) VALUES (?, ?)"""
    fleet_rows = [(1, 'Fleet#1'),
                  (2, 'Fleet#2')]
    conn.executemany(sql_query, fleet_rows)
    conn.commit()


def populate_robot():
    """
    Adds dummy robot data
    :return: Updates the Robot table
    """
    conn = get_db()

    # Add dummy team
    sql_query = """INSERT INTO robot 
                (ro_fleetID, ro_modelID, ro_name, ro_serialNumber, ro_workcell) 
                VALUES (?, ?, ?, ?, ?)"""
    robot_rows = [(1, 1, 'Robot1', '571-32301', 'RA36_R1'),
                  (1, 1, 'Robot2', '577-159', 'RB42_R2')]
    conn.executemany(sql_query, robot_rows)
    conn.commit()


def populate_robot_specs():
    """
    Adds the specs to the ModelSpecs table
    :return: Updates ModelSpecs tables in database
    """
    # TODO: Populate data to the ModelSpecs table


@click.command('init-db')
@with_appcontext
def init_db_command():
    """
    Flask command clears the existing data and create new tables.
    $ flask init-db
    """
    init_db()
    click.echo('Initialized the database.')


@click.command('populate-db')
@click.argument('filename', nargs=1)
@click.argument('robot_id', nargs=1)
@with_appcontext
def populate_db_command(filename: str, robot_id: int) -> None:
    """
    Flask command populates csv data to RobotData table.
    $ flask populate-db filename robot_id
    """
    populate_robot_data(str(filename), int(robot_id))
    populate_robot()
    populate_users()
    populate_team_fleet()
    click.echo('Populated ' + filename + ' to the database.')
