import { useEffect, useState } from 'react';

const ReviewsList = ({ place, refresh }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `/api/v1/reviews/places/${place.id}/reviews`
        );
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [place, refresh]);

  return (
    <ul className="list-group list-group-flush">
      {reviews.length === 0 ? (
        <li className="list-group-item text-muted">No reviews yet</li>
      ) : (
        reviews.map(review => (
          <li key={review.id} className="list-group-item">
            <p>{review.comment}</p>
            <strong>Rating:</strong> {review.rating}{' '}
            <i class="bi bi-star-fill"></i>
            <br />
            <em>{review.text}</em>
          </li>
        ))
      )}
    </ul>
  );
};

export default ReviewsList;
