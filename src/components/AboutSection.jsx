import React from 'react';
import { UserCheck, BookOpen, Clock, FileCheck, HeartHandshake, DollarSign, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <UserCheck size={32} className="text-warning" />,
      title: 'Instructori Profesioniști și Prietenoși',
      text: 'Ghidare pas cu pas din partea instructorilor noștri experimentați, care te încurajează să te simți încrezător și stăpân pe tine în spatele volanului.'
    },
    {
      icon: <BookOpen size={32} className="text-info" />,
      title: 'Legislație Rutieră și Cazuri Practice',
      text: 'Înveți noțiunile teoretice prin scenarii din viața reală și exemple practice speciale pentru a-ți fixa cunoștințele înainte de examen.'
    },
    {
      icon: <Clock size={32} className="text-primary" />,
      title: 'Program Adaptabil și Flexibil',
      text: 'Înțelegem că timpul tău este prețios. Am creat un orar flexibil pentru a se potrivi cu școala, facultatea sau serviciul tău.'
    },
    {
      icon: <FileCheck size={32} className="text-success" />,
      title: 'Simulări Chestionare DRPCIV',
      text: 'Pregătește-te cu teste practice și simulări fidele dificultății examenului oficial, plus feedback instant pentru îmbunătățirea rezultatelor.'
    },
    {
      icon: <HeartHandshake size={32} className="text-danger" />,
      title: 'Susținere Continuă',
      text: 'Odată ce începi cursurile, ești parte din familia noastră. Îți răspundem la orice nelămurire până când ții permisul de conducere în mână.'
    },
    {
      icon: <DollarSign size={32} className="text-warning" />,
      title: 'Prețuri Transparente & Plată în Rate',
      text: 'Fără costuri ascunse! Beneficiezi de transparență totală și opțiuni de plată în 3 rate egale pe durata școlarizării.'
    }
  ];

  return (
    <section id="despre" className="py-5 bg-dark position-relative">
      <div className="container py-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-custom badge-amber mb-2">
            <Sparkles size={14} /> De Ce Să Alegi ABC Teodor
          </span>
          <h2 className="display-6 fw-extrabold text-white font-heading">
            Experiența Ta În Învățarea Conducerii Auto
          </h2>
          <p className="text-gray-400 mt-2 font-body" style={{ color: '#9ca3af', maxWidth: '700px', margin: '0 auto' }}>
            La Școala Auto ABC Teodor transformăm emoțiile de la volan în plăcerea de a conduce în siguranță. Iată pilonii noștri de excelență:
          </p>
        </div>

        {/* Features Grid */}
        <div className="row g-4">
          {features.map((item, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="glass-panel p-4 h-100 hover-lift d-flex flex-column justify-content-between border border-secondary border-opacity-50 rounded-4">
                <div>
                  <div className="p-3 rounded-3 bg-dark bg-opacity-75 d-inline-block mb-3 border border-secondary">
                    {item.icon}
                  </div>
                  <h4 className="fw-bold text-white mb-2 font-heading" style={{ fontSize: '1.15rem' }}>
                    {item.title}
                  </h4>
                  <p className="text-gray-300 font-body mb-0" style={{ color: '#d1d5db', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
