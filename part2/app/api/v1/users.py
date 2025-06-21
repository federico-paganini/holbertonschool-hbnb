from flask_restx import Namespace, Resource, fields
from app.services import facade

api = Namespace("users", description="User operations")

# Define the user model for input validation and documentation
user_model = api.model(
    "User",
    {
        "first_name": fields.String(
            required=True, description="First name of the user"
        ),
        "last_name": fields.String(required=True, description="Last name of the user"),
        "email": fields.String(required=True, description="Email of the user"),
    },
)


@api.route("/")
class UserList(Resource):
    @api.expect(user_model, validate=True)
    @api.response(201, "User successfully created")
    @api.response(400, "Email already registered")
    @api.response(400, "Invalid input data")
    def post(self):
        """Register a new user"""
        user_data = api.payload

        # Simulate email uniqueness check (to be replaced by real validation with persistence)
        existing_user = facade.get_user_by_email(user_data["email"])
        if existing_user:
            return {"error": "Email already registered"}, 400

        try:
            new_user = facade.create_user(user_data)
        except (TypeError, ValueError) as e:
            return {"error": str(e)}, 400

        return {
            "id": new_user.id,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "email": new_user.email,
        }, 201

    def get(self):
        """Get all users"""
        users = facade.get_all_users()
        return [
            {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            }
            for user in users
        ]


@api.route("/<user_id>")
class UserResource(Resource):
    @api.response(200, "User details retrieved successfully")
    @api.response(404, "User not found")
    def get(self, user_id):
        """Get user details by ID"""
        user = facade.get_user(user_id)
        if not user:
            return {"error": "User not found"}, 404

        return {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
        }, 200

    @api.expect(user_model, validate=True)
    @api.response(200, "User successfully updated")
    @api.response(400, "Email already registered")
    @api.response(400, "Invalid input data")
    def put(self, user_id):
        user_new_data = api.payload

        user = facade.get_user(user_id)
        if not user:
            return {"error": "User not found"}, 404

        if user_new_data["email"]:
            existing_user = facade.get_user_by_email(user_new_data["email"])
            if existing_user and existing_user.id != user.id:
                return {"error": "Email already registered"}, 400

        try:
            for key, new_value in user_new_data.items():
                current_value = getattr(user, key)
                if current_value != new_value:
                    setattr(user, key, new_value)
        except (TypeError, ValueError) as e:
            return {"error": str(e)}, 400

        facade.user_repo.update(user_id, user_new_data)

        return {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
        }, 200
