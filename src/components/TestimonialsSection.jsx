import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, MessageSquareQuote, ThumbsUp } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-5 position-relative bg-dark">
      <div className="container py-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-custom badge-amber mb-2">
            <ThumbsUp size={14} /> Recenzii & Păreri Elevi
          </span>
          <h2 className="display-6 fw-extrabold text-site-heading font-heading">
            Ce Spun Absolvenții Școlii ABC Teodor
          </h2>
          <p className="text-site-muted mt-2">
            Peste 1500+ elevi au obținut permisul de conducere cu ajutorul echipei noastre din Ploiești.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="row g-4 justify-content-center">
          {TESTIMONIALS.map((t) => (
            <div className="col-lg-4 col-md-6" key={t.id}>
              <div className="glass-panel p-4 h-100 border border-secondary border-opacity-50 rounded-4 d-flex flex-column justify-content-between hover-lift">
                <div>
                  
                  {/* Quote Icon & Stars */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <MessageSquareQuote size={32} className="text-warning opacity-75" />
                    <div className="d-flex text-warning gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="text-gray-200 font-body mb-4" style={{ color: '#e5e7eb', fontSize: '0.94rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-top border-secondary border-opacity-40">
                  <h6 className="fw-bold text-site-heading mb-0 font-heading">{t.name}</h6>
                  <small className="text-warning d-block" style={{ fontSize: '0.8rem' }}>{t.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
