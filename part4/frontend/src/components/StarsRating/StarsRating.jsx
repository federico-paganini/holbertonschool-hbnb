import './StarsRating.css';

const StarsRating = () => {
  return (
    <div className="container">
      <div className="star-widget">
        <input type="radio" className="rate" id="rate-5" name="rate" required />
        <label htmlFor="rate-5">
          <i className="bi bi-star-fill"></i>
        </label>
        <input type="radio" className="rate" id="rate-4" name="rate" />
        <label htmlFor="rate-4">
          <i className="bi bi-star-fill"></i>
        </label>
        <input type="radio" className="rate" id="rate-3" name="rate" />
        <label htmlFor="rate-3">
          <i className="bi bi-star-fill"></i>
        </label>
        <input type="radio" className="rate" id="rate-2" name="rate" />
        <label htmlFor="rate-2">
          <i className="bi bi-star-fill"></i>
        </label>
        <input type="radio" className="rate" id="rate-1" name="rate" />
        <label htmlFor="rate-1">
          <i className="bi bi-star-fill"></i>
        </label>
      </div>
    </div>
  );
};

export default StarsRating;
