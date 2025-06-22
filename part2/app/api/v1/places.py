from flask_restx import Namespace, Resource, fields
from app.services import facade

api = Namespace("places", description="Place operations")

# Define the models for related entities
amenity_model = api.model(
    "PlaceAmenity",
    {
        "id": fields.String(description="Amenity ID"),
        "name": fields.String(description="Name of the amenity"),
        "description": fields.String(description="Short description of the amenity"),
    },
)

user_model = api.model(
    "PlaceUser",
    {
        "id": fields.String(description="User ID"),
        "first_name": fields.String(description="First name of the owner"),
        "last_name": fields.String(description="Last name of the owner"),
        "email": fields.String(description="Email of the owner"),
    },
)

# Define the place model for input validation and documentation
place_model = api.model(
    "Place",
    {
        "title": fields.String(required=True, description="Title of the place"),
        "description": fields.String(description="Description of the place"),
        "price": fields.Float(required=True, description="Price per night"),
        "latitude": fields.Float(required=True, description="Latitude of the place"),
        "longitude": fields.Float(required=True, description="Longitude of the place"),
        "owner_id": fields.String(required=True, description="ID of the owner"),
        "amenities": fields.List(
            fields.String, required=True, description="List of amenities ID's"
        ),
    },
)


@api.route("/")
class PlaceList(Resource):
    @api.expect(place_model)
    @api.response(201, "Place successfully created")
    @api.response(400, "Invalid input data")
    def post(self):
        """Register a new place"""
        place_data = api.payload

        try:
            new_place = facade.create_place(place_data)
        except (TypeError, ValueError) as error:
            return {"error": str(error)}, 400
        return {
            "owner_id": new_place.owner_id,
            "title": new_place.title,
            "description": new_place.description,
            "price": new_place.price,
            "latitude": new_place.latitude,
            "longitude": new_place.longitude,
            "amenities": [
                {
                    "id": amenity.id,
                    "name": getattr(amenity, "name", None),
                    "description": getattr(amenity, "description", None),
                }
                for amenity in new_place.amenities
            ],
        }, 201

    @api.response(200, "List of places retrieved successfully")
    def get(self):
        """Retrieve a list of all places"""
        places = facade.get_all_places()
        return [
            {
                "id": place.id,
                "owner_id": place.owner_id,
                "owner": (
                    {
                        "first_name": owner.first_name,
                        "last_name": owner.last_name,
                    }
                    if (owner := facade.get_user(place.owner_id))
                    else None
                ),
                "title": place.title,
                "description": place.description,
                "price": place.price,
                "latitude": place.latitude,
                "longitude": place.longitude,
                "amenities": [
                    {
                        "id": amenity.id,
                        "name": getattr(amenity, "name", None),
                        "description": getattr(amenity, "description", None),
                    }
                    for amenity in place.amenities
                ],
            }
            for place in places
        ]


@api.route("/<place_id>")
class PlaceResource(Resource):
    @api.doc(params={"place_id": "The unique ID of the place"})
    @api.response(200, "Place details retrieved successfully")
    @api.response(404, "Place not found")
    def get(self, place_id):
        """Get place details by ID"""
        try:
            place = facade.get_place(place_id)
            owner = facade.get_user(place.owner_id)
            owner_basic_info = {
                "first_name": owner.first_name,
                "last_name": owner.last_name,
            }
        except ValueError as e:
            return {"error": str(error)}, 400

        return {
            "id": place.id,
            "owner_id": place.owner_id,
            "owner": owner_basic_info,
            "title": place.title,
            "description": place.description,
            "price": place.price,
            "latitude": place.latitude,
            "longitude": place.longitude,
            "amenities": [
                {
                    "id": amenity.id,
                    "name": getattr(amenity, "name", None),
                    "description": getattr(amenity, "description", None),
                }
                for amenity in place.amenities
            ],
        }

    @api.expect(place_model)
    @api.response(200, "Place updated successfully")
    @api.response(404, "Place not found")
    @api.response(400, "Invalid input data")
    def put(self, place_id):
        """Update place information by ID"""
        place_new_data = api.payload
        try:
            place = facade.get_place(place_id)
        except ValueError as error:
            return {"error": str(error)}, 404

        try:
            facade.update_place(place_id, place_new_data)
            owner = facade.get_user(updated_place.owner_id)
            owner_basic_info = {
                "first_name": owner.first_name,
                "last_name": owner.last_name,
            }
        except (TypeError, ValueError) as error:
            return {"error": str(error)}, 400

        return {
            "id": place.id,
            "owner_id": place.owner_id,
            "owner": owner_basic_info,
            "title": place.title,
            "description": place.description,
            "price": place.price,
            "latitude": place.latitude,
            "longitude": place.longitude,
            "amenities": [
                {
                    "id": amenity.id,
                    "name": getattr(amenity, "name", None),
                    "description": getattr(amenity, "description", None),
                }
                for amenity in place.amenities
            ],
        }, 200
