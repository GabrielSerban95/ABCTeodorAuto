import React, { useState, useRef, useEffect } from 'react';
import { ENV } from '../config/env';
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall, Calendar } from 'lucide-react';

export default function ChatWidget({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: ENV.CHAT_WELCOME_MSG,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    '💰 Cât costă Categoria B?',
    '📄 Ce acte îmi trebuie?',
    '💳 Pot plăti în rate?',
    '📅 Cum programez o oră?',
    '📍 Unde este sediul?'
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');

    // Generate Bot Response
    setTimeout(() => {
      let botAnswer = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('cat') || qLower.includes('cost') || qLower.includes('pret') || qLower.includes('tarif')) {
        botAnswer = `Tariful pentru Categoria B este de ${ENV.PRICES.CAT_B} RON și include 24h teorie + 30h practică. Pentru Categoria C este ${ENV.PRICES.CAT_C} RON, iar C+E este ${ENV.PRICES.CAT_CE} RON. Avem și opțiune de plată în 3 rate egale! 🚗`;
      } else if (qLower.includes('acte') || qLower.includes('dosar') || qLower.includes('medica')) {
        botAnswer = 'Pentru înscriere ai nevoie doar de Buletin (CI). Echipa noastră te îndrumă pas cu pas pentru fisa medicală și avizul psihologic la clinicile partenere ABC Teodor din Ploiești! 📄';
      } else if (qLower.includes('rate') || qLower.includes('plata') || qLower.includes('dobanda')) {
        botAnswer = 'Da! Toate cursurile noastre beneficiază de plată în 3 rate egale fără nicio dobândă. Prima rată se achită doar la începerea orelor practice. 💳';
      } else if (qLower.includes('program') || qLower.includes('ora') || qLower.includes('calendar')) {
        botAnswer = 'Îți poți programa orele de conducere direct de pe site din secțiunea "Programări Ore Conducere" sau apelând secretariatul la ' + ENV.PHONE + '! 📅';
      } else if (qLower.includes('sediu') || qLower.includes('unde') || qLower.includes('adresa') || qLower.includes('locat')) {
        botAnswer = 'Sediul nostru se află în Ploiești, pe ' + ENV.ADDRESS + '. Te așteptăm cu drag! 📍';
      } else {
        botAnswer = 'Mulțumesc pentru întrebare! Pentru detalii suplimentare specifice, ne poți apela direct la ' + ENV.PHONE + ' sau te poți programa online pentru o consultație gratuită. 🚗';
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-3 m-md-4" style={{ zIndex: 1050 }}>
      
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-warning rounded-circle p-3 shadow-2xl d-flex align-items-center justify-content-center hover-lift position-relative"
          style={{ width: '60px', height: '60px' }}
          aria-label="Deschide Asistent Virtual"
        >
          <MessageSquare size={28} className="text-dark" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.65rem' }}>
            AI 1
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="glass-panel border border-warning rounded-4 shadow-2xl overflow-hidden chat-window d-flex flex-column">
          
          {/* Header */}
          <div className="bg-gradient-primary p-3 d-flex align-items-center justify-content-between text-white border-bottom border-secondary">
            <div className="d-flex align-items-center gap-2">
              <div className="p-2 rounded-circle bg-warning text-dark">
                <Bot size={20} />
              </div>
              <div>
                <h6 className="fw-bold mb-0 font-heading" style={{ fontSize: '0.95rem' }}>{ENV.CHAT_BOT_NAME}</h6>
                <small className="text-warning d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                  <Sparkles size={11} /> Răspunde Instant • ABC Teodor
                </small>
              </div>
            </div>
            
            <button 
              className="btn btn-link text-white p-1 hover-text-warning"
              onClick={() => setIsOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-3 flex-grow-1 overflow-y-auto d-flex flex-column gap-3" style={{ backgroundColor: 'rgba(11, 15, 25, 0.95)' }}>
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`d-flex gap-2 max-w-85 ${m.sender === 'user' ? 'ms-auto flex-row-reverse' : ''}`}
                style={{ maxWidth: '85%' }}
              >
                <div className={`p-2 rounded-circle flex-shrink-0 ${m.sender === 'user' ? 'bg-primary text-white' : 'bg-warning text-dark'}`} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {m.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div>
                  <div className={`p-3 rounded-3 font-body ${
                    m.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-dark border border-secondary text-gray-200'
                  }`} style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {m.text}
                  </div>
                  <small className={`d-block text-gray-400 mt-1 ${m.sender === 'user' ? 'text-end' : ''}`} style={{ fontSize: '0.68rem' }}>
                    {m.time}
                  </small>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div 
            className="px-2 py-2 border-top border-secondary bg-dark bg-opacity-80 d-flex gap-2"
            style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', flexWrap: 'nowrap' }}
          >
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                className="btn btn-outline-secondary btn-sm rounded-pill text-gray-300"
                style={{ fontSize: '0.73rem', whiteSpace: 'nowrap', flexShrink: 0, padding: '4px 10px' }}
                onClick={() => handleSendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form 
            className="p-2 border-top border-secondary bg-dark d-flex gap-2"
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          >
            <input 
              type="text"
              className="form-control bg-dark text-white border-secondary form-control-sm rounded-pill px-3"
              placeholder="Scrie o întrebare..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
            />
            <button 
              type="submit" 
              className="btn btn-warning rounded-circle p-2 d-flex align-items-center justify-content-center text-dark"
              style={{ width: '36px', height: '36px' }}
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
