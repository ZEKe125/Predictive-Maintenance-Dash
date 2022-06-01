"""
This module creates and configures the Flask application and other services
using the Factory Pattern
"""
from flask import Flask
from flask_jwt_extended import JWTManager
from config import env_config
from database import db

jwt = JWTManager()


def create_app(config_name='development'):
    """
    Factory to create the Flask application (The core of the application)
    :param config_name: development/testing/production configs
    :return: Flask application
    """
    app = Flask(__name__)
    app.config.from_object(env_config[config_name])
    jwt.init_app(app)

    # define all the blueprints here
    from api.routes import api_bp
    app.register_blueprint(api_bp)

    # SQLite3 database
    db.init_app(app)

    return app


if __name__ == "__main__":
    """Optional running mode for using debugger"""
    # Add config_name (Optional: development|testing|production)
    app = create_app()
    app.run(debug=True)
