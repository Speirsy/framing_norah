import React, { useEffect, useState } from 'react';

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const apiKey = 'AIzaSyB828eWioClkkZyTa8MeFPo0w3KPxj3WjY'; // Use the new key
      const placeId = 'ChIJtSTlEffxLIERJPt9TEtn4V8'; // Replace with your Place ID
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setReviews(data.result.reviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <div>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.author_name}</strong> - {review.rating} stars</p>
                <p>{review.text}</p>
                <p>{new Date(review.time * 1000).toLocaleDateString()}</p>
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
