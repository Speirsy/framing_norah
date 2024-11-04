import React, { useEffect, useState } from 'react';
import './GoogleReviews.css'; // Add a CSS file for Google-style styling

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const url = 'https://fetchgooglereviews-tghkr44kaa-uc.a.run.app'; // Use your function URL

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.result && data.result.reviews) {
          setReviews(data.result.reviews);
        } else {
          console.error('No reviews found in the response');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="google-reviews-widget">
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <div>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <p className="review-author"><strong>{review.author_name}</strong></p>
                  <div className="review-rating">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
                <p className="review-date">{new Date(review.time * 1000).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleReviews;
