"""
This module defines functions needed to detect when values from the robot
are above or under the limits
"""
from predict.limit.config import MetricsLimits
from database.db import get_db


def check_limit(robot_id: int, metric: str, data: list):
    # Get the soft limits for the current metric
    cursor = get_db().cursor()
    soft_limits = cursor.execute("""SELECT l_softLowerLimit, l_softUpperLimit
                                      FROM limits
                                     WHERE l_metric = ? AND  l_robotID = ?;""",
                                 (metric, robot_id)).fetchone()
    if soft_limits is not None:
        lower_soft_lim = soft_limits['l_softLowerLimit']
        upper_soft_lim = soft_limits['l_softUpperLimit']
    else:
        lower_soft_lim = None
        upper_soft_lim = None

    # Get the hard limits for the current metric
    upper_hard_lim = MetricsLimits[metric]['upper_hard']
    lower_hard_lim = MetricsLimits[metric]['lower_hard']

    # Save the data
    limits_data = []

    for data_point in data:
        if data_point['value']:
            if upper_hard_lim and data_point['value'] >= upper_hard_lim:
                alert = {'type': 'Upper Hard Limit',
                         'value': data_point['value'],
                         'timestamp': data_point['timestamp']}
                limits_data.append(alert)
            elif upper_soft_lim and data_point['value'] >= upper_soft_lim:
                alert = {'type': 'Upper Soft Limit',
                         'value': data_point['value'],
                         'timestamp': data_point['timestamp']}
                limits_data.append(alert)
            elif upper_hard_lim and data_point['value'] <= upper_hard_lim:
                alert = {'type': 'Lower Hard Limit',
                         'value': data_point['value'],
                         'timestamp': data_point['timestamp']}
                limits_data.append(alert)
            elif lower_soft_lim and data_point['value'] <= lower_soft_lim:
                alert = {'type': 'Lower Soft Limit',
                         'value': data_point['value'],
                         'timestamp': data_point['timestamp']}
                limits_data.append(alert)
    return limits_data
