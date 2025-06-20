import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import { Button } from '../components/ui/Button';
import { toast } from 'react-toastify';

const AddListing = () => {
  const { user, isLoggedIn, loading } = useAuthStatus();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    image: null,
  });

 useEffect(() => {
  if (!loading && (!isLoggedIn || !user)) {
    navigate('/login');
  }
}, [loading, isLoggedIn, user, navigate]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user || !user._id) {
    toast.error("You must be logged in to add a listing.");
    navigate('/login');
    return;
  }

  if (isSubmitting) return; 

  setIsSubmitting(true); 

  try {
    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('price', formData.price);
    formPayload.append('location', formData.location);
    formPayload.append('country', formData.country);
    formPayload.append('image', formData.image);
    formPayload.append('host', user._id);

    const res = await fetch('http://localhost:3000/listing', {
      method: 'POST',
      credentials: 'include',
      body: formPayload,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add listing");
    }

    toast.success("Listing added successfully!"); 
    navigate('/listing');
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Something went wrong"); 
  } finally {
    setIsSubmitting(false); 
  }
};



  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-900 to-white-800 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl space-y-6"
         encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Add New Listing</h2>

        {[
          { label: 'Title', name: 'title', type: 'text' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Price (in USD)', name: 'price', type: 'number' },
          { label: 'Location', name: 'location', type: 'text' },
          { label: 'Country', name: 'country', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label}:
            </label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                rows="4"
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Upload Image:
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div className="w-[150px] flex justify-center mx-auto">
  <Button
    type="submit"
    disabled={loading}
    className={`w-full py-3 px-4 rounded-xl font-semibold transition 
      ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
  >
    {loading ? "Submitting..." : "Submit Listing"}
  </Button>
</div>

      </form>
    </div>
  );
};

export default AddListing;
