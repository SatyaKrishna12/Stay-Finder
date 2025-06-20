import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ListingCard from '../components/ListingCard';
import backgroundImage from '../assets/stayfinder_background.jpg'; 
import { useState, useEffect } from 'react';

const Index = () => {
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("https://stay-finder-pj4p.onrender.com/listing");
        const data = await res.json();
        setFeaturedListings(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch listings", error);
      }
    };

    fetchListings();
  }, []);

    const features = [
  {
    Icon: Search,
    title: 'Easy Discovery',
    desc: 'Find the perfect accommodation with our powerful search and filtering options.',
    className: 'bg-blue-50 hover:bg-blue-100',
    iconBg: 'bg-blue-600',
  },
  {
    Icon: Shield,
    title: 'Trusted & Secure',
    desc: 'Book with confidence knowing all our partners are verified and secure.',
    className: 'bg-green-50 hover:bg-green-100',
    iconBg: 'bg-green-600',
  },
  {
    Icon: Heart,
    title: 'Personalized',
    desc: 'Save your favorites and get personalized recommendations for future trips.',
    className: 'bg-purple-50 hover:bg-purple-100',
    iconBg: 'bg-purple-600',
  },
];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[600px] text-white">
       <img src={backgroundImage} alt="Back Ground" className='absolute insert-0 h-full w-full object-cover' />
        <div className="absolute inset-0 bg-[#00000069] bg-opacity-40" />
       <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Stay
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover amazing hotels, resorts, and unique accommodations around the world. Your next adventure starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listing">
              <Button size="lg" className="bg-blue-500 text-blue-600 border-1 hover:bg-blue-100 text-lg px-8 py-4">
                <Search className="mr-2 h-5 w-5 " /> Explore Stays
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                Join StayFinder
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose StayFinder?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding and booking your perfect stay simple, secure, and enjoyable.
            </p>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {features.map(({ Icon, title, desc, className, iconBg }, i) => (
    <div key={i} className={`text-center p-8 rounded-xl transition-colors ${className}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${iconBg}`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  ))}
</div>

        </div>
      </div>

       <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Stays
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked accommodations loved by our guests
            </p>
          </div>
          <Link
            to="/listing"
            className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {featuredListings.length > 0 ? (
            featuredListings.map((listing) => (
              <ListingCard key={listing._id || listing.id} listing={listing} />
            ))
          ) : (
            <p className="text-gray-500">No featured listings available.</p>
          )}
        </div>

        <div className="text-center md:hidden">
          <Link to="/listing">
            <Button className="bg-blue-600 hover:bg-blue-700">
              View All Stays <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  

      <div className="py-20 bg-blue-600 text-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
      Why Travelers Trust StayFinder
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
      {[
        { label: 'Happy Guests', value: '10K+' },
        { label: 'Properties', value: '500+' },
        { label: 'Cities', value: '50+' },
        {
          label: 'Average Rating',
          value: '4.8',
          icon: (
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mr-1" />
          ),
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-blue-500/40 backdrop-blur-sm rounded-xl py-6 px-4 shadow-lg transition hover:scale-105 duration-300"
        >
          <div className="text-4xl font-bold mb-2 flex justify-center items-center">
            {stat.icon && (
              <span className="mr-1 flex items-center">{stat.icon}</span>
            )}
            {stat.value}
          </div>
          <div className="text-blue-100 text-lg tracking-wide font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of travelers who trust StayFinder for their accommodation needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Browse All Stays
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
