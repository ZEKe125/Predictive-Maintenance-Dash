"""
This module defines the different Flask configurations
"""
from decouple import config
from datetime import timedelta


import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class Config:
    SECRET_KEY = config('SECRET_KEY')
    JWT_SECRET_KEY = config('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_ACCESS_COOKIE_PATH = '/api/'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    # set this to true in production
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_CSRF_PROTECT = False
    TESTING = False


class DevConfig(Config):
    DATABASE_URI = (os.path.join(BASE_DIR, 'database/dev-data.db'))
    DEBUG = True


class ProdConfig(Config):
    DEBUG = False
    TESTING = True


class TestConfig(Config):
    DEBUG = False


env_config = {
    'development': DevConfig,
    'testing': TestConfig,
    'production': ProdConfig
}
