import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Calendar,
  Clock,
  Radio,
  MessageCircle,
  Heart,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Users,
  ArrowRight,
  Shirt,
  Volume2,
  Home,
  BookOpen,
  Coffee,
  Menu,
  X,
} from 'lucide-react';

// Componentes de Aceternity UI
import { Spotlight } from '../ui/Spotlight';
import { FlipWords } from '../ui/FlipWords';
import { CardSpotlight } from '../ui/CardSpotlight';
import { Button as MovingBorderButton } from '../ui/MovingBorder';
import { InfiniteMovingCards } from '../ui/InfiniteMovingCards';

// Iconos SVG inline para redes sociales (compatibilidad total)
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

interface ChurchLandingProps {
  onGoToStore: () => void;
}

interface CampusInfo {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  image: string;
  logo: string;
  badge: string;
  schedule: {
    day: string;
    time: string;
    title: string;
    description?: string;
  }[];
  whatsappMessage: string;
}

export const ChurchLanding: React.FC<ChurchLandingProps> = ({ onGoToStore }) => {
  const [selectedCampusId, setSelectedCampusId] = useState<string>('centro');
  const [isPlayingRadio, setIsPlayingRadio] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const mainPhone = "+54 9 223 669-8531";
  const whatsappNumber = "5492236698531";

  // Disparar confeti sutil al ir a la tienda con los colores de Passion City
  const handleOpenStore = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#00B7E3', '#00CEFF', '#E2E3DA', '#0E1216']
      });
    } catch {
      // Ignorar si falla en algún entorno restringido
    }
    onGoToStore();
  };

  // Las 3 Sedes oficiales con sus logos e imágenes oficiales
  const campuses: CampusInfo[] = [
    {
      id: 'centro',
      name: 'Sede Centro (Mar del Plata)',
      shortName: 'Centro MDP',
      tagline: 'El corazón de nuestra casa en el centro marplatense',
      address: 'Gascón 2265',
      city: 'Mar del Plata, Buenos Aires',
      googleMapsUrl: 'https://maps.google.com/?q=Gascon+2265,+Mar+del+Plata',
      image: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?auto=format&fit=crop&w=1600&q=85',
      logo: '/LogoVcpMdp(color+blanco).png',
      badge: 'Sede Principal',
      schedule: [
        {
          day: 'Domingos',
          time: '10:30 hs y 19:30 hs',
          title: 'Reuniones Generales de Adoración & Palabra',
          description: 'Experiencia para toda la familia con VCP Kids simultáneo.'
        },
        {
          day: 'Miércoles',
          time: '20:00 hs',
          title: 'Encuentro de Oración & Discipulado',
          description: 'Tiempo íntimo de intercesión y profundización bíblica.'
        },
        {
          day: 'Sábados',
          time: '20:00 hs',
          title: 'Reunión de Jóvenes & PreJuveniles',
          description: 'Música en vivo, amistad genuina y desafíos actuales.'
        }
      ],
      whatsappMessage: '¡Hola! Quiero consultar por las reuniones de la Sede Centro (Gascón 2265).'
    },
    {
      id: 'santaclara',
      name: 'Sede Santa Clara del Mar',
      shortName: 'Santa Clara',
      tagline: 'Comunidad viva y cálida frente al mar',
      address: 'Selva Negra 522',
      city: 'Santa Clara del Mar, Costa Atlántica',
      googleMapsUrl: 'https://maps.google.com/?q=Selva+Negra+522,+Santa+Clara+del+Mar',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      logo: '/LogoVcpSta(color+blanco).png',
      badge: 'Costa Atlántica',
      schedule: [
        {
          day: 'Domingos',
          time: '18:30 hs',
          title: 'Celebración Familiar de Adoración',
          description: 'Comunión, adoración y un mensaje fresco para la costa.'
        },
        {
          day: 'Jueves',
          time: '19:30 hs',
          title: 'Estudio Bíblico & Vida en Comunidad',
          description: 'Un espacio acogedor para crecer juntos en la fe.'
        }
      ],
      whatsappMessage: '¡Hola! Me gustaría información sobre las reuniones en Sede Santa Clara del Mar.'
    },
    {
      id: 'zonasur',
      name: 'Sede Zona Sur (Mar del Plata)',
      shortName: 'MDP Zona Sur',
      tagline: 'Una familia cerca de tu hogar en los barrios del sur',
      address: 'Av. Roberto Centeno 3380',
      city: 'Mar del Plata, Buenos Aires',
      googleMapsUrl: 'https://maps.google.com/?q=Av.+Roberto+Centeno+3380,+Mar+del+Plata',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
      logo: '/LogoVcpMdp(color).png',
      badge: 'Zona Sur',
      schedule: [
        {
          day: 'Domingos',
          time: '19:00 hs',
          title: 'Culto General Familiar',
          description: 'Adoración vibrante y atención personalizada.'
        },
        {
          day: 'Viernes',
          time: '20:00 hs',
          title: 'Noche de Comunidad & Jóvenes',
          description: 'Comunión entre vecinos y familias de la zona sur.'
        }
      ],
      whatsappMessage: '¡Hola! Quisiera conocer más sobre las actividades en la Sede Zona Sur.'
    }
  ];

  const currentCampus = campuses.find((c) => c.id === selectedCampusId) || campuses[0];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCampus = (campusId: string) => {
    setSelectedCampusId(campusId);
    scrollToSection('sedes');
  };

  // Versículos y pilares de la casa para Infinite Moving Cards (Aceternity UI)
  const testimonyItems = [
    {
      quote: "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.",
      name: "Jesús",
      title: "Mateo 18:20"
    },
    {
      quote: "Una iglesia plantada en tres sedes para bendecir y abrazar a toda la ciudad y la costa.",
      name: "Visión Pastoral",
      title: "Mar del Plata & Santa Clara"
    },
    {
      quote: "La vida de fe no es un evento de fin de semana: se vive y se comparte en los hogares día a día.",
      name: "Casas Iglesias",
      title: "Comunidad en Acción"
    },
    {
      quote: "Fe visible, verdad inquebrantable y un propósito eterno para cada miembro de la familia.",
      name: "VCP Design & Comunidad",
      title: "Identidad del Reino"
    },
    {
      quote: "Nadie camina solo cuando estamos en casa. Hay un lugar reservado especialmente para vos.",
      name: "Vidas con Propósito",
      title: "Bienvenidos a Casa"
    }
  ];

  // Próximos eventos
  const events = [
    {
      id: 'congreso-mujeres',
      title: 'Congreso de Mujeres: "Genuinas"',
      category: 'Conferencia Anual',
      date: '16 y 17 de Mayo',
      time: '18:30 hs',
      location: 'Sede Centro • Gascón 2265',
      desc: 'Un fin de semana diseñado para renovar tus fuerzas, recibir palabras de aliento y conectar con amigas en una atmósfera de adoración profunda.',
      badge: 'Inscripciones Abiertas',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85',
      whatsappText: '¡Hola! Quiero inscribirme o recibir más información sobre el Congreso de Mujeres: Genuinas.'
    },
    {
      id: 'te-desfile',
      title: 'Té Desfile & Lanzamiento VCP',
      category: 'Comunión & Indumentaria',
      date: 'Sábado 20 de Junio',
      time: '16:30 hs',
      location: 'Salón Principal VCP',
      desc: 'Merienda especial con desfile exclusivo de la nueva colección de remeras de VCP Design. Una tarde de deleite, música en vivo y sorpresas.',
      badge: 'Cupos Limitados',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      whatsappText: '¡Hola! Quisiera reservar tarjeta para el Té Desfile & Lanzamiento VCP.'
    },
    {
      id: 'campamento-jovenes',
      title: 'Campamento de Jóvenes: "Fuego & Pasión"',
      category: 'Retiro Juvenil',
      date: '10 al 12 de Octubre',
      time: 'Salida 08:00 hs',
      location: 'Predio Sierras de los Padres',
      desc: 'Tres días inolvidables de desconexión del ruido para conectarse con Dios. Juegos, talleres, fogón nocturno y amigos para toda la vida.',
      badge: 'Próximamente',
      badgeColor: 'bg-stone-500/20 text-stone-300 border-stone-500/30',
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=85',
      whatsappText: '¡Hola! Quiero info y detalles sobre el Campamento de Jóvenes en las Sierras.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F7] text-[#0E1216] selection:bg-[#00B7E3]/30 selection:text-[#0E1216] font-sans flex flex-col antialiased overflow-x-hidden">
      
      {/* =========================================================================
          1. HEADER FLOTANTE CON LOGO OFICIAL VCP Y MOVING BORDER DE ACETERNITY UI
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#DBDAD7] transition-all duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Oficial con vcplogo.png */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <img
              src="/vcplogo.png"
              alt="Logo VCP"
              className="h-9 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:block border-l border-[#DBDAD7] pl-3">
              <span className="block text-[11px] font-bold text-[#00B7E3] tracking-widest uppercase">
                Una iglesia • Tres sedes
              </span>
            </div>
          </a>

          {/* Menú de Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-[#555250]">
            <button
              onClick={() => scrollToSection('sedes')}
              className="hover:text-[#0E1216] transition-colors cursor-pointer"
            >
              Nuestras Sedes
            </button>
            <button
              onClick={() => scrollToSection('ministerios')}
              className="hover:text-[#0E1216] transition-colors cursor-pointer"
            >
              Ministerios
            </button>
            <button
              onClick={() => scrollToSection('casas-iglesias')}
              className="hover:text-[#0E1216] transition-colors cursor-pointer"
            >
              Casas Iglesias
            </button>
            <button
              onClick={() => scrollToSection('eventos')}
              className="hover:text-[#0E1216] transition-colors cursor-pointer"
            >
              Eventos
            </button>
            <button
              onClick={() => scrollToSection('radio')}
              className="hover:text-[#009ECA] transition-colors flex items-center gap-1.5 cursor-pointer text-[#00B7E3] font-bold"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>RadioOoW 24/7</span>
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="hover:text-[#0E1216] transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Botón Destacado Estilo Aceternity MovingBorder con Celeste Passion City */}
          <div className="flex items-center gap-3">
            <MovingBorderButton
              onClick={handleOpenStore}
              borderRadius="9999px"
              duration={3000}
              className="px-5 py-2.5 bg-gradient-to-r from-[#00B7E3] via-[#00CEFF] to-[#00B7E3] text-[#0E1216] font-black text-xs sm:text-sm tracking-wide gap-2 shadow-md shadow-[#00B7E3]/25 border border-[#00B7E3]/40"
              containerClassName="h-11"
            >
              <Shirt className="w-4 h-4 text-[#0E1216]" />
              <span>Tienda VCP Design</span>
              <span className="text-base">👕</span>
            </MovingBorderButton>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl border border-[#DBDAD7] bg-white text-[#0E1216] hover:bg-[#F5F2EB] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DBDAD7] bg-white px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-3 font-semibold text-sm text-[#555250]">
              <button
                onClick={() => scrollToSection('sedes')}
                className="text-left py-2 hover:text-[#0E1216] border-b border-[#DBDAD7]/50"
              >
                📍 Nuestras Sedes (Centro, Santa Clara, Zona Sur)
              </button>
              <button
                onClick={() => scrollToSection('ministerios')}
                className="text-left py-2 hover:text-[#0E1216] border-b border-[#DBDAD7]/50"
              >
                🤝 Ministerios (Kids, Jóvenes, Genuinas, Parejas)
              </button>
              <button
                onClick={() => scrollToSection('casas-iglesias')}
                className="text-left py-2 hover:text-[#0E1216] border-b border-[#DBDAD7]/50"
              >
                🏡 Casas Iglesias en los Barrios
              </button>
              <button
                onClick={() => scrollToSection('eventos')}
                className="text-left py-2 hover:text-[#0E1216] border-b border-[#DBDAD7]/50"
              >
                📅 Próximos Eventos & Congresos
              </button>
              <button
                onClick={() => scrollToSection('radio')}
                className="text-left py-2 text-[#00B7E3] font-bold border-b border-[#DBDAD7]/50 flex items-center justify-between"
              >
                <span>📻 RadioOoW Online 24/7</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E0F7FC] text-[#007B9E] border border-[#BAE6FD]">EN VIVO</span>
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="text-left py-2 hover:text-[#0E1216]"
              >
                💬 Contacto & WhatsApp
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenStore();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#00B7E3] hover:bg-[#00CEFF] text-[#0E1216] font-black text-sm shadow-md"
              >
                <Shirt className="w-4 h-4" />
                <span>Explorar Tienda VCP Design 👕</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION CON SPOTLIGHT & FLIPWORDS DE ACETERNITY UI
         ========================================================================= */}
      <section
        id="inicio"
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#F9F8F7] text-[#0E1216]"
      >
        {/* Aceternity Spotlight cónico en Celeste Passion City */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#00B7E3"
        />

        {/* Fondo editorial con imagen oficial de portada, beige y celestes */}
        <div className="absolute inset-0 z-0">
          <img
            src="/portada.jpg"
            alt="Reunión y Comunidad Vidas con Propósito"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply filter contrast-105"
          />
          <div className="absolute inset-0 bg-radial-celeste opacity-50" />
          <div className="absolute inset-0 bg-radial-tan opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F7] via-[#F9F8F7]/75 to-[#F9F8F7]/85" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center text-[#0E1216] flex flex-col items-center">
          
          {/* Logo Principal Oficial de Portada (vcplogo.png) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <div className="relative group inline-block">
              {/* Resplandor sutil celeste de fondo */}
              <div className="absolute -inset-6 bg-[#00B7E3]/15 rounded-full blur-2xl group-hover:bg-[#00B7E3]/25 transition-all duration-500 pointer-events-none" />
              <img
                src="/vcplogo.png"
                alt="Comunidad de Fe Vidas con Propósito"
                className="relative h-20 sm:h-28 md:h-36 w-auto object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Badge superior: 2026 año de expansión */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F7FC] border border-[#BAE6FD] text-[#007B9E] text-xs sm:text-sm font-bold mb-6 tracking-wide shadow-xs uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00B7E3]" />
            <span>2026, Año de Expansión</span>
          </motion.div>

          {/* Titular Imponente Editorial con tracking negativo característico */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#0E1216] leading-[1.02] max-w-4xl drop-shadow-xs mb-6"
          >
            Bienvenidos a Casa
          </motion.h1>

          {/* Subtítulo dinámico con FlipWords en Celeste #00B7E3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-2xl text-[#555250] font-normal max-w-3xl leading-relaxed mb-10 flex flex-wrap items-center justify-center"
          >
            <span>Una comunidad de&nbsp;</span>
            <FlipWords
              words={["Propósito", "Familia", "Adoración", "Fe Viva", "Esperanza"]}
              className="text-[#00B7E3] font-black"
            />
            <span>&nbsp;en Mar del Plata y la costa.</span>
          </motion.div>

          {/* Selector de sedes en cápsulas flotantes beige y blanco */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 w-full max-w-2xl"
          >
            <p className="text-xs uppercase tracking-widest text-[#676263] font-bold mb-3.5">
              Elegí tu sede más cercana:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {campuses.map((campus) => {
                const isSelected = selectedCampusId === campus.id;
                return (
                  <button
                    key={campus.id}
                    onClick={() => handleSelectCampus(campus.id)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#00B7E3] text-[#0E1216] border-[#00B7E3] shadow-md shadow-[#00B7E3]/25 scale-105 font-black'
                        : 'bg-white hover:bg-[#F5F2EB] text-[#0E1216] border-[#DBDAD7] shadow-xs hover:border-[#00B7E3]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#00B7E3]" />
                    <span>{campus.shortName}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Botones de Acción Principales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
          >
            <button
              onClick={() => scrollToSection('sedes')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0E1216] text-white hover:bg-black font-extrabold text-sm tracking-wide shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Conocé Nuestras Sedes</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            <MovingBorderButton
              onClick={handleOpenStore}
              borderRadius="9999px"
              duration={2800}
              className="px-7 py-4 bg-[#00B7E3] hover:bg-[#00CEFF] text-[#0E1216] font-black text-sm tracking-wide gap-2 border border-[#00B7E3]/40 shadow-md shadow-[#00B7E3]/20"
              containerClassName="h-14 w-full sm:w-auto"
            >
              <Shirt className="w-4 h-4 text-[#0E1216]" />
              <span>Indumentaria VCP Design</span>
            </MovingBorderButton>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-[#676263] flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#676263]">Explorar</span>
          <div className="w-5 h-8 rounded-full border-2 border-[#DBDAD7] flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-[#00B7E3] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          INFINITE MOVING CARDS (ACETERNITY UI) - CITAS Y PILARES EN TONO BEIGE TAN
         ========================================================================= */}
      <section className="py-10 bg-[#E2E3DA] border-y border-[#DBDAD7] overflow-hidden">
        <InfiniteMovingCards
          items={testimonyItems}
          direction="right"
          speed="normal"
        />
      </section>

      {/* =========================================================================
          3. NUESTRAS 3 SEDES (CON SUS LOGOS OFICIALES Y CARDSPOTLIGHT)
         ========================================================================= */}
      <section id="sedes" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#00B7E3]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 relative z-10"
        >
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#00B7E3] block mb-2">
            Tres Ubicaciones • Una Misma Familia
          </span>
          <h2 className="font-headline text-4xl sm:text-6xl font-black text-[#0E1216] tracking-tight mb-5">
            Nuestras Sedes
          </h2>
          <p className="text-base sm:text-lg text-[#555250] font-normal leading-relaxed">
            Estamos plantados en puntos estratégicos de Mar del Plata y la costa para que puedas adorar a Dios y vivir en comunidad cerca de tu casa.
          </p>
        </motion.div>

        {/* Tabs de Selección Rápida en Blanco y Beige */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#DBDAD7] shadow-xs">
            {campuses.map((campus) => (
              <button
                key={campus.id}
                onClick={() => setSelectedCampusId(campus.id)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  selectedCampusId === campus.id
                    ? 'bg-[#00B7E3] text-[#0E1216] shadow-xs font-black'
                    : 'text-[#676263] hover:text-[#0E1216]'
                }`}
              >
                {campus.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjeta Principal de la Sede con CardSpotlight y Logo Oficial */}
        <motion.div
          key={currentCampus.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-16"
        >
          <CardSpotlight
            color="rgba(0, 183, 227, 0.18)"
            radius={450}
            className="p-0 overflow-hidden border border-[#DBDAD7] bg-white shadow-xl shadow-stone-300/40 text-[#0E1216]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
              
              {/* Foto de la sede con hover zoom suave y overlay */}
              <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full overflow-hidden group">
                <img
                  src={currentCampus.image}
                  alt={currentCampus.name}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1216]/80 via-transparent to-transparent" />
                
                {/* Logo oficial de la sede superpuesto */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="h-12 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DBDAD7] flex items-center justify-center shadow-md">
                    <img
                      src={currentCampus.logo}
                      alt={`Logo ${currentCampus.name}`}
                      className="h-full object-contain"
                    />
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#00B7E3] text-[#0E1216] font-black text-xs shadow-xs">
                    {currentCampus.badge}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-headline font-black text-white mb-1 drop-shadow-md">
                    {currentCampus.name}
                  </h3>
                  <p className="text-xs text-stone-200 flex items-center gap-1.5 font-medium drop-shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#00CEFF] shrink-0" />
                    <span>{currentCampus.address}, {currentCampus.city}</span>
                  </p>
                </div>
              </div>

              {/* Contenido Editorial & Horarios */}
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#00B7E3] block mb-1">
                    Información & Reuniones
                  </span>
                  <h3 className="font-headline text-3xl font-black text-[#0E1216] mb-2 tracking-tight">
                    {currentCampus.name}
                  </h3>
                  <p className="text-sm text-[#555250] font-normal mb-6">
                    {currentCampus.tagline}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#676263] mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00B7E3]" />
                    <span>Horarios de Reuniones:</span>
                  </h4>

                  <div className="space-y-3 mb-8">
                    {currentCampus.schedule.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#F5F4EF] border border-[#E2E1DB] hover:border-[#00B7E3]/40 transition-all duration-300"
                      >
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="font-bold text-[#0E1216] text-sm">{item.day}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7FC] text-[#007B9E] text-xs font-black border border-[#BAE6FD]">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#302D2E]">{item.title}</p>
                        {item.description && (
                          <p className="text-[11px] text-[#676263] mt-0.5 font-normal">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#DBDAD7]">
                  <a
                    href={currentCampus.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#0E1216] hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#00CEFF]" />
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(currentCampus.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#00B7E3] hover:bg-[#00CEFF] text-[#0E1216] font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#00B7E3]/20 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#0E1216]" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </CardSpotlight>
        </motion.div>

        {/* Las 3 Sedes en Tarjetas Visuales con CardSpotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {campuses.map((campus) => {
            const isCurrent = campus.id === selectedCampusId;
            return (
              <motion.div
                key={campus.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedCampusId(campus.id)}
                className="cursor-pointer"
              >
                <CardSpotlight
                  color="rgba(0, 183, 227, 0.22)"
                  radius={280}
                  className={`relative overflow-hidden min-h-[340px] flex flex-col justify-end p-6 border transition-all duration-500 rounded-3xl ${
                    isCurrent
                      ? 'border-[#00B7E3] ring-2 ring-[#00B7E3]/40 shadow-lg shadow-[#00B7E3]/15'
                      : 'border-[#DBDAD7] hover:border-[#00B7E3]/50 shadow-sm'
                  }`}
                >
                  {/* Imagen de fondo con hover zoom */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={campus.image}
                      alt={campus.name}
                      className="w-full h-full object-cover filter brightness-[0.6] group-hover/spotlight:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1216] via-[#0E1216]/60 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-7 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-[#DBDAD7] flex items-center">
                        <img src={campus.logo} alt="Logo" className="h-full object-contain" />
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00B7E3] text-[#0E1216]">
                          Activa
                        </span>
                      )}
                    </div>

                    <h4 className="font-headline text-xl font-black text-white mb-1 group-hover/spotlight:text-[#00CEFF] transition-colors">
                      {campus.name}
                    </h4>

                    <p className="text-xs text-stone-200 mb-3 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#00B7E3] shrink-0" />
                      <span>{campus.address}</span>
                    </p>

                    <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-bold text-[#00CEFF]">
                      <span>Ver Horarios & Mapa</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/spotlight:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. MINISTERIOS (BENTO GRID CON LAS IMÁGENES Y LOGOS OFICIALES)
         ========================================================================= */}
      <section id="ministerios" className="py-28 bg-[#EFEEEB] border-y border-[#DBDAD7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#00B7E3] block mb-2">
              Comunidad & Propósito
            </span>
            <h2 className="font-headline text-4xl sm:text-6xl font-black text-[#0E1216] tracking-tight mb-5">
              Ministerios para Cada Etapa
            </h2>
            <p className="text-base sm:text-lg text-[#555250] font-normal leading-relaxed">
              Creemos en una iglesia donde cada miembro de la familia encuentre su lugar de pertenencia, crecimiento espiritual y amistad sincera.
            </p>
          </motion.div>

          {/* Bento Grid Asimétrico con Logos Oficiales */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* 1. VCP Kids (Grande - 8 cols) con Logo Oficial VcpKidsColor.png */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-8">
              <CardSpotlight
                radius={380}
                color="rgba(0, 183, 227, 0.25)"
                className="min-h-[380px] p-8 flex flex-col justify-end relative overflow-hidden group/card border-[#DBDAD7] shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1200&q=85"
                  alt="VCP Kids"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] group-hover/spotlight:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1216] via-[#0E1216]/65 to-transparent" />
                
                {/* Logo oficial VCP Kids */}
                <div className="absolute top-6 right-6 w-28 sm:w-36 h-auto drop-shadow-2xl">
                  <img
                    src="/VcpKidsColor.png"
                    alt="VCP Kids Logo"
                    className="w-full h-auto object-contain filter drop-shadow-md"
                  />
                </div>

                <div className="relative z-10 max-w-lg">
                  <span className="px-3.5 py-1 rounded-full bg-[#00B7E3] text-[#0E1216] text-xs font-black shadow-xs mb-3 inline-block">
                    Bebés a 11 años
                  </span>
                  <h3 className="font-headline text-3xl font-black text-white mb-2">
                    VCP Kids
                  </h3>
                  <p className="text-sm text-stone-200 font-normal mb-4">
                    Un espacio pensado especialmente para que los niños crezcan en fe, amistad y alegría en un entorno seguro y divertido durante cada reunión.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Me gustaría saber más sobre las actividades de VCP Kids.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00CEFF] hover:text-white transition-colors"
                  >
                    <span>Consultar actividades para niños</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardSpotlight>
            </motion.div>

            {/* 2. Jóvenes con Logo Oficial jovenes(blanco).png (Vertical - 4 cols) */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-4">
              <CardSpotlight
                radius={320}
                color="rgba(0, 183, 227, 0.25)"
                className="min-h-[380px] p-8 flex flex-col justify-end relative overflow-hidden border-[#DBDAD7] shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=85"
                  alt="Jóvenes VCP"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] group-hover/spotlight:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1216] via-[#0E1216]/75 to-transparent" />
                
                {/* Logo oficial Jóvenes */}
                <div className="absolute top-6 right-6 w-24 h-auto drop-shadow-2xl">
                  <img
                    src="/jovenes(blanco).png"
                    alt="Logo Jóvenes"
                    className="w-full h-auto object-contain filter drop-shadow"
                  />
                </div>

                <div className="relative z-10">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/20 mb-3 inline-block">
                    Sábados 20:00 hs
                  </span>
                  <h3 className="font-headline text-2xl font-black text-white mb-2">
                    Jóvenes
                  </h3>
                  <p className="text-xs text-stone-200 font-normal mb-4">
                    Comunidad vibrante, pasión por Jesús y amistad para cambiar nuestra ciudad. Música en vivo y desafíos reales.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Quiero sumarme a las reuniones de Jóvenes de VCP.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00CEFF] hover:text-white transition-colors"
                  >
                    <span>Sumarme al grupo de Jóvenes</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardSpotlight>
            </motion.div>

            {/* 3. Mujeres "Genuinas" con Logo Oficial genuinas(blanco).png (4 cols) */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-4">
              <CardSpotlight
                radius={300}
                color="rgba(250, 131, 173, 0.3)"
                className="min-h-[360px] p-8 flex flex-col justify-end relative overflow-hidden border-[#DBDAD7] shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
                  alt="Genuinas Mujeres con Propósito"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] group-hover/spotlight:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1216] via-[#0E1216]/75 to-transparent" />
                
                {/* Logo oficial Genuinas */}
                <div className="absolute top-6 right-6 w-28 h-auto drop-shadow-2xl">
                  <img
                    src="/genuinas(blanco).png"
                    alt="Logo Genuinas"
                    className="w-full h-auto object-contain filter drop-shadow"
                  />
                </div>

                <div className="relative z-10">
                  <span className="px-3.5 py-1 rounded-full bg-[#FA83AD] text-[#0E1216] text-xs font-black mb-3 inline-block shadow-xs">
                    Genuinas
                  </span>
                  <h3 className="font-headline text-2xl font-black text-white mb-2">
                    Mujeres con Propósito
                  </h3>
                  <p className="text-xs text-stone-200 font-normal mb-4">
                    Crecimiento espiritual, comunión sincera y eventos especiales como el Té Desfile y congresos anuales.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Me gustaría información sobre los encuentros de Genuinas (Mujeres).')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FA83AD] hover:text-white transition-colors"
                  >
                    <span>Conectar con Genuinas</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardSpotlight>
            </motion.div>

            {/* 4. Parejas & Familias con Logo Oficial parejas.png (4 cols) */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-4">
              <CardSpotlight
                radius={300}
                color="rgba(0, 183, 227, 0.25)"
                className="min-h-[360px] p-8 flex flex-col justify-end relative overflow-hidden border-[#DBDAD7] shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=85"
                  alt="Ministerio de Parejas"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] group-hover/spotlight:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1216] via-[#0E1216]/75 to-transparent" />
                
                {/* Logo oficial Parejas */}
                <div className="absolute top-6 right-6 w-28 h-auto drop-shadow-2xl">
                  <img
                    src="/parejas.png"
                    alt="Logo Parejas"
                    className="w-full h-auto object-contain filter drop-shadow"
                  />
                </div>

                <div className="relative z-10">
                  <span className="px-3.5 py-1 rounded-full bg-[#E2E3DA] text-[#0E1216] text-xs font-black border border-[#DBDAD7] mb-3 inline-block shadow-xs">
                    Matrimonios & Familias
                  </span>
                  <h3 className="font-headline text-2xl font-black text-white mb-2">
                    Parejas con Propósito
                  </h3>
                  <p className="text-xs text-stone-200 font-normal mb-4">
                    Fortaleciendo lazos matrimoniales, comunicación y principios de Dios para construir hogares firmes y bendecidos.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Quiero info de las actividades del ministerio de Parejas.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00CEFF] hover:text-white transition-colors"
                  >
                    <span>Actividades para Parejas</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardSpotlight>
            </motion.div>

            {/* 5. PreJuveniles con Logo Oficial pre juveniles.png (4 cols) */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-4">
              <CardSpotlight
                radius={300}
                color="rgba(0, 183, 227, 0.25)"
                className="min-h-[360px] p-8 flex flex-col justify-end relative overflow-hidden border-[#DBDAD7] shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85"
                  alt="PreJuveniles"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] group-hover/spotlight:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1216] via-[#0E1216]/75 to-transparent" />
                
                {/* Logo oficial PreJuveniles */}
                <div className="absolute top-6 right-6 w-28 h-auto drop-shadow-2xl">
                  <img
                    src="/pre juveniles.png"
                    alt="Logo PreJuveniles"
                    className="w-full h-auto object-contain filter drop-shadow"
                  />
                </div>

                <div className="relative z-10">
                  <span className="px-3.5 py-1 rounded-full bg-[#E0F7FC] text-[#007B9E] text-xs font-black border border-[#BAE6FD] mb-3 inline-block shadow-xs">
                    12 a 15 años
                  </span>
                  <h3 className="font-headline text-2xl font-black text-white mb-2">
                    PreJuveniles
                  </h3>
                  <p className="text-xs text-stone-200 font-normal mb-4">
                    Acompañando a los adolescentes a descubrir su identidad, afianzar amistades sanas y abrazar su propósito.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Me gustaría información sobre PreJuveniles.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00CEFF] hover:text-white transition-colors"
                  >
                    <span>Actividades PreJuveniles</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </CardSpotlight>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BANNER VCP DESIGN CON SPOTLIGHT & MOVING BORDER DE ACETERNITY UI
         ========================================================================= */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <div className="relative rounded-3xl border border-[#00B7E3]/40 bg-[#0E1216] p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden text-white">
          
          {/* Spotlight en Celeste Eléctrico Passion City */}
          <Spotlight
            className="-top-20 right-0 md:right-20"
            fill="#00B7E3"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B7E3]/20 text-[#00CEFF] text-xs font-black uppercase tracking-wider mb-5 border border-[#00B7E3]/40 shadow-xs">
                <Shirt className="w-3.5 h-3.5 text-[#00B7E3]" />
                <span>VCP Design • Campaña Oficial de Indumentaria</span>
              </div>

              <h2 className="font-headline text-4xl sm:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                Llevá el mensaje con vos.
              </h2>

              <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed mb-8">
                Prendas de fe con estética contemporánea diseñadas y producidas por nuestra congregación. Confeccionadas en <strong>algodón peinado 24/1 premium</strong> con estampas de alta resistencia en serigrafía y DTF.
              </p>

              {/* Badges de calidad */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                  <span className="text-sm font-black text-white block">25+ Modelos</span>
                  <span className="text-[11px] text-stone-300">Diseños únicos</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                  <span className="text-sm font-black text-white block">Algodón 24/1</span>
                  <span className="text-[11px] text-stone-300">Tacto suave</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                  <span className="text-sm font-black text-white block">Pecho / Espalda</span>
                  <span className="text-[11px] text-stone-300">Posición a elección</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center">
                  <span className="text-sm font-black text-white block">Visualizador 3D</span>
                  <span className="text-[11px] text-stone-300">Giro interactivo</span>
                </div>
              </div>

              {/* Botón con Moving Border de Aceternity UI en Celeste #00B7E3 */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <MovingBorderButton
                  onClick={handleOpenStore}
                  borderRadius="9999px"
                  duration={2400}
                  className="px-8 py-4 bg-[#00B7E3] hover:bg-[#00CEFF] text-[#0E1216] font-black text-sm tracking-wide gap-3 shadow-xl shadow-[#00B7E3]/30 border border-[#00B7E3]/50"
                  containerClassName="h-14 w-full sm:w-auto"
                >
                  <Shirt className="w-5 h-5 text-[#0E1216]" />
                  <span>Abrir Personalizador de Remeras →</span>
                </MovingBorderButton>

                <span className="text-xs text-stone-400 font-medium">
                  Pedidos y reservas directas por WhatsApp
                </span>
              </div>
            </div>

            {/* Mockup con CardSpotlight */}
            <div className="lg:col-span-5 flex justify-center">
              <div onClick={handleOpenStore} className="w-full max-w-sm cursor-pointer">
                <CardSpotlight
                  radius={320}
                  color="rgba(0, 183, 227, 0.35)"
                  className="p-8 border border-white/20 bg-stone-900/90 shadow-2xl shadow-black/80 hover:border-[#00B7E3] transition-all duration-500 rounded-3xl"
                >
                  <div className="aspect-square bg-gradient-to-tr from-[#0E1216] to-stone-900 rounded-2xl flex items-center justify-center relative overflow-hidden mb-5 border border-white/10">
                    <div className="text-center p-6">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-[#00B7E3]/20 border border-[#00B7E3]/40 text-[#00CEFF] flex items-center justify-center shadow-2xl font-serif text-3xl font-black mb-4 group-hover/spotlight:rotate-12 transition-transform duration-500">
                        <img src="/IsoLogo2(Blanco).png" alt="VCP" className="w-12 h-12 object-contain" />
                      </div>
                      <span className="text-sm font-black tracking-widest uppercase text-white block">
                        VCP DESIGN
                      </span>
                      <span className="text-xs text-stone-400 italic block mt-1">
                        "Fe visible, estilo contemporáneo"
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#00B7E3] text-[#0E1216] font-black text-[10px] shadow-lg">
                      Ver en 3D
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-bold text-[#00CEFF] group-hover/spotlight:text-white transition-colors flex items-center justify-center gap-1.5">
                      <span>Probar Personalizador Online</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/spotlight:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </CardSpotlight>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECCIÓN CASAS IGLESIAS (COMUNIDAD EN LOS HOGARES - TONO BEIGE TAN)
         ========================================================================= */}
      <section id="casas-iglesias" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <div className="bg-[#E2E3DA] rounded-3xl border border-[#DBDAD7] text-[#0E1216] p-8 sm:p-14 lg:p-16 shadow-lg relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-[#007B9E] text-xs font-black uppercase tracking-wider mb-4 border border-[#BAE6FD] shadow-xs">
                <Home className="w-3.5 h-3.5 text-[#00B7E3]" />
                <span>Grupos Pequeños en los Hogares</span>
              </div>

              <h2 className="font-headline text-3xl sm:text-5xl font-black tracking-tight text-[#0E1216] mb-6 leading-tight">
                La iglesia no ocurre solo el domingo: se vive semana a semana en los hogares.
              </h2>

              <p className="text-[#4A4546] text-base sm:text-lg font-normal leading-relaxed mb-8">
                Las <strong>Casas Iglesias</strong> son reuniones semanales en hogares en los distintos barrios de Mar del Plata, Santa Clara y alrededores. Una mesa compartida, una charla honesta, oración mutua y amistad sincera donde nadie camina solo.
              </p>

              {/* Pilares */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white border border-[#DBDAD7] shadow-xs">
                  <Coffee className="w-5 h-5 text-[#00B7E3] mb-2" />
                  <h4 className="text-sm font-black text-[#0E1216] mb-1">Mesa Compartida</h4>
                  <p className="text-xs text-[#555250] font-normal">Cenas y meriendas para conocerse de verdad.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DBDAD7] shadow-xs">
                  <BookOpen className="w-5 h-5 text-[#00B7E3] mb-2" />
                  <h4 className="text-sm font-black text-[#0E1216] mb-1">Palabra Práctica</h4>
                  <p className="text-xs text-[#555250] font-normal">Principios bíblicos aplicados a la vida diaria.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DBDAD7] shadow-xs">
                  <Users className="w-5 h-5 text-[#00B7E3] mb-2" />
                  <h4 className="text-sm font-black text-[#0E1216] mb-1">Cerca de tu Casa</h4>
                  <p className="text-xs text-[#555250] font-normal">Ubicadas en los distintos barrios de la ciudad.</p>
                </div>
              </div>

              {/* Botón WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Me gustaría sumarme a una Casa Iglesia. ¿Cuál es el grupo más cercano a mi barrio?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0E1216] hover:bg-black text-white font-extrabold text-sm tracking-wide shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#00CEFF]" />
                <span>Quiero sumarme a una Casa Iglesia</span>
              </a>
            </div>

            {/* Fotografía Comunión Hogareña */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-[#DBDAD7] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85"
                  alt="Reunión de Casa Iglesia"
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECCIÓN PRÓXIMOS EVENTOS (AGENDA EDITORIAL 2026)
         ========================================================================= */}
      <section id="eventos" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#00B7E3] block mb-2">
            Agenda 2026
          </span>
          <h2 className="font-headline text-4xl sm:text-6xl font-black text-[#0E1216] tracking-tight mb-5">
            Próximos Eventos
          </h2>
          <p className="text-base sm:text-lg text-[#555250] font-normal leading-relaxed">
            Fechas clave diseñadas para encontrarnos, celebrar y crecer juntos. Agendá y participá.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {events.map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-[#DBDAD7] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-[#0E1216]"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-black border backdrop-blur-xl bg-[#E0F7FC] text-[#007B9E] border-[#BAE6FD] shadow-xs">
                      {evt.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00B7E3] mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>

                  <h3 className="font-headline text-xl font-black text-[#0E1216] mb-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[#676263] font-medium mb-3 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00B7E3]" />
                    <span>{evt.location}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-[#555250] font-normal leading-relaxed">
                    {evt.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(evt.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0E1216] hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#00CEFF]" />
                  <span>Más Información / Inscribirme vía WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. RADIO ONLINE (RadioOoW 24/7 - CONTRASTE EDITORIAL)
         ========================================================================= */}
      <section id="radio" className="py-24 bg-[#EFEEEB] border-y border-[#DBDAD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0E1216] rounded-3xl border border-[#00B7E3]/30 p-8 sm:p-12 shadow-2xl text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B7E3]/20 text-[#00CEFF] text-xs font-black uppercase tracking-wider mb-4 border border-[#00B7E3]/30 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#00CEFF] animate-ping" />
                  <span>Transmisión en Vivo 24/7</span>
                </div>

                <h2 className="font-headline text-3xl sm:text-4xl font-black text-white mb-4">
                  RadioOoW • La Voz de Vidas con Propósito
                </h2>

                <p className="text-stone-300 text-sm sm:text-base font-normal leading-relaxed mb-6">
                  Música de adoración que llena tu hogar de paz, mensajes de fe que edifican tu espíritu y programas especiales las 24 horas del día.
                </p>

                {/* Player Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/15 flex items-center justify-between gap-4 max-w-lg">
                  <div className="flex items-center gap-3.5">
                    <button
                      onClick={() => setIsPlayingRadio(!isPlayingRadio)}
                      className="w-12 h-12 rounded-full bg-[#00B7E3] hover:bg-[#00CEFF] text-[#0E1216] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      {isPlayingRadio ? <Pause className="w-5 h-5 fill-[#0E1216]" /> : <Play className="w-5 h-5 fill-[#0E1216] ml-0.5" />}
                    </button>
                    <div>
                      <span className="text-xs font-black text-white block">
                        {isPlayingRadio ? 'Transmitiendo RadioOoW en Vivo' : 'RadioOoW Online'}
                      </span>
                      <span className="text-[11px] text-stone-300 flex items-center gap-1 font-medium">
                        <Volume2 className="w-3 h-3 text-[#00CEFF]" />
                        <span>Audio HD • Mar del Plata</span>
                      </span>
                    </div>
                  </div>

                  {/* Ecualizador animado en Celeste Passion City */}
                  <div className="flex items-end gap-1 h-6">
                    <span className={`w-1 bg-[#00B7E3] rounded-full transition-all duration-300 ${isPlayingRadio ? 'h-6 animate-pulse' : 'h-2'}`} />
                    <span className={`w-1 bg-[#00CEFF] rounded-full transition-all duration-500 ${isPlayingRadio ? 'h-4 animate-pulse' : 'h-1.5'}`} />
                    <span className={`w-1 bg-[#00B7E3] rounded-full transition-all duration-200 ${isPlayingRadio ? 'h-5 animate-pulse' : 'h-2'}`} />
                    <span className={`w-1 bg-[#00CEFF] rounded-full transition-all duration-400 ${isPlayingRadio ? 'h-3 animate-pulse' : 'h-1'}`} />
                  </div>
                </div>
              </div>

              {/* Botones de la radio */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <a
                  href="https://vidasconproposito.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer border border-white/15"
                >
                  <span className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#00CEFF]" />
                    <span>Visitar sitio oficial vidasconproposito.com.ar</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-stone-400" />
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola RadioOoW! Quiero pedir un tema de alabanza / enviar un saludo.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-5 rounded-2xl bg-[#00B7E3] hover:bg-[#00CEFF] text-[#0E1216] text-xs sm:text-sm font-black flex items-center justify-between transition-colors cursor-pointer shadow-lg shadow-[#00B7E3]/20"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#0E1216]" />
                    <span>Enviar mensaje al aire de la Radio</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#0E1216]" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CONTACTO & FAQ
         ========================================================================= */}
      <section id="contacto" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-[#F9F8F7]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#00B7E3] block mb-2">
              Estamos para Acompañarte
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black text-[#0E1216] tracking-tight mb-5">
              Contactate con Nosotros
            </h2>
            <p className="text-[#555250] text-base font-normal leading-relaxed mb-8">
              ¿Tenés una petición de oración? ¿Es tu primera vez visitándonos y querés que alguien te reciba? Escribinos directamente al WhatsApp pastoral.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola Vidas con Propósito! Quiero comunicarme con el equipo pastoral.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white border border-[#DBDAD7] hover:border-[#00B7E3] transition-all flex items-center gap-4 cursor-pointer block shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E0F7FC] text-[#007B9E] flex items-center justify-center shrink-0 border border-[#BAE6FD]">
                  <MessageCircle className="w-6 h-6 text-[#00B7E3]" />
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#676263]">Línea Oficial WhatsApp</span>
                  <p className="text-base font-black text-[#0E1216]">{mainPhone}</p>
                  <p className="text-xs text-[#555250]">Atención pastoral y consultas generales</p>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-white border border-[#DBDAD7] flex items-center gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#E2E3DA] text-[#0E1216] flex items-center justify-center shrink-0 border border-[#DBDAD7]">
                  <MapPin className="w-6 h-6 text-[#0E1216]" />
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#676263]">Sede Principal Centro</span>
                  <p className="text-base font-black text-[#0E1216]">Gascón 2265, Mar del Plata</p>
                  <p className="text-xs text-[#555250]">A metros de las principales avenidas</p>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#676263] uppercase tracking-wider mb-3">
                Seguinos en nuestras redes oficiales:
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white hover:bg-[#F5F2EB] text-[#555250] hover:text-[#0E1216] transition-colors border border-[#DBDAD7] shadow-xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white hover:bg-[#F5F2EB] text-[#555250] hover:text-[#0E1216] transition-colors border border-[#DBDAD7] shadow-xs"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white hover:bg-[#F5F2EB] text-[#555250] hover:text-[#0E1216] transition-colors border border-[#DBDAD7] shadow-xs"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Preguntas Frecuentes */}
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#00B7E3] block mb-2">
              ¿Primera vez?
            </span>
            <h3 className="font-headline text-3xl font-black text-[#0E1216] mb-6">
              Preguntas Frecuentes
            </h3>

            <div className="space-y-3">
              {[
                {
                  q: '¿Cómo debo ir vestido?',
                  a: 'Vení como te sientas más cómodo/a. En Vidas con Propósito no hay código de vestimenta formal; nos importa tu corazón y que te sientas en familia.'
                },
                {
                  q: '¿Hay un lugar para mis hijos?',
                  a: '¡Sí! Contamos con VCP Kids durante las reuniones dominicales, con maestras capacitadas y actividades dinámicas divididas por edades para que aprendan y se diviertan con seguridad.'
                },
                {
                  q: '¿Cómo elijo a cuál de las tres sedes asistir?',
                  a: 'Podés asistir a la sede que te quede más cercana (Centro en Gascón 2265, Santa Clara del Mar en Selva Negra 522, o Zona Sur en Av. Roberto Centeno 3380). En las tres compartimos la misma visión y amor.'
                },
                {
                  q: '¿Cómo funciona la tienda de remeras VCP Design?',
                  a: 'VCP Design es nuestro proyecto oficial de indumentaria. Podés personalizar tu remera online, elegir modelo, color, talle y posición de la estampa (pecho o espalda), y confirmarla directamente vía WhatsApp.'
                }
              ].map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#DBDAD7] bg-white overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-5 text-left font-bold text-sm text-[#0E1216] flex items-center justify-between gap-2 hover:bg-[#F5F2EB]/50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-[#676263] shrink-0 transition-transform duration-200 ${
                        activeFaq === i ? 'rotate-90 text-[#00B7E3]' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === i && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#555250] font-normal border-t border-[#DBDAD7]/50 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. FOOTER INSTITUCIONAL (ESTILO PASSION CITY CHURCH)
         ========================================================================= */}
      <footer className="mt-auto bg-[#0E1216] text-[#A39E9B] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            
            {/* Columna Marca con Logo Oficial */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="bg-white rounded-2xl px-3 py-2 border border-white/20 flex items-center justify-center shadow-md">
                  <img
                    src="/vcplogo.png"
                    alt="Logo VCP"
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#00B7E3] tracking-wider uppercase block">
                    Una iglesia • Tres sedes
                  </span>
                  <span className="text-[11px] text-stone-300 font-medium">
                    Mar del Plata & Santa Clara
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-300 font-normal leading-relaxed mb-6 max-w-sm">
                Comunidad de fe, adoración y familia en Mar del Plata y la costa. Existimos para que cada persona conozca a Jesús y viva el propósito eterno para el cual fue creada.
              </p>
              <p className="text-xs text-stone-300">
                Línea Directa: <strong className="text-white">{mainPhone}</strong>
              </p>
            </div>

            {/* Columna Sedes */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">
                Nuestras 3 Sedes
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-300">
                <li>
                  <strong className="text-white block">Sede Centro:</strong>
                  Gascón 2265, Mar del Plata
                </li>
                <li>
                  <strong className="text-white block">Sede Santa Clara:</strong>
                  Selva Negra 522, Santa Clara del Mar
                </li>
                <li>
                  <strong className="text-white block">Sede Zona Sur:</strong>
                  Av. Roberto Centeno 3380, Mar del Plata
                </li>
              </ul>
            </div>

            {/* Columna Enlaces */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">
                Navegación
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => scrollToSection('inicio')} className="hover:text-[#00CEFF] transition-colors cursor-pointer">
                    Inicio
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('sedes')} className="hover:text-[#00CEFF] transition-colors cursor-pointer">
                    Sedes & Horarios
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('ministerios')} className="hover:text-[#00CEFF] transition-colors cursor-pointer">
                    Ministerios
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('casas-iglesias')} className="hover:text-[#00CEFF] transition-colors cursor-pointer">
                    Casas Iglesias
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('eventos')} className="hover:text-[#00CEFF] transition-colors cursor-pointer">
                    Eventos
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('radio')} className="hover:text-[#00CEFF] transition-colors cursor-pointer">
                    Radio Online
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna Tienda VCP Design */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#00B7E3]">
                Tienda Oficial
              </h4>
              <p className="text-xs text-stone-300 font-normal leading-relaxed">
                Remeras cristianas contemporáneas con personalizador interactivo en 3D.
              </p>
              <button
                onClick={handleOpenStore}
                className="w-full py-3.5 px-4 rounded-xl bg-[#00B7E3] hover:bg-[#00CEFF] text-[#0E1216] font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00B7E3]/20 cursor-pointer"
              >
                <Shirt className="w-4 h-4 text-[#0E1216]" />
                <span>Ingresar a Tienda VCP Design</span>
              </button>
            </div>

          </div>

          {/* Línea final */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
            <p>© {new Date().getFullYear()} Iglesia Cristiana Vidas con Propósito • Mar del Plata, Argentina.</p>
            <div className="flex items-center gap-4">
              <span>vidasconproposito.com.ar</span>
              <span>•</span>
              <span>VCP Design Boutique</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
