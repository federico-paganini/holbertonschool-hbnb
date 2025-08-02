import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlaceCard from './PlaceCard';
import LoadSpinner from './LoadSpinner';

const PlacesDashboard = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/places/');
        if (!res.ok) throw new Error('Failed to fetch places');
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        console.error('Error fetching places:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter(place => {
    if (!maxPrice) return true;
    return place.price <= parseFloat(maxPrice);
  });

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <label htmlFor="priceSelect" className="form-label me-2 mb-0">
          Filter by
        </label>
        <select
          id="priceSelect"
          className="form-select form-select-sm w-25"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        >
          <option value="" disabled>
            Price
          </option>
          <option value="10">Up to $50</option>
          <option value="50">Up to $100</option>
          <option value="100">Up to $150</option>
          <option value="">All Prices</option>
        </select>
      </div>

      {loading ? (
        <LoadSpinner />
      ) : (
        <div className="row">
          {filteredPlaces.length === 0 ? (
            <p>No places found</p>
          ) : (
            filteredPlaces.map(place => (
              <div className="col-sm-2 col-md-4 mb-4" key={place.id}>
                <Link
                  to={`/places/${place.id}`}
                  className="text-decoration-none text-dark"
                >
                  <PlaceCard place={place} />
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default PlacesDashboard;
