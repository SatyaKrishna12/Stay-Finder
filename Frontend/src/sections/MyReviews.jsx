import React, { useState, useEffect } from 'react';
import useAuthStatus from '../hooks/useAuthStatus';
import { Star, MessageSquare, CalendarDays, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const { user, isLoggedIn, loading } = useAuthStatus();
    const navigate = useNavigate();
 useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, loading, navigate]);
  useEffect(() => {
    const fetchReviews = async () => {
    
         if (!user?._id) return;
      try {
        const res = await fetch(`http://localhost:3000/reviews/user/${user._id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : data.reviews || []);

      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoadingData(false);
      }
    };

    if (isLoggedIn && !loading) {
      fetchReviews();
    }
  }, [isLoggedIn, loading, user]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white text-black-700 py-10 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">My Reviews</h2>

      {loadingData ? (
        <div className="text-center text-gray-400">Loading your reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p>You haven’t posted any reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                  {review.listing?.title && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Home className="w-4 h-4" />
                      <span>{review.listing.title}</span>
                    </div>
                  )}
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-200">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
