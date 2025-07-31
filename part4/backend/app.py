from app import create_app
from flask_cors import CORS
from flask_restx import Api

app = create_app()
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
