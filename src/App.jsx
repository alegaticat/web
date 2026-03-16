import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Megaphone, 
  Code, 
  Mail, 
  ChevronRight, 
  Linkedin, 
  Github, 
  Instagram,
  Menu, 
  X,
  ExternalLink,
  ArrowRight,
  MessageCircle,
  Send
} from 'lucide-react';

/**
 * Icono de Behance (SVG Personalizado)
 */
const BehanceIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12h2.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H9v3z" />
    <path d="M9 16h3c.83 0 1.5-.67 1.5-1.5S12.83 13 12 13H9v3z" />
    <path d="M8 8H4v10h4.5c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5H8z" />
    <path d="M16 11h7" />
    <path d="M16 14c0 2.21 1.79 4 4 4s4-1.79 4-4v-1h-8v1z" />
    <path d="M16 13h8c0-2.21-1.79-4-4-4s-4 1.79-4 4z" />
  </svg>
);

/**
 * MemojiAvatar v2.5 - Video MP4 interactivo
 */
const MemojiAvatar = ({ videoSrc = "https://i.imgur.com/qx3xUVJ.mp4" }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {}); 
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="relative w-72 h-72 md:w-[460px] md:h-[460px] mx-auto group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-lila-pro rounded-full blur-[140px] opacity-15 transition-opacity duration-700 group-hover:opacity-30"></div>
      
      <motion.div 
        className="relative w-full h-full bg-white rounded-[5rem] lg:rounded-[6rem] shadow-[0_45px_90px_-20px_rgba(180,126,237,0.15)] flex items-center justify-center border border-lila-pro/10 overflow-hidden"
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="h-full w-full object-contain pointer-events-none"
          muted
          playsInline
          loop={false}
          preload="auto"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', email: '' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 25, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const cloudColor = useTransform(
    smoothX,
    [0, windowWidth / 2, windowWidth],
    ['#8aeaf9', '#8aeaf9', '#b47eed']
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 128);
      mouseY.set(e.clientY - 128);
    };
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject || isContactModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject, isContactModalOpen]);

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const phone = "+56995140625";
    const baseMessage = "Hola, quisiera cotizar un servicio.";
    const leadInfo = ` Mi nombre es ${contactForm.name} y mi correo es ${contactForm.email}.`;
    const finalUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(baseMessage + leadInfo)}`;
    
    window.open(finalUrl, '_blank');
    setIsContactModalOpen(false);
    setContactForm({ name: '', email: '' }); 
  };

  const services = [
    {
      title: "Diseño Web UI/UX",
      description: "Interfaces que conectan. Diseño sitios que no solo se ven increíbles, sino que están estratégicamente construidos para convertir.",
      icon: <Monitor className="w-6 h-6" />,
      tag: "FRONT-END"
    },
    {
      title: "Publicidad Digital",
      description: "Estrategias de marca con enfoque publicitario. Entiendo la psicología del consumidor para captar la atención en segundos.",
      icon: <Megaphone className="w-6 h-6" />,
      tag: "CREATIVIDAD"
    },
    {
      title: "Desarrollo con React",
      description: "Arquitecturas sólidas y escalables. Utilizo las últimas tecnologías para garantizar velocidad, SEO y estabilidad técnica.",
      icon: <Code className="w-6 h-6" />,
      tag: "TECNOLOGÍA"
    }
  ];

  const projects = [
    {
      title: "Literal b)",
      category: "Branding",
      description: "Concepto de marca minimalista para editorial independiente, donde la tipografía y el espacio negativo son los ejes centrales de la comunicación visual.",
      image: "/web/projects/literal-b-banner.jpg",
      fullDesc: "Literal b) nació de la necesidad de crear una identidad que respire silencio y pausa. En un mundo saturado de información, esta editorial independiente buscaba destacar mediante el minimalismo geométrico y un uso audaz de la tipografía serif."
    },
    {
      title: "Corredor biobio",
      category: "Branding",
      description: "Identidad visual estratégica para el desarrollo regional, capturando la esencia del paisaje y la conectividad del Biobío con un lenguaje moderno.",
      image: "/web/projects/corredorbiobio-banner.jpg",
      fullDesc: "El proyecto Corredor Biobío integra los valores de conectividad y geografía de la octava región. La propuesta gráfica utiliza líneas fluidas que representan tanto el flujo del río Biobío como las redes logísticas de la zona."
    },
    {
      title: "Red de Humedales del Biobío",
      category: "Branding",
      description: "Desarrollo de marca para la conservación ecosistémica, enfocada en la biodiversidad local y la conciencia ambiental del territorio.",
      image: "/web/projects/rhbb-banner.jpg",
      fullDesc: "Para la Red de Humedales, el desafío fue crear una identidad institucional que no perdiera la calidez de lo orgánico. Se desarrolló una iconografía propia basada en especies nativas de la zona."
    },
    {
      title: "Vintaste",
      category: "UX/UI Design",
      description: "Interfaz de usuario para plataforma de cata de vinos, optimizando el flujo de descubrimiento y maridaje mediante una arquitectura intuitiva.",
      image: "/web/projects/vintaste-banner.jpg",
      fullDesc: "Vintaste es una experiencia digital diseñada para simplificar el complejo mundo del vino. A través de un sistema de recomendación basado en perfiles de sabor, la app guía al usuario mediante una interfaz rica."
    },
    {
      title: "AMA Cosmética",
      category: "Social Media Design",
      description: "Estrategia de contenido visual para marca de cosmética natural, enfocada en resaltar la pureza orgánica mediante una estética limpia y minimalista.",
      image: "/web/projects/ama-banner.jpg",
      fullDesc: "AMA Cosmética requería una transición hacia un diseño más editorial en sus redes sociales. Implementamos un sistema de 'grids' flexibles y una dirección de arte fotográfica que resalta los ingredientes activos."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-azul-profundo overflow-x-hidden selection:bg-cyan-brand/30">
      
      {/* Nube de Navegación del Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-[256px] h-[256px] rounded-full pointer-events-none z-[9999] blur-[110px]"
        style={{ x: smoothX, y: smoothY, backgroundColor: cloudColor, opacity: 0.6 }}
      />

      {/* Retícula Técnica al 100% de la pantalla (6 líneas) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="w-full h-full flex justify-evenly opacity-25">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-px h-full border-l border-guia"></div>
          ))}
        </div>
      </div>

      {/* Navegación - Clase Actualizada */}
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="w-full px-8 lg:px-20 flex justify-between items-center overflow-visible">
          <div className="text-2xl font-bold tracking-tighter flex items-center space-x-1 group cursor-pointer lowercase">
            <span className="transition-transform group-hover:scale-105 italic">alegaticat</span>
            <span className="text-azul-electrico group-hover:translate-x-0.5 transition-transform">.io</span>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-[12px] font-normal uppercase tracking-[0.25em] text-azul-profundo/70">
            <a href="#servicios" className="hover:text-azul-electrico transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-azul-electrico hover:after:w-full after:transition-all">Servicios</a>
            <a href="#portafolio" className="hover:text-azul-electrico transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-azul-electrico hover:after:w-full after:transition-all">Portafolio</a>
            <a href="#contacto" className="bg-azul-profundo text-white px-8 py-3.5 rounded-full font-bold hover:bg-azul-electrico transition-all shadow-lg shadow-azul-electrico/10 active:scale-95">
              Contáctame
            </a>
          </div>

          <button className="md:hidden text-azul-profundo" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section - lg:text-[5rem] */}
        <header className="relative pt-44 pb-20 lg:pt-44 lg:pb-44 overflow-hidden">
          <div className="max-w-[1160px] mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-3/5 text-center lg:text-left"
              >
                <div className="inline-block px-6 py-2 mb-10 rounded-full bg-cyan-brand/10 border border-cyan-brand/25 text-azul-electrico text-[10px] font-normal uppercase tracking-[0.45em]">
                  Diseño Web & Estrategia Publicitaria
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold leading-none mb-12 tracking-tight text-azul-profundo">
                  Diseño que <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-azul-electrico to-cyan-brand italic">impacta</span>, código que <span className="underline decoration-lila-pro/40 underline-offset-8">funciona.</span>
                </h1>
                <p className="text-xl text-azul-profundo/60 pb-10 mb-20 max-w-xl leading-relaxed font-normal text-balance border-b border-slate-50">
                  Ayudo a marcas creativas a dominar el entorno digital mediante soluciones híbridas donde la estética publicitaria encuentra la robustez del código React.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start font-bold">
                  <button className="px-10 py-5 bg-azul-profundo text-white rounded-2xl hover:bg-azul-electrico transition-all shadow-2xl shadow-azul-profundo/15 active:scale-95">
                    Explorar Proyectos
                  </button>
                  <button className="px-10 py-5 border-2 border-azul-profundo/10 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 text-azul-profundo font-bold">
                    Mi Metodología
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="lg:w-2/5"
              >
                <MemojiAvatar videoSrc="https://i.imgur.com/qx3xUVJ.mp4" />
              </motion.div>
            </div>
          </div>
        </header>

        {/* Sección de Servicios - py-24 y s.tag Actualizado */}
        <section id="servicios" className="py-24 bg-slate-50/50 relative z-10 border-y border-slate-100">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-14">
              {services.map((s, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -16 }}
                  className="p-14 rounded-[4rem] bg-white border border-lila-pro/10 shadow-[0_35px_70px_-15px_rgba(180,126,237,0.15)] group transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-azul-electrico text-white flex items-center justify-center mb-10 group-hover:bg-lila-pro group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-azul-electrico/20">
                    {s.icon}
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.45em] text-azul-electrico uppercase mb-4 block">{s.tag}</span>
                  <h3 className="text-2xl font-bold mb-6 text-azul-profundo">{s.title}</h3>
                  <p className="text-azul-profundo/60 leading-relaxed font-normal text-md">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Portafolio - py-24 y lg:text-[4rem] */}
        <section id="portafolio" className="py-24 relative z-10">
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="text-center mb-28">
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-azul-electrico mb-5 block">Selected Works</span>
              <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-azul-profundo tracking-tighter leading-none">
                Portafolio <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-azul-electrico to-cyan-brand italic">Estratégico.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_-12px_rgba(8,13,46,0.06)] flex flex-col h-full cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-azul-profundo/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8"
                    >
                      <div className="text-center">
                        <div className="w-14 h-14 bg-white/10 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-xl">
                          <ArrowRight className="text-white w-6 h-6" />
                        </div>
                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Explorar Caso</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-10 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-azul-electrico px-3 py-1 bg-azul-electrico/5 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-azul-profundo mb-5 group-hover:text-azul-electrico transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-azul-profundo/60 text-sm leading-relaxed font-normal text-balance">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Banner CTA WhatsApp - lg:text-[4rem] */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-32 w-full bg-azul-profundo rounded-[4rem] p-12 lg:p-20 relative overflow-hidden group shadow-2xl shadow-azul-profundo/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-azul-electrico/20 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left flex-grow">
                  <h3 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white mb-6 tracking-tighter leading-none">
                    ¿Hablemos por <span className="text-cyan-brand italic">WhatsApp?</span>
                  </h3>
                  <p className="text-white/60 text-lg max-w-xl">
                    Inicia una conversación directa para resolver dudas rápidas sobre tu próximo proyecto digital.
                  </p>
                </div>
                
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex-shrink-0 flex items-center gap-4 px-10 py-6 bg-white text-azul-profundo rounded-2xl font-bold hover:bg-cyan-brand hover:scale-105 transition-all shadow-xl group/btn"
                >
                  <MessageCircle size={24} className="group-hover/btn:rotate-12 transition-transform" />
                  Contactame al WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Ventana de Detalle de Proyecto */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="fixed top-8 right-8 z-[110] p-4 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-slate-100 hover:bg-azul-electrico hover:text-white transition-all group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="w-full aspect-[3/1] relative overflow-hidden bg-slate-100">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-azul-profundo/40 to-transparent"></div>
              
              <div className="absolute bottom-12 left-12 lg:left-24 text-white">
                <span className="text-[11px] font-bold uppercase tracking-[0.5em] mb-4 block px-4 py-2 bg-azul-electrico w-fit rounded-lg">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter">
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            <div className="max-w-[1160px] mx-auto px-6 py-24">
              <div className="grid lg:grid-cols-3 gap-20">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-azul-profundo mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">
                    Sobre el Proyecto
                  </h3>
                  <p className="text-xl text-azul-profundo/70 leading-relaxed font-normal mb-12">
                    {selectedProject.fullDesc}
                  </p>
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-12 p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-azul-electrico mb-8">Ficha Técnica</h4>
                    <ul className="space-y-6">
                      <li className="flex flex-col border-b border-slate-200 pb-4">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Año</span>
                        <span className="font-bold">2026</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Rol</span>
                        <span className="font-bold">Dirección Creativa</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Filtro para WhatsApp */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-azul-profundo/60 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 lg:p-14 shadow-2xl border border-slate-100 overflow-hidden"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-azul-electrico/10 text-azul-electrico rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail size={32} />
                </div>
                <h3 className="text-3xl font-bold text-azul-profundo mb-3">Antes de conectar</h3>
                <p className="text-azul-profundo/50 leading-relaxed">
                  Ingresa tus datos para brindarte una atención personalizada vía WhatsApp.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-2">Tu Nombre</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Juan Pérez"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-azul-electrico/20 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-2">Tu Correo Electrónico</label>
                  <input 
                    required
                    type="email" 
                    placeholder="hola@tuempresa.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-azul-electrico/20 focus:bg-white transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-azul-electrico text-white rounded-2xl font-bold shadow-xl shadow-azul-electrico/20 hover:bg-azul-profundo transition-all flex items-center justify-center gap-3"
                >
                  Continuar al WhatsApp <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contacto" className="w-full bg-azul-profundo text-white pt-32 pb-20 rounded-t-[7rem] relative z-10 px-8 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="w-full h-full flex justify-evenly">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-px h-full border-l border-white/20"></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div className="text-center mb-40">
            <h2 className="text-5xl lg:text-[2rem] font-bold mb-14 tracking-tighter leading-none text-white">
              ¿Listo para elevar tu <br/>
              <span className="text-cyan-brand italic">presencia digital?</span>
            </h2>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:alegaticat@gmail.com" 
              className="text-2xl lg:text-5xl font-bold hover:text-cyan-brand transition-all underline decoration-azul-electrico decoration-8 underline-offset-[16px]"
            >
              alegaticat@gmail.com
            </motion.a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-24 gap-12">
            <div className="text-3xl font-bold tracking-tighter lowercase">
              alegaticat<span className="text-azul-electrico">.io</span>
            </div>

            <div className="flex space-x-6">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Github, label: "GitHub" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: BehanceIcon, label: "Behance" }
              ].map((Social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  aria-label={Social.label}
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 text-white/70 hover:bg-azul-electrico hover:text-white transition-all hover:-translate-y-2 border border-white/5"
                >
                  <Social.Icon size={24} />
                </a>
              ))}
            </div>

            <div className="text-white/20 text-[11px] uppercase tracking-[0.6em] font-normal">
              © 2026 — BRANDING & CODE
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;