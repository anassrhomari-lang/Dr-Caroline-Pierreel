/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Stethoscope, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  ChevronRight, 
  User, 
  Award,
  Calendar,
  Menu,
  X,
  Activity,
  Droplets,
  Baby,
  ShieldCheck,
  Wind,
  Ear,
  Heart,
  CreditCard
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow 
} from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const DOCTOLIB_URL = "https://www.doctolib.fr/orl-chirurgien-de-la-face-et-du-cou/mulhouse/caroline-pierrel";
const MAP_URL = "https://www.google.com/maps/dir//12+Rue+du+Couvent,+68100+Mulhouse,+France/";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d2685.5!2d7.335!3d47.748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47919b4a750af79f%3A0x8f7bf795d100bbbe!2s12+Rue+du+Couvent%2C+68100+Mulhouse!5e0!3m2!1sfr!2sfr!4v1712586000000!5m2!1sfr!2sfr";

const CabinetMap = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const position = { lat: 47.748748, lng: 7.3360404 };
  const [open, setOpen] = useState(false);

  if (!apiKey || apiKey === "MY_GOOGLE_MAPS_API_KEY") {
    return (
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-2xl"
        title="Carte Cabinet Dr Caroline Pierrel"
      ></iframe>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-full rounded-2xl overflow-hidden">
        <Map
          defaultCenter={position}
          defaultZoom={15}
          mapId="CABINET_MAP_ID"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background={'#0f172a'} glyphColor={'#fff'} borderColor={'#c5a059'} />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <div className="p-1">
                <p className="font-bold text-gray-900">Dr Caroline Pierrel</p>
                <p className="text-xs text-gray-600">Diaconat-Fonderie</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const galleryImages = [
    "https://lh3.googleusercontent.com/p/AF1QipPPGwDZhrj1gglw2MZJdn9R4vkaXBoGYov_tcNx=w1000",
    "https://lh3.googleusercontent.com/p/AF1QipO1BCczTdJpuRcqrANk6BRHaqjGSSUsEaUb_PP4=w1000",
    "https://lh3.googleusercontent.com/p/AF1QipMYbQk4xo0PBXa2YIqgGzpXcZFdv-_obCKNJpMl=w1000",
    "https://lh3.googleusercontent.com/p/AF1QipO06utZR3s3zhIZTNxdrgtfGq0i-EVKPFPjb0Ns=w1000",
    "https://lh3.googleusercontent.com/p/AF1QipOFc0W0VBFT6rWCSuuD5mktPFeOtBzRbEwvmVKb=w1000",
    "https://lh3.googleusercontent.com/p/AF1QipOYch8V_WzqSTrrspkAz-tdvXO4QtNwxHfDSVU_=w1000"
  ];

  return (
    <div className="min-h-screen bg-paper selection:bg-accent-gold/20 selection:text-medical-900 relative">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center shadow-lg shadow-medical-600/20"
            >
              <Stethoscope className="text-white w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-tight text-medical-900 leading-none">Dr Caroline Pierrel</h1>
              <p className="text-[9px] uppercase tracking-[0.15em] text-accent-gold font-bold mt-1">Oto-rhino-laryngologiste à Mulhouse, France</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <a href="#expertises" className="text-sm font-bold text-medical-900 hover:text-accent-gold transition-colors">Expertises</a>
            <a href="#cabinet" className="text-sm font-bold text-medical-900 hover:text-accent-gold transition-colors">Le Cabinet</a>
            <a href="#infos" className="text-sm font-bold text-medical-900 hover:text-accent-gold transition-colors">Infos Pratiques</a>
            <Button asChild variant="default" className="bg-medical-600 hover:bg-medical-900 text-white rounded-full px-6 shadow-xl shadow-medical-600/10 transition-all hover:scale-105">
              <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer">Prendre RDV</a>
            </Button>
          </nav>

          <button className="md:hidden text-medical-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-medical-900 md:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="text-white w-6 h-6" />
                </div>
                <h1 className="text-xl font-serif font-bold text-white">Dr Caroline Pierrel</h1>
              </div>
              <button className="text-white p-2" onClick={() => setIsMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {[
                { name: "Expertises", href: "#expertises" },
                { name: "Le Cabinet", href: "#cabinet" },
                { name: "Infos Pratiques", href: "#infos" }
              ].map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif text-white hover:text-accent-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Button asChild className="w-full bg-accent-gold hover:bg-white text-medical-900 py-8 text-xl rounded-2xl font-bold transition-all shadow-xl shadow-accent-gold/20">
                  <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="text-medical-900">Prendre RDV sur Doctolib</a>
                </Button>
              </motion.div>
            </nav>
            
            <div className="mt-auto pt-12 border-t border-white/10">
              <p className="text-white/40 text-sm mb-4 uppercase tracking-widest font-bold">Contact</p>
              <p className="text-white text-xl font-bold mb-2">03 89 36 75 00</p>
              <p className="text-white/60">12 Rue du Couvent, Mulhouse</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-28 pb-20 bg-paper overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-medical-100/50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-gold/10 rounded-full blur-3xl opacity-30"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge variant="outline" className="mb-6 border-accent-gold/30 text-accent-gold bg-accent-gold/5 px-4 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase">
                  Excellence & Soin
                </Badge>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-medical-900 leading-[1.1] mb-6 md:mb-8 text-balance">
                  <span className="text-accent-gold italic font-light pr-2">ORL</span> et Chirurgienne de la <span className="text-accent-gold italic font-light px-2">Face</span> et du <span className="text-accent-gold italic font-light pl-2">Cou</span>
                </h2>
                <p className="text-lg md:text-xl text-medical-900/80 mb-8 md:mb-10 leading-relaxed max-w-xl text-balance">
                  Le Dr Caroline Pierrel vous accompagne avec une expertise de pointe et une approche humaine pour toutes vos pathologies ORL et chirurgicales.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                  <Button asChild size="lg" className="bg-medical-600 hover:bg-medical-900 text-white text-lg h-14 md:h-16 px-8 md:px-10 rounded-2xl shadow-2xl shadow-medical-600/20 transition-all hover:scale-105">
                    <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer">
                      Prendre rendez-vous <ExternalLink className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-medical-200 text-medical-900 hover:bg-medical-600 hover:text-white hover:shadow-xl text-lg h-14 md:h-16 px-8 md:px-10 rounded-2xl transition-all">
                    <a href="#expertises">Expertises</a>
                  </Button>
                </div>
                
                <div className="mt-16 flex items-center gap-8 border-t border-medical-100 pt-8">
                  <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-12 h-12 rounded-full border-4 border-white bg-medical-100 flex items-center justify-center overflow-hidden shadow-lg cursor-pointer"
                      >
                        <img src={`https://picsum.photos/seed/doc${i}/100/100`} alt="Patient" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-medical-900 font-bold text-lg leading-none">1000+</span>
                    <span className="text-xs text-medical-800/60 font-bold uppercase tracking-wider mt-1">Patients accompagnés</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] aspect-[4/5] lg:aspect-auto">
                  <img 
                    src="https://media.doctolib.com/image/upload/q_auto:eco,f_auto,w_1024,h_700,c_limit/ai5tlcg6mgc13qxskbrx.jpg" 
                    alt="Dr Caroline Pierrel" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-900/40 to-transparent"></div>
                </div>
                
                {/* Floating Glass Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  whileHover={{ scale: 1.05, y: -15, rotate: -1 }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.2 },
                    rotate: { duration: 0.2 }
                  }}
                  className="absolute -bottom-6 -left-6 glass p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 hidden sm:block max-w-[260px] cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-gold/10 rounded-2xl flex items-center justify-center shrink-0 border border-accent-gold/20">
                      <Award className="text-accent-gold w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-medical-900 text-base leading-tight mb-1">Expertise Reconnue</p>
                      <p className="text-[11px] text-medical-900 leading-relaxed font-bold">Spécialiste en chirurgie thyroïdienne et cutanée de la face.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  whileHover={{ scale: 1.05, y: 15, rotate: 1 }}
                  transition={{ 
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.2 },
                    rotate: { duration: 0.2 }
                  }}
                  className="absolute top-[20%] -right-6 glass p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 hidden sm:block cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <p className="text-sm font-bold text-medical-900 font-serif">Disponibilités Doctolib</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertises" className="py-20 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-medical-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
              <Badge className="mb-4 bg-medical-50 text-medical-600 border-medical-100 px-6 py-2 rounded-full uppercase tracking-[0.2em] text-[10px] font-bold">Domaines d'intervention</Badge>
              <h2 className="text-3xl md:text-6xl font-serif text-medical-900 mb-6 md:mb-8">Une expertise chirurgicale complète</h2>
              <p className="text-lg md:text-xl text-medical-900/60 leading-relaxed font-medium">
                Le Dr Pierrel traite l'ensemble des pathologies de l'oreille, du nez et de la gorge, avec une spécialisation marquée en chirurgie cervico-faciale.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: "Chirurgie Thyroïdienne", icon: <Activity className="w-8 h-8" />, desc: "Prise en charge des pathologies de la thyroïde et des parathyroïdes." },
                { title: "Glandes Salivaires", icon: <Droplets className="w-8 h-8" />, desc: "Diagnostic et traitement chirurgical des pathologies parotidiennes et sous-maxillaires." },
                { title: "ORL Pédiatrique", icon: <Baby className="w-8 h-8" />, desc: "Soins spécialisés pour les enfants : végétations, amygdales, otites." },
                { title: "Cancers Cutanés", icon: <ShieldCheck className="w-8 h-8" />, desc: "Chirurgie reconstructrice des lésions cutanées de la face et du cou." },
                { title: "Nez & Sinus", icon: <Wind className="w-8 h-8" />, desc: "Traitement des sinusites chroniques, polypes et obstructions nasales." },
                { title: "Pathologies de l'Oreille", icon: <Ear className="w-8 h-8" />, desc: "Bilan auditif et traitement des pathologies chroniques de l'oreille." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -12, shadow: "0 40px 80px -20px rgba(0,0,0,0.1)" }}
                  className="group p-12 rounded-[3rem] bg-paper border border-medical-100 hover:border-accent-gold/40 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-0 bg-accent-gold group-hover:h-full transition-all duration-500"></div>
                  <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center mb-10 shadow-sm group-hover:bg-medical-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif text-medical-900 mb-4 group-hover:text-medical-600 transition-colors">{item.title}</h3>
                  <p className="text-medical-900/80 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="cabinet" className="py-20 md:py-32 bg-medical-900 text-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-white/10 text-accent-gold border-white/10 px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">Le Cabinet</Badge>
                <h2 className="text-3xl md:text-6xl font-serif mb-6">Un environnement moderne & serein</h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  Situé au 12 Rue du Couvent à Mulhouse, notre cabinet indépendant dispose d'équipements de dernière génération pour votre confort.
                </p>
              </div>
              <Button asChild variant="outline" className="border-accent-gold/50 text-accent-gold hover:bg-accent-gold hover:text-medical-900 rounded-full px-10 h-14 transition-all duration-300 font-bold w-full md:w-auto">
                <a href="#infos">Infos Pratiques</a>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 h-auto md:h-[800px]">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="md:col-span-2 md:row-span-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative shadow-2xl aspect-square md:aspect-auto"
              >
                <img src={galleryImages[0]} alt="Cabinet" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-900/95 via-medical-900/20 to-transparent flex items-end p-8 md:p-12">
                  <div>
                    <p className="text-accent-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Espace d'accueil</p>
                    <h3 className="text-2xl md:text-3xl font-serif text-white">Un cadre serein & moderne</h3>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="md:col-span-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative shadow-xl aspect-video md:aspect-auto"
              >
                <img src={galleryImages[1]} alt="Consultation" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-900/95 via-medical-900/20 to-transparent flex items-end p-8 md:p-10">
                  <div>
                    <p className="text-accent-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Expertise</p>
                    <h3 className="text-xl md:text-2xl font-serif text-white">Salle de consultation</h3>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative shadow-xl aspect-square md:aspect-auto hidden md:block"
              >
                <img src={galleryImages[2]} alt="Equipement" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative shadow-xl aspect-square md:aspect-auto hidden md:block"
              >
                <img src={galleryImages[3]} alt="Détail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Practical Info Section */}
        <section id="infos" className="py-20 md:py-32 bg-paper">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-start">
              <div>
                <Badge className="mb-4 bg-medical-100 text-medical-600 border-medical-200 px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">Informations</Badge>
                <h2 className="text-3xl md:text-5xl font-serif text-medical-900 mb-8 md:mb-12">Préparer votre visite</h2>
                
                <div className="space-y-8 md:space-y-10">
                  <div className="flex flex-col sm:flex-row gap-6 md:gap-8 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-medical-600 group-hover:text-white transition-all shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-medical-900 mb-2">Adresse</h3>
                      <p className="text-medical-900/80 leading-relaxed font-bold text-lg mb-4">
                        12 Rue du Couvent, 68100 Mulhouse
                      </p>
                      <div className="bg-accent-gold/5 border-l-4 border-accent-gold p-4 rounded-r-2xl mb-4">
                        <p className="text-sm font-bold text-medical-900 italic leading-snug">
                          Accès direct au RDC à gauche sans passer par l’entrée principale du bâtiment
                        </p>
                      </div>
                      <Button asChild variant="link" className="p-0 h-auto text-accent-gold font-bold hover:no-underline group/link">
                        <a href={MAP_URL} target="_blank" rel="noopener noreferrer">
                          Itinéraire <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 md:gap-8 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-medical-600 group-hover:text-white transition-all shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-medical-900 mb-2">Horaires d'ouverture</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-medical-900/70 font-bold">
                        <span>Lun - Ven</span>
                        <span className="text-medical-900">08:30 - 18:30</span>
                        <span>Sam - Dim</span>
                        <span className="text-red-500">Fermé</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 md:gap-8 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-medical-600 group-hover:text-white transition-all shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-medical-900 mb-2">Contact</h3>
                      <p className="text-medical-900/70 mb-2 font-bold text-lg">Secrétariat : <span className="text-medical-600">03 89 36 75 00</span></p>
                      <p className="text-sm text-medical-800/40 italic font-medium">Privilégiez Doctolib pour la prise de rendez-vous.</p>
                    </div>
                  </div>
                  
                  <div className="p-8 rounded-3xl bg-white border border-medical-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-medical-50 rounded-lg flex items-center justify-center">
                        <CreditCard className="text-medical-600 w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-medical-900">Honoraires & Conventionnement</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-medical-50 text-medical-900 border-medical-100 font-bold">Secteur 2</Badge>
                      <Badge variant="secondary" className="bg-medical-50 text-medical-900 border-medical-100 font-bold">Carte Vitale</Badge>
                      <Badge variant="secondary" className="bg-medical-50 text-medical-900 border-medical-100 font-bold">Chèques & Espèces</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-32">
                <div className="bg-white p-2 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-medical-100 h-[400px] md:h-[600px] overflow-hidden">
                  <CabinetMap />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-serif text-medical-900 mb-6">Questions fréquentes</h2>
              <p className="text-medical-900/70 font-bold">Tout ce qu'il faut savoir avant votre consultation.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "Quels documents apporter pour la consultation ?", a: "Veuillez apporter votre carte Vitale, votre courrier de médecin traitant (si applicable), ainsi que vos derniers examens d'imagerie (scanner, IRM) ou bilans auditifs." },
                { q: "Pratiquez-vous le tiers-payant ?", a: "Le tiers-payant est appliqué sur la part sécurité sociale pour les patients en ALD ou CMU. Pour les autres patients, le règlement s'effectue à la fin de la consultation." },
                { q: "Comment se déroule une intervention chirurgicale ?", a: "Toute intervention est précédée d'une consultation pré-opératoire détaillée où les modalités, les risques et les suites vous seront expliqués. Une consultation d'anesthésie est également obligatoire." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${i}`} className="border border-medical-100 rounded-3xl px-8 bg-white shadow-sm overflow-hidden hover:border-accent-gold/30 transition-colors">
                      <AccordionTrigger className="text-lg font-bold text-medical-900 py-8 hover:no-underline hover:text-accent-gold transition-colors text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-medical-900/80 pb-8 leading-relaxed font-medium text-lg">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-medical-600 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-medical-600/40"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-7xl font-serif text-white mb-6 md:mb-8 leading-tight">Prêt à prendre soin de votre santé ?</h2>
                <p className="text-lg md:text-2xl text-white/90 mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  Réservez votre créneau en quelques clics sur Doctolib. Simple, rapide et disponible 24h/24.
                </p>
                <Button asChild size="lg" className="bg-white text-medical-900 hover:bg-accent-gold hover:text-white text-lg md:text-xl h-16 md:h-20 px-10 md:px-12 rounded-2xl shadow-2xl transition-all hover:scale-105 font-bold w-full sm:w-auto">
                  <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer">
                    Prendre RDV sur Doctolib
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-paper border-t border-medical-100 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-medical-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="text-white w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-medical-900">Dr Caroline Pierrel</h2>
              </div>
              <p className="text-medical-900/70 max-w-sm leading-relaxed mb-8 font-medium">
                Spécialiste en Oto-Rhino-Laryngologie et Chirurgie Cervico-Faciale à Mulhouse. Excellence médicale et accompagnement personnalisé.
              </p>
              <div className="flex gap-4">
                {/* Social links placeholder */}
                <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 hover:bg-medical-600 hover:text-white transition-all cursor-pointer">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 hover:bg-medical-600 hover:text-white transition-all cursor-pointer">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-medical-900 mb-8 uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-medical-900/60 font-medium">
                <li><a href="#expertises" className="hover:text-accent-gold transition-colors">Expertises</a></li>
                <li><a href="#cabinet" className="hover:text-accent-gold transition-colors">Le Cabinet</a></li>
                <li><a href="#infos" className="hover:text-accent-gold transition-colors">Infos Pratiques</a></li>
                <li><a href={DOCTOLIB_URL} className="hover:text-accent-gold transition-colors">Prendre RDV</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-medical-100 mb-12" />
          
          <div className="flex flex-col md:row justify-between items-center gap-6 text-sm text-medical-800/40">
            <p>© {new Date().getFullYear()} Dr Caroline Pierrel. Tous droits réservés.</p>
            <p className="flex items-center gap-2">
              Design d'excellence pour la santé <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
