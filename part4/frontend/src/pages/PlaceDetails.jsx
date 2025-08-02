import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import placeImages from '../utils/placeImages';
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewsList';

const PlaceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/places/${id}`);
        if (!res.ok) throw new Error('Failed to fetch place');
        const data = await res.json();
        setPlace(data);
      } catch (err) {
        console.error('Error fetching place:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  const handleReviewAdded = () => {
    setRefresh(!refresh);
  };

  const image = placeImages[Math.floor(Math.random() * placeImages.length)];

  return (
    <>
      <title>{`HBnB | ${place ? place.title : ''}`}</title>
      <meta
        property="og:title"
        content={`HBnB | ${place ? place.title : ''}`}
      />
      <meta
        name="description"
        content={place ? `${place.description}` : 'Loading place details...'}
      />
      <meta
        property="og:description"
        content={place ? `${place.description}` : 'Loading place details...'}
      />
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border text-primary"
              style={{ width: '5rem', height: '5rem' }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <img
                src={image}
                alt={place.title}
                style={{
                  objectFit: 'cover',
                  aspectRatio: '1 / 1',
                  display: 'block',
                }}
                className="img-fluid w-100 rounded-4"
              />
              <h1 className="mt-3">{place.title}</h1>
              <p className="fs-5">{place.description}</p>
              <hr />
              <div className="d-flex align-items-center">
                <a href="#" className="text-decoration-none text-dark">
                  <i className="bi bi-emoji-sunglasses-fill mb-0 h2 "></i>
                </a>
                <h2 className="ms-3 mt-2">
                  Owner: {place.owner.first_name} {place.owner.last_name}
                </h2>
              </div>
              <hr />
              <h3 className="mt-3">Amenities</h3>
              <ul className="list-group list-group-flush">
                {place.amenities.map((amenity, index) => (
                  <li key={index} className="list-group-item">
                    {amenity}
                  </li>
                ))}
              </ul>
              <hr />
              <h3 className="mt-3">Reviews</h3>
              <ReviewsList place={place} refresh={refresh} />
              <hr />
              {user ? (
                <ReviewForm place={place} onReviewAdded={handleReviewAdded} />
              ) : (
                <></>
              )}
            </div>
            <div className="d-none d-md-block col-md-4"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceDetails;
