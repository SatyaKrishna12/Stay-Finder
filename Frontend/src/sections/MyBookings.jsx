import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const { isLoggedIn, user, loading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
      return;
    }

    if (user?._id) {
      fetch(`http://localhost:3000/bookings/${user._id}`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            setError(data.message || 'Failed to fetch bookings');
          }
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setError('Failed to fetch bookings');
        });
    }
  }, [loading, isLoggedIn, user]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Cancellation failed');
      }

      toast.success('Booking cancelled successfully');
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error('Cancel booking error:', error);
     toast.error(error.message || 'Failed to cancel booking');
    }
  };

  const handleGiveReview = (listingId) => {
    navigate(`/listing/${listingId}/review`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <li key={booking._id} className="border border-gray-200 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-blue-700">{booking.listing?.title || 'Listing Title'}</h2>
              <p className="text-gray-700 mt-1">Booked by: <span className="font-medium">{booking.user?.username}</span></p>
              <p className="text-sm text-gray-500 mt-1">Booking ID: {booking._id}</p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg shadow-sm"
                >
                  Cancel Booking
                </button>

                <button
                  onClick={() => handleGiveReview(booking.listing?._id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow-sm"
                >
                  Give a Review
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
