from flask import Blueprint
from api.user.routes import user_bp
from api.robot.routes import robot_bp

# API base route
api_bp = Blueprint('api', __name__, url_prefix='/api')

# API children user routes
api_bp.register_blueprint(user_bp)
api_bp.register_blueprint(robot_bp)



