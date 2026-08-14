import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Phone,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Sparkles,
  Droplets,
  Clock,
  Menu,
  X,
  ArrowRight,
  Mail,
  MapPin,
  Flame,
  Waves,
  AlertTriangle,
  Grid,
  Sliders,
  ShoppingCart,
  Star,
  Package,
  Beaker,
} from 'lucide-react';

// ── ZOD VALIDATION SCHEMA FOR SERVICE QUOTE FORM ──
const quoteSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(9, { message: 'Please enter a valid phone number.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  preferredDate: z.string().min(1, { message: 'Please select a preferred appointment date.' }),
  preferredTime: z.string().min(1, { message: 'Please select a preferred time slot.' }),
  location: z.string().min(2, { message: 'Please enter your location or city.' }),
  details: z.string().optional(),
});

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);
  const [galleryViewMode, setGalleryViewMode] = useState('grid'); // 'grid' | 'slider'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState(null);
  const formRef = useRef(null);

  // React Hook Form + Zod Resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      location: '',
      details: '',
    },
  });

  const onFormSubmit = async (data) => {
    setFormSending(true);
    setFormError(null);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setSubmittedData(data);
      setFormSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setFormError('Failed to send your request. Please try again or call us directly.');
    } finally {
      setFormSending(false);
    }
  };

  const transformations = [
    {
      id: 1,
      title: 'Tiled Pool — Full Algae Recovery',
      category: 'Chemical Shock & Deep Clean',
      beforeImg: '/images/client_before_1.png',
      beforeTag: 'BEFORE — SEVERE GREEN ALGAE',
      beforeDesc: 'Heavy dark algae coating the entire pool floor and walls. Floating debris, clogged skimmers, and completely imbalanced water chemistry.',
      afterImg: '/images/client_after_1.png',
      afterTag: 'AFTER — CRYSTAL CLEAR + WATER FEATURES',
      afterDesc: 'Full chemical shock treatment, vacuum clean, sand filter service, and installation of 3 premium stainless wall-mounted water jets with ambient lighting.',
      specs: ['Restoration Time: 3 Days', 'Water Clarity: 100% Crystal Clear', 'Water Jets: 3 Installed'],
    },
    {
      id: 2,
      title: 'Freeform Pool — Green Water Overhaul',
      category: 'Algae Removal & Water Balance',
      beforeImg: '/images/client_before_2.jpg',
      beforeTag: 'BEFORE — BLACK & GREEN ALGAE',
      beforeDesc: 'Freeform pool with black algae on walls and floor, debris accumulation, and non-functional filtration system causing dark swamp-like water.',
      afterImg: '/images/client_after_2.png',
      afterTag: 'AFTER — SPARKLING BLUE RESTORATION',
      afterDesc: 'Multi-stage algae treatment, brushing and vacuuming, filter media replacement, and complete chemical rebalancing to achieve pristine swimming conditions.',
      specs: ['Pool Shape: Freeform', 'Treatment: Multi-Stage', 'Result: Swim-Ready'],
    },
    {
      id: 3,
      title: 'Residential Pool — Emergency Green Recovery',
      category: 'Rapid Chemical Recovery',
      beforeImg: '/images/client_before_3.jpg',
      beforeTag: 'BEFORE — FULL GREEN TAKEOVER',
      beforeDesc: 'Entire pool turned vivid green from severe algae bloom. Visible algae on steps, side walls, and floor with impaired pump circulation.',
      afterImg: '/images/client_after_3.png',
      afterTag: 'AFTER — PERFECTLY BALANCED POOL',
      afterDesc: 'Emergency chlorine shock, algaecide dosing, deep brushing and vacuuming, plus full pump inspection and water chemistry rebalancing.',
      specs: ['Recovery Time: 48 Hours', 'Water Colour: Crystal Blue', 'Steps: Fully Visible'],
    },
  ];


  const slides = [
    {
      id: 1,
      type: 'video',
      videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70860-536968037_tiny.mp4',
      poster: '/images/hero_pool.png',
      badge: 'PREMIUM POOL CONSTRUCTION & CARE',
      title: 'Expert Swimming Pool & Jacuzzi Builders',
      subtitle: 'Designing, building, and maintaining world-class luxury pools, jacuzzis, saunas, and steam baths.',
      ctaPrimary: 'Request Construction Quote',
      ctaSecondary: 'View Our Services',
    },
    {
      id: 2,
      type: 'image',
      imageUrl: '/images/sauna_construction.png',
      badge: 'SAUNA & STEAM BATH SPECIALISTS',
      title: 'Custom Sauna & Steam Room Construction',
      subtitle: 'Custom cedar wood sauna cabins and therapeutic steam rooms crafted for luxury homes, hotels, and wellness centres.',
      ctaPrimary: 'Book Sauna Consultation',
      ctaSecondary: 'Explore Wellness Systems',
    },
    {
      id: 3,
      type: 'image',
      imageUrl: '/images/pool_fountain.png',
      badge: 'JACUZZI & FOUNTAIN SYSTEMS',
      title: 'Luxury Jacuzzi & Water Feature Engineering',
      subtitle: 'Hydrotherapy whirlpool jacuzzis and illuminated waterfall fountains designed for ultimate relaxation.',
      ctaPrimary: 'Build Your Jacuzzi',
      ctaSecondary: 'View Water Features',
    },
    {
      id: 4,
      type: 'image',
      imageUrl: '/images/pool_technician.png',
      badge: 'COMPLETE MAINTENANCE & REPAIR',
      title: 'Professional Pump & Filtration Servicing',
      subtitle: 'Certified technician teams solving pool problems, pump repair, chemical dosing, and filter overhauls.',
      ctaPrimary: 'Schedule Maintenance',
      ctaSecondary: 'General Pool Solutions',
    },
  ];

  const services = [
    { icon: Droplets, title: 'Swimming Pool Construction', color: 'bg-blue-600', lightColor: 'bg-blue-50 text-blue-600', desc: 'Turnkey swimming pool design and construction for residential homes, lodges, and commercial resorts. Engineered for longevity and structural perfection.', features: ['Reinforced concrete & tile finishes', 'Custom skimmer & overflow designs', 'Integrated LED underwater lighting'] },
    { icon: Wrench, title: 'Maintenance and Servicing', color: 'bg-teal-600', lightColor: 'bg-teal-50 text-teal-600', desc: 'Comprehensive regular maintenance plans for pools across all regions. Keep water balanced and equipment running silently.', features: ['Weekly 10-point chemical balancing', 'Sand filter backwashing & media change', 'Pump impeller & seal servicing'] },
    { icon: Waves, title: 'Fountain Construction', color: 'bg-sky-500', lightColor: 'bg-sky-50 text-sky-600', desc: 'Bespoke decorative and functional fountain systems for residential gardens, hotel courtyards, and commercial landscapes. LED-lit, pump-driven water features built to impress.', features: ['Custom tiered & wall fountain designs', 'Submersible pump & nozzle systems', 'Colour-changing LED underwater lighting'] },
    { icon: Flame, title: 'Sauna Construction Services', color: 'bg-orange-500', lightColor: 'bg-orange-50 text-orange-600', desc: 'Authentic Finnish timber sauna room construction using premium kiln-dried cedar and pine wood, heavy-duty sauna heaters, and volcanic sauna stones.', features: ['Imported kiln-dried cedar wood', 'Heavy-duty digital sauna heaters', 'Custom glass doors & bench lighting'] },
    { icon: ShieldCheck, title: 'Steam Bath Construction', color: 'bg-indigo-500', lightColor: 'bg-indigo-50 text-indigo-600', desc: 'Luxury steam room installations featuring sealed vapour barriers, steam generators, aromatherapy injection, and non-slip mosaic tile seating.', features: ['Automated steam generator units', 'Aromatherapy oil injection systems', 'Waterproof moisture-seal tiling'] },
    { icon: Sparkles, title: 'Jacuzzi Construction Services', color: 'bg-cyan-500', lightColor: 'bg-cyan-50 text-cyan-600', desc: 'Custom hydrotherapy jacuzzis with high-pressure massage jets, water heating, and ergonomically contoured seating built for your outdoor deck or indoor spa.', features: ['High-pressure hydrotherapy jets', 'Energy-efficient electric & solar heaters', 'Built-in digital control panels'] },
    { icon: AlertTriangle, title: 'General Pool Problems', color: 'bg-rose-500', lightColor: 'bg-rose-50 text-rose-600', desc: 'Fast diagnosis and resolution for green algae blooms, cloudy water, underground pipe leaks, noisy pump motors, and cracked pool tiles.', features: ['Green pool algae shock recovery', 'Pressure leak detection & pipe sealing', 'Tile restoration & regrouting'] },
  ];


  useEffect(() => {
    let iv;
    if (isPlaying) iv = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(iv);
  }, [isPlaying, slides.length]);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">

      {/* ── TOP UTILITY BAR ── */}
      <div className="bg-blue-700 text-white text-xs py-2 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 opacity-80" /> Mon–Sat: 8:00 AM – 6:00 PM</span>
          <span className="hidden sm:flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 opacity-80" /> Serving Residential & Commercial Clients</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+254143618364" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors font-semibold">
            <Phone className="w-3.5 h-3.5" /> +254 143 618 364
          </a>
          <a href="https://wa.me/254143618364" target="_blank" rel="noreferrer"
            className="bg-white/20 hover:bg-white/30 border border-white/30 px-3 py-1 rounded-full flex items-center gap-1.5 transition-all text-xs font-semibold">
            <MessageSquare className="w-3 h-3" /> WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── STICKY NAVBAR ── */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg border-b border-slate-100 py-3' : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

          {/* Logo with robust fallbacks */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl border border-blue-100 overflow-hidden shadow-sm bg-slate-50 flex items-center justify-center p-0.5">
              <img 
                src="/images/logo_vector.png" 
                alt="DIF Pools Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/logo.png';
                }}
              />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-blue-700 leading-none font-outfit">DIF POOLS</div>
              <div className="text-[10px] tracking-widest text-slate-500 uppercase font-medium mt-0.5">Care &amp; Services</div>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#hero" className="text-blue-600 font-semibold">Home</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#products" className="hover:text-blue-600 transition-colors">Products</a>
            <a href="#gallery" className="hover:text-blue-600 transition-colors">Restoration</a>
            <a href="#problems" className="hover:text-blue-600 transition-colors">Pool Problems</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a href="#contact"
              className="hidden lg:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-full shadow-md shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 text-sm">
              Get Free Quote <ChevronRight className="w-4 h-4" />
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-600">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-5 space-y-3 shadow-lg">
            {['#hero:Home', '#services:Services', '#products:Products', '#gallery:Restoration', '#problems:Pool Problems', '#contact:Contact'].map(item => {
              const [href, label] = item.split(':');
              return (
                <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-700 hover:text-blue-600 font-medium py-1 border-b border-slate-50">
                  {label}
                </a>
              );
            })}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-xl shadow">
              Request Service Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>

      {/* ── HERO SLIDER ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        {slides.map((slide, index) => (
          <div key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            {slide.type === 'video' ? (
              <>
                <video autoPlay loop muted playsInline poster={slide.poster}
                  className="w-full h-full object-cover scale-105">
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
                <img src={slide.poster} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />
              </>
            ) : (
              <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover scale-105" />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/50 to-blue-950/30" />
          </div>
        ))}

        {/* Hero content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Brand line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-white/40"></div>
            <span className="text-xs font-bold tracking-[0.35em] text-blue-200 uppercase">DIF Pools Care Services</span>
            <div className="h-px w-12 bg-white/40"></div>
          </div>

          {/* Slide badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-wider">
              {slides[currentSlide].badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-outfit leading-tight drop-shadow-lg mb-5">
            {slides[currentSlide].title}
          </h1>

          <p className="text-base sm:text-xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-blue-700 font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 text-base group">
              <span>{slides[currentSlide].ctaPrimary}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 text-base">
              <Waves className="w-5 h-5 text-blue-300" />
              <span>{slides[currentSlide].ctaSecondary}</span>
            </a>
          </div>

          {/* Slide controls */}
          <div className="mt-12 flex items-center justify-center gap-5">
            <button onClick={() => setCurrentSlide(p => (p - 1 + slides.length) % slides.length)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-white shadow-lg' : 'w-2 bg-white/40 hover:bg-white/60'}`} />
              ))}
            </div>
            <button onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all backdrop-blur-sm">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button onClick={() => setCurrentSlide(p => (p + 1) % slides.length)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all backdrop-blur-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[['5+', 'Years of DIF Excellence'], ['300+', 'Projects Completed'], ['99.8%', 'Client Satisfaction'], ['24/7', 'Emergency Support']].map(([val, label]) => (
              <div key={label}>
                <div className="text-3xl sm:text-4xl font-black font-outfit">{val}</div>
                <div className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">What We Do</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-outfit">Our Services</h2>
            <div className="mt-4 h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 mt-4 text-base">From initial excavation to custom saunas and ongoing pool repairs — we cover everything.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((srv, i) => {
              const Icon = srv.icon;
              return (
                <div key={i} className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl ${srv.lightColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{srv.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {srv.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Request Quote <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section id="products" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">Pool Care Supplies</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-outfit">Our Products</h2>
            <div className="mt-4 h-1 w-16 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 mt-4 text-base leading-relaxed">
              Professional-grade pool chemicals trusted by DIF technicians and pool owners across Kenya.
              Keep your water crystal-clear and perfectly balanced year-round.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

            {/* ── CHLORINE 65 ── */}
            <div className="group relative bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-3xl border border-slate-200 hover:border-blue-300 shadow-md hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 overflow-hidden flex flex-col">
              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                  <Package className="w-3 h-3" /> Pool Chemical
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                  In Stock
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-72 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/10" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/80 to-transparent" />
                <img
                  src="/products/chlorine65.png"
                  alt="Chlorine 65% Granular Pool Sanitiser"
                  className="relative z-10 h-52 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Granular Chlorine</p>
                    <h3 className="text-2xl font-extrabold text-slate-900 font-outfit leading-tight">Chlorine 65%</h3>
                    <p className="text-sm text-slate-500 mt-0.5 font-medium">High-Strength Pool Sanitiser</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-amber-700">4.9</span>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mt-3 mb-5">
                  A trusted granular calcium hypochlorite sanitiser delivering <strong className="text-slate-700">65% available chlorine</strong>. Ideal for regular shock treatments, algae prevention, and maintaining pristine water clarity in both residential and commercial pools.
                </p>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    ['Active Chlorine', '65%'],
                    ['Form', 'Granular'],
                    ['Application', 'Shock & Routine'],
                    ['Pool Type', 'All Pool Types'],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 shadow-sm">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{label}</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {[
                    'Fast-dissolving granules for rapid sanitisation',
                    'Controls algae, bacteria & harmful pathogens',
                    'Suitable for shock dosing and weekly treatment',
                    'Professionally used by DIF technicians on-site',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/254143618364?text=Hi%20DIF%20Pools%2C%20I%20am%20interested%20in%20the%20Chlorine%2065%25%20product.%20Please%20send%20me%20more%20details%20and%20pricing."
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" /> Enquire on WhatsApp
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-all duration-300 text-sm border border-slate-200"
                  >
                    Get Quote <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* ── CHLORINE 90 ── */}
            <div className="group relative bg-gradient-to-br from-slate-50 to-cyan-50/40 rounded-3xl border border-slate-200 hover:border-cyan-400 shadow-md hover:shadow-2xl hover:shadow-cyan-100 transition-all duration-500 overflow-hidden flex flex-col">
              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="inline-flex items-center gap-1.5 bg-cyan-600 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                  <Beaker className="w-3 h-3" /> Premium Grade
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
                  In Stock
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-72 bg-gradient-to-br from-cyan-50 to-teal-50 overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/10" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/80 to-transparent" />
                <img
                  src="/products/chlorine90.png"
                  alt="Chlorine 90% Trichloro Pool Sanitiser"
                  className="relative z-10 h-52 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-1">Trichloro Tablets / Granules</p>
                    <h3 className="text-2xl font-extrabold text-slate-900 font-outfit leading-tight">Chlorine 90%</h3>
                    <p className="text-sm text-slate-500 mt-0.5 font-medium">Ultra-Strength Pool Sanitiser</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-amber-700">5.0</span>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mt-3 mb-5">
                  Our highest-concentration sanitiser with <strong className="text-slate-700">90% available chlorine</strong>, formulated for aggressive shock treatments, heavily loaded commercial pools, and rapid algae eradication. A small dose goes a very long way.
                </p>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    ['Active Chlorine', '90%'],
                    ['Form', 'Granular/Tablet'],
                    ['Application', 'Heavy Shock'],
                    ['Pool Type', 'Commercial & Residential'],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 shadow-sm">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{label}</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {[
                    'Ultra-high concentration for maximum sanitising power',
                    'Ideal for severe green pool shock & commercial use',
                    'Slow-dissolving tablet form for sustained release',
                    'Preferred by DIF experts for emergency algae recovery',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/254143618364?text=Hi%20DIF%20Pools%2C%20I%20am%20interested%20in%20the%20Chlorine%2090%25%20product.%20Please%20send%20me%20more%20details%20and%20pricing."
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-200 transition-all duration-300 hover:-translate-y-0.5 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" /> Enquire on WhatsApp
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-all duration-300 text-sm border border-slate-200"
                  >
                    Get Quote <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 sm:p-10 text-center text-white shadow-2xl shadow-blue-200">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-200 mb-2">DIF Chemical Supply</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit mb-3">Need Pool Chemicals Delivered?</h3>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-7 leading-relaxed">
              We supply chlorine, algaecides, pH adjusters, and water testing kits directly to your pool. Ask our team about chemical subscription packages.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/254143618364?text=Hi%20DIF%20Pools%2C%20I%20would%20like%20to%20order%20pool%20chemicals.%20Please%20send%20me%20your%20product%20list%20and%20pricing."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-full shadow-xl hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                <MessageSquare className="w-4 h-4" /> Order via WhatsApp
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 text-sm"
              >
                Request Chemical Quote <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── BEFORE & AFTER RESTORATION (ROWS & COLUMNS COMPARISON SHOWCASE) ── */}
      <section id="gallery" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">Restoration Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-outfit">Before &amp; After Transformations</h2>
            <div className="mt-4 h-1 w-16 bg-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-slate-500 text-sm sm:text-base">
              Explore side-by-side rows and columns of real project transformations restored by DIF Pools Care Services.
            </p>

            {/* View Mode Switcher Buttons */}
            <div className="mt-6 inline-flex p-1 bg-slate-100 rounded-full border border-slate-200">
              <button
                onClick={() => setGalleryViewMode('grid')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  galleryViewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Side-by-Side Cards (Rows &amp; Columns)
              </button>
              <button
                onClick={() => setGalleryViewMode('slider')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  galleryViewMode === 'slider'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> Interactive Slider View
              </button>
            </div>
          </div>

          {/* GRID VIEW (ROWS & COLUMNS) */}
          {galleryViewMode === 'grid' && (
            <div className="space-y-12">
              {transformations.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {item.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit mt-2">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.specs.map((spec, sIdx) => (
                        <span key={sIdx} className="text-xs bg-white text-slate-600 px-3 py-1 rounded-lg border border-slate-200 font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column Side-by-Side Layout */}
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Column 1: BEFORE */}
                    <div className="group bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm flex flex-col">
                      <div className="relative overflow-hidden h-64 sm:h-72">
                        <img 
                          src={item.beforeImg} 
                          alt={item.beforeTag} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95" 
                        />
                        <div className="absolute top-4 left-4 bg-rose-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg">
                          BEFORE
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-rose-700 uppercase tracking-wide mb-1">
                            {item.beforeTag}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {item.beforeDesc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-rose-600 font-semibold">
                          <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          <span>Initial Condition Diagnosed</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: AFTER */}
                    <div className="group bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-sm flex flex-col">
                      <div className="relative overflow-hidden h-64 sm:h-72">
                        <img 
                          src={item.afterImg} 
                          alt={item.afterTag} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 right-4 bg-emerald-600 text-white font-extrabold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg">
                          AFTER
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-1">
                            {item.afterTag}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {item.afterDesc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>DIF Guaranteed Workmanship</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDER VIEW */}
          {galleryViewMode === 'slider' && (
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 select-none" style={{ aspectRatio: '16/9' }}>
                <img src="/images/client_after_1.png" alt="After" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${beforeAfterSlider}%` }}>
                  <img src="/images/client_before_1.png" alt="Before"
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: `${(10000 / Math.max(beforeAfterSlider, 1))}%`, maxWidth: 'none' }} />
                </div>
                <div className="absolute inset-y-0 z-20 pointer-events-none" style={{ left: `${beforeAfterSlider}%` }}>
                  <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 shadow-xl flex items-center justify-center border-2 border-white">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">BEFORE</div>
                <div className="absolute top-3 right-3 z-10 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">AFTER</div>
                <input type="range" min="2" max="98" value={beforeAfterSlider}
                  onChange={e => setBeforeAfterSlider(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── POOL PROBLEMS ── */}
      <section id="problems" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-rose-500 uppercase mb-2">Troubleshooting</p>
              <h2 className="text-4xl font-extrabold text-slate-900 font-outfit mb-4">Common Pool Problems We Fix</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Green pool overnight? Noisy pump? Leaking water? Our certified technicians diagnose and fix all mechanical and chemical issues fast.</p>
              <div className="space-y-4">
                {[
                  { q: 'Green or Dark Algae Water', cause: 'Low chlorine, poor filtration, or incorrect pH.', fix: 'DIF shock treatment, deep vacuuming, and chemical balance correction.' },
                  { q: 'Noisy Pool Pump Motor', cause: 'Worn bearings, clogged basket, or air leak in pump lines.', fix: 'Bearing replacement, seal gasket swap, and impeller flushing.' },
                  { q: 'Loss of Pool Water (Leaks)', cause: 'Cracked pipes, hydrostatic valve issues, or damaged lining.', fix: 'Pressure testing, dye test, and structural leak repair.' },
                  { q: 'Cloudy / Dull Water', cause: 'Old sand in filter, high TDS, or improper filtration hours.', fix: 'Sand filter media replacement and clarifier dosing.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.q}</h4>
                    </div>
                    <p className="text-xs text-slate-500 pl-4"><strong className="text-slate-700">Cause:</strong> {item.cause}</p>
                    <p className="text-xs text-blue-600 pl-4 mt-1"><strong>DIF Fix:</strong> {item.fix}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200">
              <h3 className="text-2xl font-bold mb-3">Urgent Pool Problem?</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">Don't let a minor pump seal leak or algae bloom turn into expensive structural damage. Get our DIF mobile technician unit dispatched to your location.</p>
              <div className="bg-white/15 rounded-2xl p-5 mb-6">
                <div className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Fast Technician Dispatch</div>
                <div className="text-2xl font-black">+254 143 618 364</div>
                <div className="text-xs text-blue-100 mt-1">Pump repair, green pool recovery &amp; leak sealing.</div>
              </div>
              <div className="space-y-3">
                <a href="#contact"
                  className="w-full flex items-center justify-center gap-2 bg-white text-blue-700 font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all text-sm">
                  Report A Pool Problem <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://wa.me/254143618364" target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold py-3 rounded-xl border border-white/20 transition-all text-sm">
                  <MessageSquare className="w-4 h-4" /> WhatsApp Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">Get in Touch</p>
              <h2 className="text-4xl font-extrabold text-slate-900 font-outfit mb-4">Schedule Construction or Maintenance</h2>
              <p className="text-slate-500 leading-relaxed mb-8">Ready to build a new pool, jacuzzi, sauna, steam bath, or fix existing pool issues? Contact our DIF team today.</p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Customer Hotline</div>
                    <a href="tel:+254143618364" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">+254 143 618 364</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">WhatsApp</div>
                    <a href="https://wa.me/254143618364" target="_blank" rel="noreferrer" className="text-lg font-bold text-emerald-600 hover:underline">Chat on WhatsApp</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email</div>
                    <a href="mailto:difpoolscareservices@gmail.com" className="text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors">difpoolscareservices@gmail.com</a>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[['5+', 'Years Experience'], ['300+', 'Projects'], ['99.8%', 'Satisfaction']].map(([v, l]) => (
                  <div key={l} className="text-center bg-slate-50 rounded-xl py-4 border border-slate-100">
                    <div className="text-2xl font-black text-blue-600 font-outfit">{v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-bold text-slate-900 font-outfit">Request a Service Quote</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6">Select your preferred date &amp; time. We'll get back to you within 2 hours.</p>
              
              {formSubmitted && submittedData ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900 font-outfit">Request Received!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed mt-1">
                      Thank you, <strong className="font-semibold">{submittedData.fullName}</strong>! A DIF Pools representative will review your preferred schedule and confirm your booking for <strong className="font-semibold">{submittedData.preferredDate} ({submittedData.preferredTime})</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 text-left border border-emerald-100 space-y-1.5 text-xs text-slate-600">
                    <div><strong>Service:</strong> {submittedData.service}</div>
                    <div><strong>Phone:</strong> {submittedData.phone}</div>
                    <div><strong>Email:</strong> {submittedData.email}</div>
                    <div><strong>Location:</strong> {submittedData.location}</div>
                  </div>

                  <button 
                    onClick={() => { setFormSubmitted(false); reset(); }}
                    className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" noValidate>
                  
                  {/* Full Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        {...register('fullName')}
                        className={`w-full bg-white border ${errors.fullName ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition`} 
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" /> {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="your.email@gmail.com"
                        {...register('email')}
                        className={`w-full bg-white border ${errors.email ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition`} 
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" /> {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Service Required */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        placeholder="+254 143 618 364"
                        {...register('phone')}
                        className={`w-full bg-white border ${errors.phone ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition`} 
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" /> {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Service Required *</label>
                      <select 
                        {...register('service')}
                        className={`w-full bg-white border ${errors.service ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition`}
                      >
                        <option value="" disabled>— Select a service —</option>
                        <option value="Swimming Pool Construction">Swimming Pool Construction</option>
                        <option value="Maintenance and Servicing">Maintenance and Servicing</option>
                        <option value="Jacuzzi Construction Services">Jacuzzi Construction Services</option>
                        <option value="Sauna Construction Services">Sauna Construction Services</option>
                        <option value="Steam Bath Construction">Steam Bath Construction</option>
                        <option value="Fountain Construction">Fountain Construction</option>
                        <option value="General Pool Problems">General Pool Problems</option>
                      </select>
                      {errors.service && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" /> {errors.service.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Appointment Date *</label>
                      <input 
                        type="date" 
                        {...register('preferredDate')}
                        className={`w-full bg-white border ${errors.preferredDate ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition`} 
                      />
                      {errors.preferredDate && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" /> {errors.preferredDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Preferred Time Slot *</label>
                      <select 
                        {...register('preferredTime')}
                        className={`w-full bg-white border ${errors.preferredTime ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 transition`}
                      >
                        <option value="" disabled>— Select a time slot —</option>
                        <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="Evening (4:00 PM - 6:00 PM)">Evening (4:00 PM - 6:00 PM)</option>
                        <option value="Urgent / Immediate Dispatch">Urgent / Immediate Dispatch</option>
                      </select>
                      {errors.preferredTime && (
                        <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-rose-500" /> {errors.preferredTime.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location & Details */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Town / Location *</label>
                    <input 
                      type="text"
                      placeholder="e.g. Karen, Nairobi / Nyali, Mombasa"
                      {...register('location')}
                      className={`w-full bg-white border ${errors.location ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition mb-1`} 
                    />
                    {errors.location && (
                      <p className="text-[11px] text-rose-500 font-medium mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-rose-500" /> {errors.location.message}
                      </p>
                    )}

                    <div className="mt-3">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Project Details (Optional)</label>
                      <textarea 
                        rows="3" 
                        placeholder="Describe your pool dimensions, equipment issues, or project vision..."
                        {...register('details')}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none" 
                      />
                    </div>
                  </div>

                  {formError && (
                    <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-700">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={formSending}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition duration-300 text-base flex items-center justify-center gap-2">
                    {formSending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        <span>Sending Request…</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Service Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-blue-950 text-blue-100 pt-14 pb-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-blue-900">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/logo_vector.png" 
                  alt="DIF Pools" 
                  className="w-10 h-10 rounded-lg object-contain bg-white p-0.5" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                  }}
                />
                <div>
                  <div className="text-base font-bold text-white font-outfit">DIF POOLS</div>
                  <div className="text-[10px] text-blue-400 uppercase tracking-widest">Care &amp; Services</div>
                </div>
              </div>
              <p className="text-blue-300 leading-relaxed">Cleaner Pools · Safer Swimming · Total Care. Premier pool construction, jacuzzis, saunas, steam baths, and repairs.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Our Services</h5>
              <ul className="space-y-2">
                {['Swimming Pool Construction', 'Jacuzzi Construction', 'Sauna Construction', 'Steam Bath Construction', 'Maintenance & Servicing', 'General Pool Problems'].map(s => (
                  <li key={s}><a href="#services" className="text-blue-300 hover:text-white transition">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                {['#hero:Home', '#products:Products', '#gallery:Restoration', '#problems:Troubleshooting', '#contact:Contact Team'].map(item => {
                  const [href, label] = item.split(':');
                  return <li key={href}><a href={href} className="text-blue-300 hover:text-white transition">{label}</a></li>;
                })}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Contact Us</h5>
              <p className="text-blue-300 mb-3">Pool consultations, pump repairs &amp; construction quotes.</p>
              <a href="tel:+254143618364" className="text-white font-extrabold text-base block hover:text-blue-200">+254 143 618 364</a>
              <a href="mailto:difpoolscareservices@gmail.com" className="text-blue-400 text-xs block mt-1 hover:text-blue-200 break-all">difpoolscareservices@gmail.com</a>
              <div className="mt-4 flex gap-2">
                <a href="https://wa.me/254143618364" target="_blank" rel="noreferrer"
                  className="p-2.5 rounded-xl bg-blue-900 text-emerald-400 hover:bg-blue-800 transition"><MessageSquare className="w-4 h-4" /></a>
                <a href="tel:+254143618364" className="p-2.5 rounded-xl bg-blue-900 text-blue-300 hover:bg-blue-800 transition"><Phone className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-blue-400 text-[11px] gap-3">
            <div>© {new Date().getFullYear()} DIF Pools Care Services. All rights reserved.</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3">
        <a href="https://wa.me/254143618364" target="_blank" rel="noreferrer" aria-label="WhatsApp"
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ backgroundColor: '#25D366' }}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.002 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.638 4.653 1.847 6.667L2.667 29.333l6.892-1.813A13.28 13.28 0 0 0 16.002 29.333c7.364 0 13.331-5.97 13.331-13.333 0-7.362-5.967-13.333-13.331-13.333zm0 24.276a11.086 11.086 0 0 1-5.66-1.548l-.404-.242-4.09 1.073 1.093-3.977-.264-.41A11.084 11.084 0 0 1 4.943 16c0-6.099 4.96-11.055 11.059-11.055 6.097 0 11.055 4.956 11.055 11.055 0 6.098-4.958 11.054-11.055 11.054zm6.07-8.272c-.332-.167-1.965-.968-2.27-1.079-.302-.109-.523-.167-.741.167-.22.333-.853 1.079-1.045 1.301-.193.219-.386.247-.718.082-.333-.167-1.407-.519-2.681-1.655-.99-.884-1.659-1.975-1.853-2.307-.194-.332-.02-.512.146-.677.15-.148.332-.386.499-.58.166-.193.22-.332.332-.554.11-.22.055-.414-.027-.58-.083-.167-.741-1.788-1.015-2.448-.268-.642-.54-.555-.741-.565l-.631-.011a1.21 1.21 0 0 0-.878.414c-.302.332-1.149 1.123-1.149 2.738 0 1.616 1.177 3.178 1.342 3.398.166.22 2.316 3.539 5.613 4.963.784.339 1.396.541 1.873.694.787.25 1.503.215 2.069.13.631-.093 1.965-.802 2.243-1.578.277-.775.277-1.44.193-1.578-.082-.138-.302-.22-.634-.387z"/>
          </svg>
          <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: '#25D366' }} />
        </a>
        <a href="tel:+254143618364" aria-label="Call DIF Pools"
          className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-300 transition-all duration-300 hover:scale-110 active:scale-95">
          <Phone className="w-6 h-6 text-white fill-white" />
        </a>
      </div>

    </div>
  );
}
