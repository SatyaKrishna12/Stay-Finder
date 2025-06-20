import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import { Search } from 'lucide-react';

const AllListings = () => {
  const [listingData, setListingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const res = await fetch("https://stay-finder-pj4p.onrender.com/listing", {
        credentials: 'include',
      });
      const data = await res.json();
      setListingData(data);
      setFilteredListings(data);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = listingData.filter((listing) =>
      listing.title.toLowerCase().includes(term.toLowerCase()) ||
      listing.location.toLowerCase().includes(term.toLowerCase()) ||
      listing.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 min-h-[40vh] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Search through listings to discover your next destination
          </p>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-3 text-base bg-white text-black border border-gray-300 rounded-full shadow focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {renderSkeletons()}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            <Search className="mx-auto h-10 w-10 mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">
              No listings found
            </h3>
            <p className="mb-2">Try a different keyword or browse all available listings.</p>
            <button
              onClick={() => handleSearch('')}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
            >
              Show All Listings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListings;
