import StarsRating from './StarsRating/StarsRating';

const ReviewForm = () => {
  return (
    <form id="review-form">
      <h2>Add a Review</h2>
      <label htmlFor="review">Your Review:</label>
      <textarea
        id="review"
        name="review"
        placeholder="Write your review here..."
        required
      ></textarea>
      <label htmlFor="rating">Rating:</label>
      <StarsRating />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
