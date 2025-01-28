import React, { useEffect, useState } from 'react';
import './GoogleReviews.css';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const baseUrl = 'https://fetchgooglereviews-tghkr44kaa-uc.a.run.app'; // Your function URL
      let allReviews = [];
      let nextPageToken = null;

      do {
        try {
          // Append next_page_token if it exists
          const url = nextPageToken ? `${baseUrl}?pagetoken=${nextPageToken}` : baseUrl;
          const response = await fetch(url);
          const data = await response.json();

          if (data.result && data.result.reviews) {
            allReviews = [...allReviews, ...data.result.reviews];
          }

          // Update the nextPageToken
          nextPageToken = data.next_page_token;

          // Delay for API rate limit (2 seconds)
          if (nextPageToken) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
          break;
        }
      } while (nextPageToken); // Continue fetching until no more pages

      setReviews(allReviews);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  return (
    <div className="google-reviews-widget">
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        reviews.length > 0 ? (
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
        )
      )}
    </div>
  );
};

export default GoogleReviews;



