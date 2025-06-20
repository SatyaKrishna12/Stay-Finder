import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Star,
  MapPin,
  ArrowLeft,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Dumbbell,
} from "lucide-react";
import {Button} from "../components/ui/Button";
import ReviewSection from "./ReviewSection";
import { toast } from "react-toastify";

const ListingDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

const { isLoggedIn, loading,user } = useAuthStatus();
  const navigate = useNavigate();
const userId = user?._id;
  const handleBooking = () => {
    if (!loading) {
      if (isLoggedIn) {
        navigate(`/listing/${id}/book`);
      } else {
        navigate('/login');
      }
    }
  };
  

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`https://stay-finder-pj4p.onrender.com/listing/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch listing");
        }
        const data = await res.json();
        setHotel(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load listing. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id]);

  const handleDelete = async() => {
   if (window.confirm("Are you sure you want to delete this listing?")) {
    try {
      const res = await fetch(`https://stay-finder-pj4p.onrender.com/listing/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete listing");
      }

      const data = await res.json();
      toast.success(data.message || "Listing deleted successfully");
      navigate("/listing"); 
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete listing");
    }
  }
  }
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Hotel ID
          </h1>
          <Link to="/listing" className="text-blue-600 underline">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg">Loading listing...</p>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-700 mb-4">
            {error || "Listing not found"}
          </h1>
          <Link to="/listing" className="text-blue-600 underline">
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const isOwner = userId && hotel && (userId === hotel.host?._id || userId === hotel.host);


  const amenityIcons = {
    WiFi: <Wifi className="h-5 w-5" />,
    Pool: <Waves className="h-5 w-5" />,
    Spa: <Coffee className="h-5 w-5" />,
    Restaurant: <Utensils className="h-5 w-5" />,
    Gym: <Dumbbell className="h-5 w-5" />,
    "Valet Parking": <Car className="h-5 w-5" />,
  };
  const defaultAmenities = [
    "WiFi",
    "Pool",
    "Spa",
    "Restaurant",
    "Beach Access",
    "Gym",
    "Fireplace",
    "Hiking Trails",
    "Ski Access",
    "Rooftop Bar",
    "Business Center",
    "Concierge",
    "Historic Tours",
    "Fine Dining",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/listing"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80 lg:h-96">
            <img
              src={hotel.image.url}
              alt={hotel.title}
              className="w-full h-full object-cover"
            />

            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-3 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Heart
                className={`h-6 w-6 transition-colors duration-200 ${
                  isFavorited
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              />
            </button>

          </div>

          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hotel.location},{hotel.country}</span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {hotel.title}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < Math.round(hotel.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {hotel.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    ({hotel.reviews.length} review
                    {hotel.reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              </div>

              <div className="lg:ml-8 bg-gray-50 rounded-lg p-6 min-w-[280px]">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">
                      ${hotel.price}
                    </span>
                    <span className="text-gray-600 ml-2">/ night</span>
                  </div>
                </div>
                {isOwner ? (
  <Button
    className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
    onClick={() => {
      fetch(`https://stay-finder-pj4p.onrender.com/listing/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to delete listing");
          navigate('/listing');
        })
        .catch(err => {
          console.error(err);
          toast.error("Failed to delete listing");
        });
    }}
  >
    Remove Listing
  </Button>
) : (
  <>
    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3" onClick={handleBooking}>
      Book Now
    </Button>
    <p className="text-sm text-gray-600 mt-2">
      Free cancellation before 24 hours
    </p>
    <p className="text-xs text-gray-500 text-center mt-2">
      You won't be charged yet
    </p>
  </>
)}

              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About this place
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {hotel.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {(hotel.amenities?.length
                  ? hotel.amenities
                  : defaultAmenities
                ).map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-blue-600">
                      {amenityIcons[amenity] || <Coffee className="h-5 w-5" />}
                    </div>
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ReviewSection listingId={id}/>
      </div>
    </div>
  );
};

export default ListingDetails;
