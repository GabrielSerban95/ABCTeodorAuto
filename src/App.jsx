import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import CategoriesSection from './components/CategoriesSection';
import FleetSection from './components/FleetSection';
import BookingCalendar from './components/BookingCalendar';
import ChatWidget from './components/ChatWidget';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentDashboard from './components/student/StudentDashboard';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import PageNotFound from './components/shared/PageNotFound';
import { ROUTES } from './constants/routes';
import { ROLES } from './constants/roles';

function PublicSite({ preselectedCategory, setPreselectedCategory }) {
  const handleOpenBooking = (catId) => {
    if (catId) setPreselectedCategory(catId);
    setTimeout(() => {
      const element = document.getElementById('programare');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenCourses = () => {
    setTimeout(() => {
      const element = document.getElementById('cursuri');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigate = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-vh-100 d-flex flex-column text-white">
      <Navbar />
      <main className="flex-grow-1">
        <Hero onOpenBooking={() => handleOpenBooking()} onOpenCourses={handleOpenCourses} />
        <AboutSection />
        <CategoriesSection onSelectCourseForBooking={handleOpenBooking} />
        <FleetSection />
        <BookingCalendar preselectedCategory={preselectedCategory} />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <ChatWidget onOpenBooking={() => handleOpenBooking()} />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  const [preselectedCategory, setPreselectedCategory] = useState('cat-b');
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<PublicSite preselectedCategory={preselectedCategory} setPreselectedCategory={setPreselectedCategory} />}
        />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} />}>
          <Route path={ROUTES.DASHBOARD} element={<StudentDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR]} />}>
          <Route path={ROUTES.PORTAL} element={<InstructorDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
        </Route>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace state={{ from: location }} />} />
      </Routes>
    </>
  );
}
