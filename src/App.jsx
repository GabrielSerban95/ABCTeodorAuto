import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import CategoriesSection from './components/CategoriesSection';
import FleetSection from './components/FleetSection';
import BookingCalendar from './components/BookingCalendar';
import InstructorPortal from './components/InstructorPortal';
import ChatWidget from './components/ChatWidget';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [preselectedCategory, setPreselectedCategory] = useState('cat-b');

  const handleOpenBooking = (catId) => {
    setActiveTab('main');
    if (catId) setPreselectedCategory(catId);
    setTimeout(() => {
      const element = document.getElementById('programare');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenCourses = () => {
    setActiveTab('main');
    setTimeout(() => {
      const element = document.getElementById('cursuri');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigate = (id) => {
    if (id === 'portal-instructori') {
      setActiveTab('portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActiveTab('main');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-vh-100 d-flex flex-column text-white">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View vs Instructor Portal View */}
      {activeTab === 'main' ? (
        <main className="flex-grow-1">
          {/* Hero Section */}
          <Hero 
            onOpenBooking={() => handleOpenBooking()} 
            onOpenCourses={handleOpenCourses} 
          />

          {/* About Section */}
          <AboutSection />

          {/* Categories & Pricing */}
          <CategoriesSection onSelectCourseForBooking={handleOpenBooking} />

          {/* Fleet & Instructors */}
          <FleetSection />

          {/* Interactive Booking & Schedule Calendar */}
          <BookingCalendar preselectedCategory={preselectedCategory} />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* FAQ */}
          <FAQSection />

          {/* Contact & Map */}
          <ContactSection />
        </main>
      ) : (
        /* Dedicated Instructor Portal View */
        <main className="flex-grow-1">
          <InstructorPortal />
        </main>
      )}

      {/* Interactive AI Chatbot Widget */}
      <ChatWidget onOpenBooking={() => handleOpenBooking()} />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
