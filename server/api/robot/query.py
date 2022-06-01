"""
This module connects to the database and provides all the query services to the
robot blueprints
"""
from database.db import get_db
from predict.limit import detection
from typing import Union
import sqlite3


def get_fleet_info(fleet_id: int) -> Union[dict, tuple]:
    """
    Get the fleet data
    :param fleet_id: Integer to identify fleet
    :return: dictionary  with data response or error
    """
    cursor = get_db().cursor()
    try:
        fleet_data = cursor.execute(
            """SELECT fl_name, ro_robotID, ro_name, 
                      ro_serialNumber, ro_workcell, ro_status
                FROM fleet, robot
                WHERE ro_fleetID = fl_fleetID AND 
                      fl_fleetID = ?;""", (fleet_id,)
        ).fetchall()
        data = []
        for robot_data in fleet_data:
            data.append(
                {
                    'robot_id': robot_data[1],
                    'robot_name': robot_data[2],
                    'serial_number': robot_data[3],
                    'workcell': robot_data[4],
                    'status': robot_data[5]  # FIXME: Create logic for robot status
                }
            )
        resp = {'fleet_id': fleet_id,
                'fleet_name': robot_data[0],
                'robots': data}
        return resp
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def get_robot_specs(robot_id: int) -> Union[dict, tuple]:
    """
    Query the data from the database based on the robot and fleet id
    :param robot_id: integer to identify robot
    :return: dictionary with the specs
    """
    cursor = get_db().cursor()
    resp = None
    try:
        specs_data = cursor.execute(
            """SELECT modelspecs.* FROM modelspecs, robot, robotmodel
            WHERE ro_modelID = rm_robotmodelID AND 
            rm_specsID = ms_modelspecsID AND ro_robotID = ?;""",
            (robot_id, )).fetchone()
        columns = [description[0] for description in cursor.description]
        resp = {}
        for i, value in enumerate(specs_data):
            resp[columns[i]] = value
        return resp
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def get_robot_info(robot_id: int) -> Union[dict, tuple]:
    """
    Query from database the robot general information
    :param robot_id: integer to identify robot
    :return: dictionary with the formatted data to respond to client
    """
    cursor = get_db().cursor()
    resp = None
    try:
        robot_data = cursor.execute(
            """SELECT ro_robotID, ro_name, rm_name, ro_serialNumber, ro_status,
            ro_workcell, fl_name FROM robot, fleet, robotmodel
            WHERE ro_fleetID = fl_fleetID AND ro_modelID = rm_robotmodelID AND 
            ro_robotID = ?;""", (robot_id, )).fetchone()
        columns = [description[0] for description in cursor.description]
        resp = {}
        for i, value in enumerate(robot_data):
            resp[columns[i]] = value
        # resp['status'] = 'offline'  # FIXME: Create logic for robot status
        return resp
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def get_axis_data_from_date(robot_id: int, robot_metric: str, start_date: str,
                            end_date: str) -> Union[dict, tuple]:
    """
    Query historical axis data from robot data table
    :param robot_id: integer to identify robot
    :param robot_metric: string to identify robot metric (ex: AmpTempAxis1)
    :param start_date: datetime string (ex: 2021-09-01 20:01:07.000)
    :param end_date: datetime string
    :return: tuple with dictionary data (x and y axis)
    """
    cursor = get_db().cursor()
    resp = None
    # TODO: Check the safety of using this string concatenation (sql injection)
    sql = f"""
         SELECT rd_timestamp, rd_{robot_metric}
            FROM robot, robotdata 
            WHERE ro_robotID = rd_robotID AND ro_robotID = {robot_id} AND 
            rd_timestamp BETWEEN '{start_date}' AND '{end_date}';
         """
    try:
        temp_data = cursor.execute(sql).fetchall()
        items = [dict([('timestamp', row[0]),
                       ('value', row[1])]) for row in temp_data]
        # Check edge cases where metric does not have axis
        if robot_metric in ['AC230V', 'DC24V', 'HighVoltDC', 'BaseBoardTemp']:
            legend = []
        else:
            legend = [
                {'label': 'Axis 1', 'value': 'Ax1'},
                {'label': 'Axis 2', 'value': 'Ax2'},
                {'label': 'Axis 3', 'value': 'Ax3'},
                {'label': 'Axis 4', 'value': 'Ax4'}
            ]
        resp = {
            'legend': legend,
            'items': items,
            'limits': [
                {'type': 'UpperHard', 'value': 10},
                {'type': 'LowerHard', 'value': 1},
                {'type': 'UpperSoft', 'value': 8},
                {'type': 'LowerSoft', 'value': 3},
            ]
        }
        return resp
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def get_latest_robot_torque(robot_id: int):
    """"""
    cursor = get_db().cursor()
    try:
        torque_data = cursor.execute("""
        SELECT rd_timestamp, rd_ActTorAx1, rd_ActTorAx2, 
                             rd_ActTorAx3, rd_ActTorAx4
            FROM robot, robotdata
            WHERE ro_robotID = rd_robotID AND ro_robotID = ?
            ORDER BY robotdata.rowid DESC
            LIMIT 40
        """, (robot_id, )).fetchall()
        resp = [dict([('date', row[0]), ('axis1', row[1]),
                      ('axis2', row[2]), ('axis3', row[3]),
                      ('axis4', row[4])]) for row in torque_data]
        return resp
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def get_latest_robot_temp(robot_id: int):
    """"""
    cursor = get_db().cursor()
    try:
        torque_data = cursor.execute("""
        SELECT rd_timestamp, rd_AmpTempAx1, rd_AmpTempAx2, 
                             rd_AmpTempAx3, rd_AmpTempAx4
            FROM robot, robotdata
            WHERE ro_robotID = rd_robotID AND ro_robotID = ?
            ORDER BY robotdata.rowid DESC
            LIMIT 40
        """, (robot_id, )).fetchall()
        resp = [dict([('date', row[0]), ('axis1', row[1]),
                      ('axis2', row[2]), ('axis3', row[3]),
                      ('axis4', row[4])]) for row in torque_data]
        return resp
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def get_latest_robot_velocity(robot_id: int):
    """"""
    cursor = get_db().cursor()
    try:
        torque_data = cursor.execute("""
        SELECT rd_timestamp, rd_PkVelAx1, rd_PkVelAx2, 
                             rd_PkVelAx3, rd_PkVelAx4
            FROM robot, robotdata
            WHERE ro_robotID = rd_robotID AND ro_robotID = ?
            ORDER BY robotdata.rowid DESC
            LIMIT 40
        """, (robot_id, )).fetchall()
        resp = [dict([('date', row[0]), ('axis1', row[1]),
                      ('axis2', row[2]), ('axis3', row[3]),
                      ('axis4', row[4])]) for row in torque_data]
        return resp
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def is_robot_in_fleet(fleet_id: int, robot_id: int) -> Union[bool, tuple]:
    """
    Checks if a member of a fleet has access to the robot information
    :param fleet_id: integer to identify fleet
    :param robot_id: integer to identify robot
    :return: True/False
    """
    cursor = get_db().cursor()
    resp = None
    try:
        resp = cursor.execute(
            """SELECT * FROM robot, fleet  WHERE ro_fleetID = fl_fleetID AND 
             fl_fleetID = ? AND  ro_robotID = ?;""",
            (fleet_id, robot_id)).fetchone()
        if resp is None:
            return False
        return True
    except sqlite3.Error as error:
        print(error)
        return {'error': 'Internal server error'}, 500


