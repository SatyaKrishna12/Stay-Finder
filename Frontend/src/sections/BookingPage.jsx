import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import { toast } from 'react-toastify';

const BookingPage = () => {
  const { id } = useParams(); // Listing ID
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    guests: 1
  });

  const { user, isLoggedIn, loading } = useAuthStatus();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://localhost:3000/listing/${id}`);
        const data = await res.json();
        setListing(data);
      } catch (err) {
        console.error('Error fetching listing:', err);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
     toast.error("You must be logged in to book a listing.");
      return navigate('/login');
    }

    const { startDate, endDate, guests } = formData;
    const totalNights = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    if (totalNights <= 0) {
      return toast.error("End date must be after start date.");
    }

    const totalPrice = totalNights * listing.price;

    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          listing: id,
          startDate,
          endDate,
          guests,
          totalPrice,
          user: user._id
        })
      });

      if (response.ok) {
        toast.info('Booking confirmed successfully!');
        setFormData({ startDate: '', endDate: '', guests: 1 }); 
        navigate("/mybooking");
      } else {
        const err = await response.json();
        console.error('Booking error:', err);
       toast.error(err.message || 'Booking failed');
      }
    } catch (error) {
      console.error("Booking request failed:", error);
      toast.error('Booking request failed');
    }
  };

  if (loading || !listing) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Book: {listing.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            required
            className="w-full border px-3 py-2 rounded"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            required
            className="w-full border px-3 py-2 rounded"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Guests</label>
          <input
            type="number"
            name="guests"
            min="1"
            required
            className="w-full border px-3 py-2 rounded"
            value={formData.guests}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
