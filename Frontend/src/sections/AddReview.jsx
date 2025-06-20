import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';


const AddReview = () => {
  const { user, isLoggedIn, loading } = useAuthStatus();
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

  const handleStarClick = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      toast.error("You must be logged in to leave a review.");
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/reviews/${listingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          rating: formData.rating,
          comment: formData.comment,
          user: user._id
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

    toast.success("Review submitted successfully!");
      navigate(`/listing/${listingId}`);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">Leave a Review</h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Rating:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <Star
                key={val}
                onClick={() => handleStarClick(val)}
                className={`h-6 w-6 cursor-pointer ${
                  val <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Comment:</label>
          <textarea
            name="comment"
            rows={4}
            value={formData.comment}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Write your experience here..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
