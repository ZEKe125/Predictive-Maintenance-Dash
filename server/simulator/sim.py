import simpy
import os
import random
import csv
import pandas as pd
import time

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
HEADERS = ['rd_timestamp', 'rd_PkVelAx4', 'rd_PkVelAx3', 'rd_PkVelAx1',
           'rd_AC230V', 'rd_HighVoltDC', 'rd_AmpTempAx1', 'rd_AmpTempAx2',
           'rd_AmpTempAx4', 'rd_EncTempAx2', 'rd_EncTempAx3', 'rd_DutyCycAx3',
           'rd_ActTorAx1', 'rd_ActTorAx2', 'rd_ActTorAx4', 'rd_PkTorAx1',
           'rd_PkTorAx2', 'rd_PkPosErrAx1', 'rd_PkPosErrAx2', 'rd_PkPosErrAx3',
           'rd_EncTempAx1', 'rd_BaseBoardTemp', 'rd_PkTorAx3', 'rd_AmpTempAx3',
           'rd_PkTorAx4', 'rd_ActTorAx3', 'rd_PkVelAx2', 'rd_PkPosErrAx4',
           'rd_DutyCycAx2', 'rd_DutyCycAx1', 'rd_DC24V', 'rd_DutyCycAx4']


class Robot(object):
    def __init__(self, env, name):
        self.name = name
        self.data_path = f"{BASE_DIR}\data\{name}.csv"
        self.env = env
        self.action = env.process(self.run())

    def run(self):
        print(self.name + ' started running')
        with open(self.data_path, 'a', newline='\n') as f:
            fieldnames = HEADERS
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
        while True:
            data_collection_time = 1
            try:
                yield self.env.process(self.work(data_collection_time))
            except simpy.Interrupt:
                print('Simulation was interrupted, trying again...')

    def work(self, duration):
        with open(self.data_path, 'a', newline='\n') as f:
            writer = csv.DictWriter(f, fieldnames=HEADERS)
            now = time.strftime('%Y-%m-%d %H:%M:%S') + '.000'
            writer.writerow(
                {'rd_timestamp': now,
                 'rd_PkVelAx4': random.randint(0, 9),
                 'rd_PkVelAx3': random.randint(0, 9),
                 'rd_PkVelAx1': random.randint(0, 9),
                 'rd_AC230V': random.randint(0, 9),
                 'rd_HighVoltDC': random.randint(0, 9),
                 'rd_AmpTempAx1': random.randint(0, 9),
                 'rd_AmpTempAx2': random.randint(0, 9),
                 'rd_AmpTempAx4': random.randint(0, 9),
                 'rd_EncTempAx2': random.randint(0, 9),
                 'rd_EncTempAx3': random.randint(0, 9),
                 'rd_DutyCycAx3': random.randint(0, 9),
                 'rd_ActTorAx1': random.randint(0, 9),
                 'rd_ActTorAx2': random.randint(0, 9),
                 'rd_ActTorAx4': random.randint(0, 9),
                 'rd_PkTorAx1': random.randint(0, 9),
                 'rd_PkTorAx2': random.randint(0, 9),
                 'rd_PkPosErrAx1':random.randint(0, 9),
                 'rd_PkPosErrAx2': random.randint(0, 9),
                 'rd_PkPosErrAx3': random.randint(0, 9),
                 'rd_EncTempAx1': random.randint(0, 9),
                 'rd_BaseBoardTemp': random.randint(0, 9),
                 'rd_PkTorAx3': random.randint(0, 9),
                 'rd_AmpTempAx3': random.randint(0, 9),
                 'rd_PkTorAx4': random.randint(0, 9),
                 'rd_ActTorAx3': random.randint(0, 9),
                 'rd_PkVelAx2': random.randint(0, 9),
                 'rd_PkPosErrAx4': random.randint(0, 9),
                 'rd_DutyCycAx2': random.randint(0, 9),
                 'rd_DutyCycAx1': random.randint(0, 9),
                 'rd_DC24V': random.randint(0, 9),
                 'rd_DutyCycAx4': random.randint(0, 9)})
        yield self.env.timeout(duration)


def get_data():
    path = f"{BASE_DIR}\data\Robot1.csv"
    df = pd.read_csv(path)
    val = df['rd_timestamp'].values[0]
    return val


if __name__ == "__main__":
    # Change factor to generate data every t seconds (ex. every 5 sec)
    env = simpy.rt.RealtimeEnvironment(factor=5)
    # Add name (this is how your csv will be  named)
    robot = Robot(env, 'Robot1')
    # Add how long you want to run the simulation (ex. 15 steps)
    env.run(until=15)
    # Total runtime = factor*until (in seconds)
