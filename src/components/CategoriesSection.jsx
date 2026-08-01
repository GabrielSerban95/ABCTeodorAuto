import React, { useState } from 'react';
import { COURSES } from '../data/mockData';
import { CheckCircle, Clock, BookOpen, Car, Calendar, ArrowRight, Tag } from 'lucide-react';

export default function CategoriesSection({ onSelectCourseForBooking }) {
  const [filter, setFilter] = useState('all');

  const filteredCourses = filter === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.id === filter);

  return (
    <section id="cursuri" className="py-5 position-relative" style={{ backgroundColor: '#0e1422' }}>
      <div className="container py-4">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge-custom mb-2">
            <Tag size={14} /> Tarife Transparente 2026
          </span>
          <h2 className="display-6 fw-extrabold text-site-heading font-heading">
            Cursuri Auto & Oferte Școlarizare
          </h2>
          <p className="text-site-muted mt-2" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Alege categoria potrivită pentru tine. Toate cursurile includ ore de teorie, practica pe traseu și pregătirea dosarului de examen.
          </p>

          {/* Filter Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
            <button 
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${filter === 'all' ? 'btn-primary bg-gradient-primary border-0' : 'btn-outline-secondary text-gray-300'}`}
              onClick={() => setFilter('all')}
            >
              Toate Categoriile
            </button>
            <button 
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${filter === 'cat-b' ? 'btn-primary bg-gradient-primary border-0' : 'btn-outline-secondary text-gray-300'}`}
              onClick={() => setFilter('cat-b')}
            >
              Categoria B
            </button>
            <button 
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${filter === 'cat-c' ? 'btn-primary bg-gradient-primary border-0' : 'btn-outline-secondary text-gray-300'}`}
              onClick={() => setFilter('cat-c')}
            >
              Categoria C
            </button>
            <button 
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${filter === 'cat-ce' ? 'btn-primary bg-gradient-primary border-0' : 'btn-outline-secondary text-gray-300'}`}
              onClick={() => setFilter('cat-ce')}
            >
              Categoria C+E
            </button>
            <button 
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${filter === 'extra' ? 'btn-primary bg-gradient-primary border-0' : 'btn-outline-secondary text-gray-300'}`}
              onClick={() => setFilter('extra')}
            >
              Ore Suplimentare
            </button>
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="row g-4 justify-content-center">
          {filteredCourses.map((course) => (
            <div className="col-lg-4 col-md-6" key={course.id}>
              <div className="glass-panel h-100 p-4 border border-secondary border-opacity-50 rounded-4 d-flex flex-column justify-content-between hover-lift">

                <div>
                  {/* Course Title + Badge */}
                  <div className="mb-2">
                    <h3 className="fw-bold text-site-heading mb-1 font-heading" style={{ fontSize: '1.2rem', lineHeight: '1.35' }}>
                      {course.title}
                    </h3>
                    {course.badge && (
                      <span className="badge-custom badge-amber shadow-sm" style={{ fontSize: '0.72rem' }}>
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Banner */}
                  <div className="d-flex align-items-baseline gap-2 my-3">
                    <span className="display-6 fw-extrabold text-warning font-heading">
                      {course.price} <small className="fs-6 text-white">RON</small>
                    </span>
                    <span className="text-gray-400" style={{ fontSize: '0.85rem' }}>/ Curs Complet</span>
                  </div>

                  <p className="text-site-body font-body mb-4" style={{ fontSize: '0.9rem' }}>
                    {course.description}
                  </p>

                  {/* Duration & Hours */}
                  <div className="d-flex align-items-center gap-3 p-2 rounded-3 bg-dark bg-opacity-60 mb-4 border border-secondary border-opacity-40" style={{ fontSize: '0.82rem' }}>
                    <div className="d-flex align-items-center gap-1 text-info">
                      <Clock size={15} /> <span>{course.duration}</span>
                    </div>
                    {course.theoryHours > 0 && (
                      <div className="d-flex align-items-center gap-1 text-gray-300">
                        <BookOpen size={15} /> <span>{course.theoryHours}h Teorie</span>
                      </div>
                    )}
                    <div className="d-flex align-items-center gap-1 text-warning">
                      <Car size={15} /> <span>{course.practiceHours}h Practică</span>
                    </div>
                  </div>

                  {/* Includes List */}
                  <h6 className="fw-bold text-white mb-2" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                    CE INCLUDE CURSUL:
                  </h6>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-4" style={{ fontSize: '0.88rem' }}>
                    {course.includes.map((inc, i) => (
                      <li key={i} className="d-flex align-items-start gap-2 text-gray-300">
                        <CheckCircle size={16} className="text-success flex-shrink-0 mt-1" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Button */}
                <button 
                  onClick={() => onSelectCourseForBooking(course.id)}
                  className="btn btn-warning rounded-pill py-2.5 w-100 fw-bold d-flex align-items-center justify-content-center gap-2 shadow hover-lift text-dark mt-auto"
                >
                  <Calendar size={18} />
                  <span>Programează Cursul</span>
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
