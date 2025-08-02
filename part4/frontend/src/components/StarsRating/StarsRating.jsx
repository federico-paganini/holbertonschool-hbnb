import './StarsRating.css';

const StarsRating = ({ value = 0, onChange }) => {
  const handleChange = e => {
    const selectedRating = parseInt(e.target.value, 10);
    if (onChange) onChange(selectedRating);
  };
  return (
    <div className="stars-container">
      <div className="star-widget">
        <input
          type="radio"
          className="rate"
          id="rate-5"
          name="rate"
          value={5}
          checked={value === 5}
          onChange={handleChange}
          required
        />
        <label htmlFor="rate-5">
          <i className="bi bi-star-fill"></i>
        </label>
        <input
          type="radio"
          className="rate"
          id="rate-4"
          name="rate"
          value={4}
          checked={value === 4}
          onChange={handleChange}
        />
        <label htmlFor="rate-4">
          <i className="bi bi-star-fill"></i>
        </label>
        <input
          type="radio"
          className="rate"
          id="rate-3"
          name="rate"
          value={3}
          checked={value === 3}
          onChange={handleChange}
        />
        <label htmlFor="rate-3">
          <i className="bi bi-star-fill"></i>
        </label>
        <input
          type="radio"
          className="rate"
          id="rate-2"
          name="rate"
          value={2}
          checked={value === 2}
          onChange={handleChange}
        />
        <label htmlFor="rate-2">
          <i className="bi bi-star-fill"></i>
        </label>
        <input
          type="radio"
          className="rate"
          id="rate-1"
          name="rate"
          value="1"
          onChange={handleChange}
        />
        <label htmlFor="rate-1">
          <i className="bi bi-star-fill"></i>
        </label>
      </div>
    </div>
  );
};

export default StarsRating;
