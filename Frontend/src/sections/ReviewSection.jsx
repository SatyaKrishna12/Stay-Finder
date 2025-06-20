import React, { useEffect, useState } from 'react';
import { Star, User } from 'lucide-react';

const ReviewSection = ({ listingId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3000/reviews/listing/${listingId}`, {
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          setReviews(data.reviews);
          setAverageRating(parseFloat(data.averageRating));
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [listingId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <p className="text-center py-10">Loading reviews...</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Guest Reviews</h3>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
          </div>
          <div className="text-gray-600">
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.user?.username || 'Anonymous'}
                    </h4>
                    <p className="text-sm text-gray-600">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-700 leading-relaxed pl-13">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No reviews yet. Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