def get_robot_alerts(robot_id: int):
    """
    Returns all alerts in for the particular robot
    :param robot_id: integer to identify robot
    :return: active alerts
    """
    return {}


def get_robot_limits(robot_id: int, metric: str):
    """
    Returns all the soft and hard limits for the given metric and robot
    :param robot_id: integer to identify robot
    :param metric: string with the robot metric (e.g: PkVelAxis1)
    :return: list of dictionary with limit values
    """
    from predict.limit.config import MetricsLimits
    # Get the hard limits for the current metric
    upper_hard_lim = MetricsLimits[metric]['upper_hard']
    lower_hard_lim = MetricsLimits[metric]['lower_hard']

    # Get the soft limits for the current metric
    cursor = get_db().cursor()
    soft_limits = cursor.execute("""SELECT l_softLowerLimit, l_softUpperLimit
                                    FROM limits
                                    WHERE l_metric = ? AND  l_robotID = ?;""",
                                 (metric, robot_id)).fetchone()
    if soft_limits:
        lower_soft_lim = soft_limits['l_softLowerLimit']
        upper_soft_lim = soft_limits['l_softUpperLimit']
    else:
        lower_soft_lim = None
        upper_soft_lim = None
    resp = [{'name': 'upperHard', 'color': 'red', 'value': upper_hard_lim},
            {'name': 'lowerHard', 'color': 'red', 'value': lower_hard_lim},
            {'name': 'upperSoft', 'color': 'green', 'value': upper_soft_lim},
            {'name': 'lowerSoft', 'color': 'green', 'value': lower_soft_lim}]
    return resp
