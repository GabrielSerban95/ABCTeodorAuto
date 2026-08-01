import { ENV } from '../config/env';
import rawCourses from './courses.json';
import rawInstructors from './instructors.json';
import rawFleet from './fleet.json';

export const COURSES = rawCourses.map(c => ({
  ...c,
  price: ENV.PRICES[c.priceKey] || c.defaultPrice
}));

export const INSTRUCTORS = rawInstructors;
export const FLEET = rawFleet;

export const INITIAL_BOOKINGS = [
  {
    id: 'BK-101',
    studentName: 'Andrei Vasilescu',
    studentPhone: '0740 123 987',
    studentEmail: 'andrei.v@gmail.com',
    instructorId: 'inst-1',
    instructorName: 'Teodor Popescu',
    category: 'cat-b',
    categoryName: 'Categoria B',
    date: '2026-08-03',
    time: '10:00 - 12:00',
    location: 'Sediul ABC Teodor - Ploiești',
    status: 'confirmat',
    notes: 'Ședința 5 - Exersare parcări în spic și marșarier'
  },
  {
    id: 'BK-102',
    studentName: 'Maria Ionescu',
    studentPhone: '0755 444 333',
    studentEmail: 'maria.ionescu@yahoo.com',
    instructorId: 'inst-3',
    instructorName: 'Elena Dumitrescu',
    category: 'cat-b',
    categoryName: 'Categoria B (Cutie Automată)',
    date: '2026-08-03',
    time: '14:00 - 16:00',
    location: 'Traseu examen Gară de Sud',
    status: 'in_asteptare',
    notes: 'Solicitare ședință suplimentară înaintea examenului'
  },
  {
    id: 'BK-103',
    studentName: 'Gabriel Radu',
    studentPhone: '0721 999 888',
    studentEmail: 'gabi.radu@outlook.com',
    instructorId: 'inst-2',
    instructorName: 'Adrian Ionescu',
    category: 'cat-c',
    categoryName: 'Categoria C (Camion)',
    date: '2026-08-04',
    time: '09:00 - 11:00',
    location: 'Poligon Manevre ABC Teodor',
    status: 'confirmat',
    notes: 'Ședința 8 - Manevre cuplare/decuplare'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'De la ce vârstă pot începe cursurile auto pentru Categoria B?',
    a: 'Cursurile teoretice și practice pot fi începute cu 3 luni înainte de a împlini vârsta de 18 ani (adică de la 17 ani și 9 luni). Susținerea examenului final DRPCIV are loc după împlinirea vârstei de 18 ani.'
  },
  {
    q: 'Ce acte îmi sunt necesare pentru înscriere?',
    a: 'Ai nevoie doar de Cartea de Identitate (buletin). Echipa noastră te va îndruma pas cu pas pentru obținerea fisei medicale și a avizului psihologic la clinicile noastre partenere din Ploiești.'
  },
  {
    q: 'Se pot plăti cursurile în rate?',
    a: 'Da! La Școala Auto ABC Teodor oferim posibilitatea de a achita contravaloarea cursului în 3 rate egale, prima rată fiind necesară doar la începerea orelor practice.'
  },
  {
    q: 'Cât durează pregătirea practică?',
    a: 'Pregătirea practică durează în medie între 4 și 6 săptămâni, în funcție de disponibilitatea ta de programare și de rapiditatea parcurgerii modulului teoretic.'
  },
  {
    q: 'Pot face pregătirea pe mașină cu cutie automată?',
    a: 'Absolut! În parcul nostru auto avem disponibile autoturisme moderne cu cutie automată (ex: Renault Clio 5 EDC).'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Cristian Marinescu',
    role: 'Proaspăt Șofer Categoria B',
    text: 'Am luat examenul teoretic cu 26 puncte și traseul din prima încercare! Domnul Teodor Popescu a avut o răbdare de fier cu mine. Recomand ABC Teodor tuturor!',
    rating: 5
  },
  {
    id: 2,
    name: 'Ana-Maria Georgescu',
    role: 'Cursantă Cat B (Cutie Automată)',
    text: 'Îmi era foarte frică de trafic înainte de prima oră. Cu sprijinul doamnei Elena, am căpătat încredere încă de la primele manevre. O atmosferă caldă și super profesionistă!',
    rating: 5
  },
  {
    id: 3,
    name: 'Mihai Dobre',
    role: 'Șofer Profesionist Cat. C + CE',
    text: 'Am făcut categoriile C și CE la ABC Teodor. Camioanele sunt foarte bine întreținute, iar instructorul Adrian explică excelent manevrele în poligon.',
    rating: 5
  }
];
