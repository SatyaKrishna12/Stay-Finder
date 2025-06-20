import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogOut, User, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { isLoggedIn, user, loading, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md text-gray-700 py-3' : 'text-blue-600 bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Home className="h-6 w-6" />
          StayFinder
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/listing" className="hover:text-blue-300 transition-colors">All Listings</Link>
          <Link to="/mybooking" className="hover:text-blue-300 transition-colors">My Booking</Link>
          <Link to="/myreviews" className="hover:text-blue-300 transition-colors">My Reviews</Link>
          <Link to="/addlisting" className="hover:text-blue-300 transition-colors">Add Listing</Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm">
                <User className="h-4 w-4" /> {user?.username}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm">Register</Button></Link>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 flex flex-col space-y-4 px-6 py-4 shadow-lg">
          <Link to="/listing" onClick={() => setMenuOpen(false)}>All Listings</Link>
          <Link to="/mybooking" onClick={() => setMenuOpen(false)}>My Booking</Link>
          <Link to="/myreviews" onClick={() => setMenuOpen(false)}>My Reviews</Link>
          <Link to="/addlisting" onClick={() => setMenuOpen(false)}>Add Listing</Link>

          {isLoggedIn ? (
            <>
              <span className="text-sm">Welcome, {user?.username}</span>
              <Button variant="outline" size="sm" onClick={() => { setMenuOpen(false); handleLogout(); }}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}><Button size="sm">Login</Button></Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}><Button size="sm" className="bg-blue-600 text-white">Register</Button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
