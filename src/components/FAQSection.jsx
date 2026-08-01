import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-5 position-relative" style={{ backgroundColor: '#0e1422' }}>
      <div className="container py-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-custom badge-amber mb-2">
            <HelpCircle size={14} /> Întrebări Frecvente
          </span>
          <h2 className="display-6 fw-extrabold text-white font-heading">
            Tot Ce Trebuie Să Știi Înainte De Înscriere
          </h2>
          <p className="text-gray-400 mt-2" style={{ color: '#9ca3af' }}>
            Răspunsuri la cele mai întâlnite nedumeriri despre scoala auto, acte necesare și procedura de examinare DRPCIV.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="d-flex flex-column gap-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="glass-panel border border-secondary border-opacity-50 rounded-4 overflow-hidden"
                  >
                    <button 
                      className="w-100 p-4 text-start bg-transparent border-0 d-flex justify-content-between align-items-center gap-3 text-white fw-bold font-heading"
                      style={{ fontSize: '1.05rem', cursor: 'pointer' }}
                      onClick={() => toggleIndex(idx)}
                    >
                      <span>{item.q}</span>
                      {isOpen ? <ChevronUp size={20} className="text-warning flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-0 text-gray-300 font-body border-top border-secondary border-opacity-30 mt-1" style={{ color: '#d1d5db', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        <p className="mb-0 pt-3">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
