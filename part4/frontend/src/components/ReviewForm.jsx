import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import StarsRating from './StarsRating/StarsRating';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const ReviewForm = ({ place, onReviewAdded }) => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const values = { text, rating };
  const decoded = jwtDecode(user.token);
  const userId = decoded.sub;

  const validationSchema = Yup.object().shape({
    text: Yup.string()
      .required('Review text is required')
      .min(5, 'Too short. Write at least 5 characters.'),
    rating: Yup.number().required('Rating is required'),
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await validationSchema.validate(values, { abortEarly: false });

      const data = {
        owner_id: userId,
        place_id: place.id,
        comment: text,
        rating: rating,
      };

      const res = await fetch(`/api/v1/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Something went wrong');
      }

      toast.success('Review submitted!');
      onReviewAdded();
      setText('');
      setRating(0);
    } catch (err) {
      if (err.name === 'ValidationError') {
        err.errors.forEach(e => toast.error(e));
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <form id="review-form" onSubmit={handleSubmit}>
      <h2 className="mb-3">Add a Review</h2>
      <label htmlFor="review" className="form-label">
        Your Review:
      </label>
      <textarea
        id="review"
        name="review"
        className="form-control"
        placeholder="Write your review here..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
      ></textarea>
      <div className="d-flex align-items-center form-group">
        <label htmlFor="rating" className="form-label mt-2 me-2 h5">
          Rating:
        </label>
        <StarsRating value={rating} onChange={setRating} />
      </div>
      <button type="submit" className="btn btn-sm btn-dark mt-3">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
