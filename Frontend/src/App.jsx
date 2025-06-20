import Navbar from './components/Navbar'
import './App.css'
import AllListings from './sections/AllListings'
import DetailListing from './sections/ListingDetails'
import { Routes, Route } from 'react-router-dom'
import BookingPage from './sections/BookingPage'
import Login from './sections/Login'
import Register from './sections/Register'
import AddListing from './sections/AddListing'
import MyBookings from './sections/MyBookings'
import AddReview from './sections/AddReview'
import MyReviews from './sections/MyReviews'
import Index from './sections/Index'
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <Navbar/>
        <div className='pt-15'>
<Routes>
        <Route path="/listing" element={<AllListings />} />
        <Route path="/listing/:id" element={<DetailListing />} />
        <Route path="/listing/:id/book" element={<BookingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path='/mybooking' element={<MyBookings/>}/>
        <Route path="/listing/:listingId/review" element={<AddReview />} />
        <Route path='/myreviews' element={<MyReviews/>}/>
        <Route path="/" element={<Index/>} />
        
</Routes>
 <ToastContainer />
        </div>
    </>
  )
}

export default App
