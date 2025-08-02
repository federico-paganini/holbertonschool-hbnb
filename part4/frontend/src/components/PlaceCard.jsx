import placeImages from '../utils/placeImages';

const PlaceCard = ({ place }) => {
  const image = placeImages[Math.floor(Math.random() * placeImages.length)];
  return (
    <div className="card place-card" style={{ width: '18rem' }}>
      <img
        src={image}
        className="card-img-top"
        alt={place.title}
        style={{
          width: '100%',
          aspectRatio: '1 / 0.80',
          objectFit: 'cover',
        }}
      />
      <div className="card-body">
        <h6 className="card-title">{place.title}</h6>
        <p className="card-text text-decoration-none text-muted">
          <small>U$S {place.price} per night</small>
        </p>
      </div>
    </div>
  );
};

export default PlaceCard;
