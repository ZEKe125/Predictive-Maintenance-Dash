import pickle
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd
from database.db import get_db

import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


def get_predictions(reference_date: str, robot_metric: str):
    path_to_file = BASE_DIR + f'/models/ARIMA_{robot_metric}.pkl'
    # Check if a model exist for this metric
    file_exists = os.path.exists(path_to_file)
    if not file_exists:
        return []
    # Load the ARIMA model, open a file, where you stored the pickled data
    file = open(path_to_file, 'rb')
    # dump information to pickle
    model = pickle.load(file)

    fc_range = 1000  # number of data points predicted
    reference_date = '2021-10-17 00:00:00'  # startdate is end of training data for model

    fc = model.get_forecast(fc_range)  # gets out-of-sample forecast
    fc_series = fc.predicted_mean  # the forecast line of interest
    fc_series.index = pd.date_range(
        # creating an arbitrary index for the prediction
        start=reference_date,
        # beginning of prediction (usually end of training data)
        freq="5T",  # 5 mins freq for every datapoint
        periods=fc_range)  # number of periods

    # creating data structure for confidence interval
    lower_series = fc.summary_frame()['mean_ci_lower']  # upper bound VALUES
    upper_series = fc.summary_frame()['mean_ci_upper']  # lower bound VALUES

    # Prepare predictions in the dictionary response
    new_dict = {}
    resp = []
    for i, date in enumerate(fc_series.index.array):
        new_date = date.strftime('%Y-%m-%d %H:%M:%S')
        new_dict['date'] = new_date
        new_dict['value'] = fc_series.array[i]
        new_dict['upper_value'] = upper_series.array[i]
        new_dict['lower_value'] = lower_series.array[i]
        resp.append(new_dict.copy())
    return resp


def update(robot_id: int, reference_date: str, metric_value: int):
    # Get the data used for the training
    cursor = get_db()
    sql = f"""SELECT rd_timestamp, rd_{metric_value}
              FROM robotdata  
              WHERE rd_timestamp < '{reference_date}'
              AND rd_robotID = {robot_id};"""
    df = pd.read_sql_query(sql, cursor)
    timestamps = df.index
    # dates
    # train_x = []
    # # metric value
    # train_y = []
    # for row in data:
    #     if row[1] and row[1] != 0:
    #         train_x.append(row[0])
    #         train_y.append(row[1])
    # df = pd.DataFrame(train_x, columns=['timestamp'])
    # df['timestamp'] = df['timestamp'].apply(lambda x: datetime.strptime(x, '%Y-%m-%d %H:%M:%S.%f'))
    #df_unix_sec = pd.to_datetime(df['timestamp']).view(int) / 10 ** 9
    # train_x = [int(x.strftime(format='%Y-%m-%d %H:%M:%S.%f')) for x in train_x]
    # resp = {
    #     'timestamp': df[],
    #     'metric': df['timestamp'].array
    # }
    resp = {}
    return resp


if __name__ == "__main__":
    result = get_predictions("hello", "ActTorAx4")
    print(result)