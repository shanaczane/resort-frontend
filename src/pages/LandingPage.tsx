import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LandingPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "guest") {
        navigate("/guest-portal");
      } else if (user?.role === "operator") {
        navigate("/operator-dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleStartBooking = () => {
    if (isAuthenticated && user?.role === "guest") {
      navigate("/book");
    } else {
      navigate("/signup");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header/Navbar with Conditional Links and Mobile Support */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Park Inn Lodge</h1>
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 items-center">
            <a href="/" className="hover:text-red-600">
              Home
            </a>
            <a href="/book" className="hover:text-red-600">
              Book a Room
            </a>
            {!isAuthenticated ? (
              <>
                <a href="/login" className="hover:text-red-600">
                  Login
                </a>
                <a href="/signup" className="hover:text-red-600">
                  Sign Up
                </a>
              </>
            ) : user?.role === "guest" ? (
              <>
                <a href="/guest-portal" className="hover:text-red-600">
                  Guest Portal
                </a>
                <button onClick={logout} className="hover:text-red-600">
                  Logout
                </button>
              </>
            ) : null}
            <a href="/contact" className="hover:text-red-600">
              Contact
            </a>
            <button
              onClick={handleStartBooking}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Book Now
            </button>
          </nav>
          {/* Mobile Hamburger */}
          <button className="md:hidden text-red-600" onClick={toggleMenu}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <nav className="md:hidden bg-white px-4 py-2 flex flex-col space-y-2">
            <a href="/" className="hover:text-red-600">
              Home
            </a>
            <a href="/book" className="hover:text-red-600">
              Book a Room
            </a>
            {!isAuthenticated ? (
              <>
                <a href="/login" className="hover:text-red-600">
                  Login
                </a>
                <a href="/signup" className="hover:text-red-600">
                  Sign Up
                </a>
              </>
            ) : user?.role === "guest" ? (
              <>
                <a href="/guest-portal" className="hover:text-red-600">
                  Guest Portal
                </a>
                <button
                  onClick={logout}
                  className="hover:text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : null}
            <a href="/contact" className="hover:text-red-600">
              Contact
            </a>
            <button
              onClick={handleStartBooking}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Book Now
            </button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url(/path/to/resort-hero.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h2 className="text-4xl font-bold mb-2">
            Welcome to Park Inn Lodge – Your Perfect Getaway
          </h2>
          <p className="text-xl mb-4">
            Book rooms online, enjoy seamless stays, and request services
            effortlessly.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleStartBooking}
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
            >
              Start Booking
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-red-600">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
        <img
          src="/path/to/resort-about.jpg"
          alt="Resort View"
          className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4 rounded"
        />
        <div className="md:w-1/2">
          <h3 className="text-3xl font-bold mb-4">About Park Inn Lodge</h3>
          <p className="mb-4">
            Experience comfort with our Small, Medium, and Large rooms. Short
            stays (3/6 hours) or overnight options available.
          </p>
          <ul className="list-disc pl-5">
            <li>Digital Service Requests</li>
            <li>Secure Online Booking</li>
            <li>24/7 Operator Support</li>
          </ul>
        </div>
      </section>

      {/* Room Options Teaser */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">
            Our Room Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <img
                src="/path/to/small-room.jpg"
                alt="Small Room"
                className="w-full mb-4 rounded"
              />
              <h4 className="text-xl font-bold">Small Room</h4>
              <p>Cozy and affordable for short stays.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <img
                src="/path/to/medium-room.jpg"
                alt="Medium Room"
                className="w-full mb-4 rounded"
              />
              <h4 className="text-xl font-bold">Medium Room</h4>
              <p>Balanced space for comfort.</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <img
                src="/path/to/large-room.jpg"
                alt="Large Room"
                className="w-full mb-4 rounded"
              />
              <h4 className="text-xl font-bold">Large Room</h4>
              <p>Spacious luxury for longer stays.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleStartBooking}
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
            >
              View All Rooms & Book
            </button>
          </div>
        </div>
      </section>

      {/* Booking Process Overview */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center mb-8">
          Easy Booking Process
        </h3>
        <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="text-center">
            <div className="bg-red-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
              1
            </div>
            <p>Register/Login</p>
          </div>
          <div className="text-center">
            <div className="bg-red-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
              2
            </div>
            <p>Select Room & Dates</p>
          </div>
          <div className="text-center">
            <div className="bg-red-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
              3
            </div>
            <p>Submit & Await Approval</p>
          </div>
          <div className="text-center">
            <div className="bg-red-600 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
              4
            </div>
            <p>Check-In & Enjoy</p>
          </div>
        </div>
        <p className="text-center mt-4">
          Easy, Secure, and Fast – Get Approved in Minutes!
        </p>
      </section>

      {/* Menu Preview */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8">Menu Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <img
                src="/path/to/snack.jpg"
                alt="Snack"
                className="w-full mb-4 rounded"
              />
              <h4 className="text-xl font-bold">Snacks</h4>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <img
                src="/path/to/drink.jpg"
                alt="Drink"
                className="w-full mb-4 rounded"
              />
              <h4 className="text-xl font-bold">Drinks</h4>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <img
                src="/path/to/food.jpg"
                alt="Food"
                className="w-full mb-4 rounded"
              />
              <h4 className="text-xl font-bold">Food</h4>
            </div>
          </div>
          <p className="text-center mt-4">
            Available during your stay via Guest Portal.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <nav className="space-x-4 mb-2">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
            <a href="/admin" className="hover:underline">
              Operator Login
            </a>{" "}
            {/* Moved here for less prominence */}
          </nav>
          <p>© 2025 Park Inn Lodge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
