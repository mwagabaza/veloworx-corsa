import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Menu,
  CheckCircle2,
  Calendar,
  Wrench,
  Bike,
  Mail,
  ExternalLink,
} from "lucide-react"

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

const BookServiceModal = ({
  isOpen,
  onClose,
  initialService = "Pro-Level Tune-Up",
}: {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}) => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [bikeType, setBikeType] = useState("Road Bike")
  const [serviceType, setServiceType] = useState(initialService)
  const [preferredDate, setPreferredDate] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (initialService) {
      setServiceType(initialService)
    }
  }, [initialService])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Format formatted mailto to matia@wagabaza.com
    const subject = encodeURIComponent(`Veloworx Service Booking Request - ${fullName}`)
    const body = encodeURIComponent(
      `VELOWORX SERVICE BOOKING REQUEST\n\n` +
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Bike Type: ${bikeType}\n` +
        `Service Requested: ${serviceType}\n` +
        `Preferred Date: ${preferredDate || "As soon as possible"}\n\n` +
        `Notes / Details:\n${notes || "None"}\n`
    )

    // Open mailto link
    window.location.href = `mailto:matia@wagabaza.com?subject=${subject}&body=${body}`

    // Show success confirmation screen
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFullName("")
    setEmail("")
    setPhone("")
    setNotes("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-ink border border-paper/20 p-6 md:p-10 rounded-sm shadow-2xl my-auto text-paper"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-paper/60 hover:text-accent transition-colors p-2"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {submitted ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-accent/20 border border-accent rounded-full flex items-center justify-center mx-auto mb-6 text-accent"
              >
                <CheckCircle2 size={40} />
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl uppercase mb-4">
                Booking Request Sent!
              </h3>
              <p className="font-sans text-paper/70 text-base max-w-md mx-auto mb-6 leading-relaxed">
                Thank you <span className="text-paper font-semibold">{fullName}</span>. Your service booking details have been prepared for <span className="text-accent">matia@wagabaza.com</span>. We will review your request and confirm your appointment shortly.
              </p>
              <div className="bg-paper/5 border border-paper/10 p-4 rounded text-left font-sans text-xs text-paper/70 space-y-1 mb-8">
                <p><strong className="text-paper">Service:</strong> {serviceType}</p>
                <p><strong className="text-paper">Bike Type:</strong> {bikeType}</p>
                <p><strong className="text-paper">Contact:</strong> {email} | {phone}</p>
              </div>
              <button
                onClick={handleReset}
                className="magnetic-btn px-8 py-3 mx-auto"
              >
                <span>Done</span>
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <span className="text-accent text-xs font-sans uppercase tracking-widest block mb-2">
                  Atelier Service Department
                </span>
                <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tight">
                  Book a Service
                </h3>
                <p className="font-sans text-paper/60 text-sm mt-2">
                  Schedule a pro-tune, custom build, or diagnostics appointment at our Santa Monica & Venice atelier.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-paper/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-paper/5 border border-paper/20 rounded px-4 py-3 text-paper focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-paper/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-paper/5 border border-paper/20 rounded px-4 py-3 text-paper focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-paper/70 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(310) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-paper/5 border border-paper/20 rounded px-4 py-3 text-paper focus:outline-none focus:border-accent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-paper/70 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-paper/5 border border-paper/20 rounded px-4 py-3 text-paper focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-paper/70 mb-2">
                      Bike Type
                    </label>
                    <select
                      value={bikeType}
                      onChange={(e) => setBikeType(e.target.value)}
                      className="w-full bg-paper/10 border border-paper/20 rounded px-4 py-3 text-paper focus:outline-none focus:border-accent text-sm"
                    >
                      <option value="Road Bike" className="bg-ink text-paper">Road Bike</option>
                      <option value="Gravel Bike" className="bg-ink text-paper">Gravel Bike</option>
                      <option value="Mountain Bike" className="bg-ink text-paper">Mountain Bike</option>
                      <option value="E-Bike" className="bg-ink text-paper">E-Bike</option>
                      <option value="Beach Cruiser" className="bg-ink text-paper">Beach Cruiser</option>
                      <option value="Vintage Restoration" className="bg-ink text-paper">Vintage Restoration</option>
                      <option value="Custom Build" className="bg-ink text-paper">Custom Build</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-paper/70 mb-2">
                      Service Required
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-paper/10 border border-paper/20 rounded px-4 py-3 text-paper focus:outline-none focus:border-accent text-sm"
                    >
                      <option value="Pro-Level Tune-Up" className="bg-ink text-paper">Pro-Level Tune-Up</option>
                      <option value="Custom Wheel Building" className="bg-ink text-paper">Custom Wheel Building</option>
                      <option value="Vintage Component Sourcing" className="bg-ink text-paper">Vintage Component Sourcing</option>
                      <option value="E-Bike Diagnostics" className="bg-ink text-paper">E-Bike Diagnostics</option>
                      <option value="General Overhaul" className="bg-ink text-paper">General Overhaul</option>
                      <option value="Custom Build Consultation" className="bg-ink text-paper">Custom Build Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-paper/70 mb-2">
                    Notes / Bike Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any specific issues, components, or custom requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-paper/5 border border-paper/20 rounded px-4 py-3 text-paper focus:outline-none focus:border-accent text-sm resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-paper/10">
                  <span className="text-xs text-paper/50 font-sans">
                    Target: <span className="text-paper/80">matia@wagabaza.com</span>
                  </span>
                  <button type="submit" className="magnetic-btn px-8 py-3.5 w-full sm:w-auto">
                    <span>Submit Booking Request</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const NavBar = ({ onOpenBookService }: { onOpenBookService: (service?: string) => void }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-ink/90 backdrop-blur-md py-4 border-b border-paper/10" : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a
            href="#"
            className="font-display text-2xl md:text-3xl tracking-widest uppercase text-paper mix-blend-difference z-10"
          >
            Veloworx
          </a>

          <div className="hidden md:flex gap-8 font-sans text-xs uppercase tracking-widest text-paper/80">
            <a href="#bikes" className="hover:text-accent transition-colors">
              Bikes
            </a>
            <a href="#service" className="hover:text-accent transition-colors">
              Service
            </a>
            <a href="#heritage" className="hover:text-accent transition-colors">
              Heritage
            </a>
            <a href="#gallery" className="hover:text-accent transition-colors">
              Gallery
            </a>
            <a href="#visit" className="hover:text-accent transition-colors">
              Visit Us
            </a>
          </div>

          <button
            onClick={() => onOpenBookService()}
            className="magnetic-btn px-6 py-3 hidden md:flex items-center gap-2 cursor-pointer"
          >
            <span>Book Service</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-paper p-2 hover:text-accent transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col justify-center items-center gap-8 px-6 text-center md:hidden"
          >
            <a
              href="#bikes"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl text-paper hover:text-accent transition-colors"
            >
              Bikes
            </a>
            <a
              href="#service"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl text-paper hover:text-accent transition-colors"
            >
              Service
            </a>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl text-paper hover:text-accent transition-colors"
            >
              Heritage
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl text-paper hover:text-accent transition-colors"
            >
              Gallery
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-3xl text-paper hover:text-accent transition-colors"
            >
              Visit Us
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenBookService()
              }}
              className="magnetic-btn px-8 py-4 mt-4"
            >
              <span>Book Service</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const heroPhotos = [
  { src: "/assets/cyclist-in-motion.jpg", alt: "Cyclists in Motion", tag: "PELOTON SPEED" },
  { src: "/assets/venti-views-Mn9RPCNGSSI-unsplash.jpg", alt: "Venice Promenade Ride", tag: "BEACH PATH" },
  { src: "/assets/elisa-borghi-KIdwxVKu7dw-unsplash.jpg", alt: "Pro Carbon Road Build", tag: "CUSTOM ROAD" },
  { src: "/assets/jan-kopriva-0MrV3XwiYEE-unsplash.jpg", alt: "Santa Monica Canyon Gravel", tag: "GRAVEL EXPLORER" },
  { src: "/assets/jens-de-decker-W2vKVr4C3Xc-unsplash.jpg", alt: "Master Mechanic & Service", tag: "ATELIER CRAFT" },
  { src: "/assets/lalo-zepeda-IHiBr7jUu-8-unsplash.jpg", alt: "Venice Surf & Cruise", tag: "BEACH & SURF", objectPos: "object-[center_80%]" },
  { src: "/assets/linda-pomerantz-zhang-Ab6SE0LSNGE-unsplash.jpg", alt: "Criterium Race Motion", tag: "HIGH SPEED" },
  { src: "/assets/mike-von-ZtqK2T7LJis-unsplash.jpg", alt: "Custom Track & Fixed-Gear", tag: "URBAN FIXIE", objectPos: "object-[center_80%]" },
  { src: "/assets/rachel-martin-YZEGtY07jG0-unsplash.jpg", alt: "Topanga Mountain Overlook", tag: "TRAIL SUMMIT", objectPos: "object-[center_80%]" },
  { src: "/assets/rafael-garcin-o8vKaWK_k4g-unsplash.jpg", alt: "Pacific Coast Highway Ride", tag: "COASTAL PACIFIC", objectPos: "object-[center_80%]" },
  { src: "/assets/rafael-garcin-wgELNcDK49Q-unsplash.jpg", alt: "Santa Monica Pier Ride", tag: "PIER SILHOUETTE", objectPos: "object-[center_80%]" },
  { src: "/assets/raul-de-los-santos-hwdbmbL2Duo-unsplash.jpg", alt: "Santa Monica Palm Avenue", tag: "PALM PROMENADE", objectPos: "object-[center_80%]" },
  { src: "/assets/tim-foster-jhovC0t8f-8-unsplash.jpg", alt: "Off-Road Trail Shredding", tag: "MOUNTAIN" },
  { src: "/assets/travis-yewell-43ScFMWx2xY-unsplash.jpg", alt: "Venice Skate & Bike Culture", tag: "BEACH CULTURE", objectPos: "object-[center_80%]" },
  { src: "/assets/venti-views-D21SWrnHof8-unsplash.jpg", alt: "City Lights Night Sprint", tag: "NIGHT RIDE" },
  { src: "/assets/venti-views-EEZRG2acqgQ-unsplash.jpg", alt: "Pro Team Rider & Kit", tag: "PRO ATHLETE" },
  { src: "/assets/venti-views-S-tyJJKWCyU-unsplash.jpg", alt: "Golden Hour Hill Climb", tag: "SUNSET CLIMB" },
  { src: "/assets/venti-views-tA43SkziQYI-unsplash.jpg", alt: "Pro Peloton Cornering", tag: "PELOTON" },
]

const Hero = ({ onOpenBookService }: { onOpenBookService: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 400])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroPhotos.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroPhotos.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length)

  const currentPhoto = heroPhotos[currentIndex]

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-ink flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slideshow with Crossfade & Ken Burns Zoom */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentPhoto.src}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: 6, ease: "easeOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className={`w-full h-full object-cover ${currentPhoto.objectPos || ''}`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Gradient Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60 z-10" />
        <div className="absolute inset-0 bg-radial-vignette z-10 opacity-60" />
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-paper/20 bg-ink/40 backdrop-blur-md text-accent text-xs font-sans uppercase tracking-widest mb-6">
            Venice & Santa Monica, CA
          </span>
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-none text-paper tracking-tighter drop-shadow-2xl font-display uppercase">
            VELOWORX
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-base sm:text-lg md:text-xl text-paper/80 max-w-2xl mt-6 font-light tracking-wide uppercase"
        >
          Boutique Bikeshop & Precision Tuning Atelier
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <button
            onClick={onOpenBookService}
            className="magnetic-btn px-8 py-4 flex items-center gap-2 cursor-pointer"
          >
            <span>Book Service Appointment</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Manual Slide Navigation Controls */}
      <div className="absolute left-6 right-6 md:left-12 md:right-12 top-1/2 -translate-y-1/2 flex justify-between items-center z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-3 rounded-full border border-paper/20 bg-ink/40 backdrop-blur-md text-paper/70 hover:text-accent hover:border-accent hover:bg-ink/80 transition-all duration-300 group cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-3 rounded-full border border-paper/20 bg-ink/40 backdrop-blur-md text-paper/70 hover:text-accent hover:border-accent hover:bg-ink/80 transition-all duration-300 group cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Bar: Slide Counter, Caption & Progress Indicator */}
      <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 z-30 flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
        {/* Caption & Tag */}
        <div className="text-left backdrop-blur-md bg-ink/30 px-4 py-2 rounded border border-paper/10 pointer-events-auto">
          <span className="text-accent text-[10px] font-sans uppercase tracking-widest block">
            {currentPhoto.tag}
          </span>
          <span className="text-paper/90 text-sm font-sans tracking-wide">
            {currentPhoto.alt}
          </span>
        </div>

        {/* Slide Counter & Progress Bars */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className="flex items-center gap-3 text-xs font-sans tracking-widest text-paper/70">
            <span className="text-accent font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-paper/30">/</span>
            <span>{String(heroPhotos.length).padStart(2, "0")}</span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-48 h-1 bg-paper/20 rounded-full overflow-hidden relative">
            <motion.div
              key={currentIndex + (isPaused ? "-paused" : "-active")}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "100%" : "100%" }}
              transition={{
                duration: isPaused ? 0 : 4.5,
                ease: "linear",
              }}
              className={`h-full ${isPaused ? "bg-paper/50" : "bg-accent"}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-accent text-white py-4 flex whitespace-nowrap thin-rule">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-16 text-xl md:text-2xl"
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <span>PRO-TEAM EXPERIENCE</span>
            <span>•</span>
            <span>CUSTOM BUILDS</span>
            <span>•</span>
            <span>VINTAGE RESTORATION</span>
            <span>•</span>
            <span>PRECISION TUNING</span>
            <span>•</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

const Ethos = () => (
  <section className="py-32 md:py-48 container mx-auto px-6 md:px-12">
    <div className="grid md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-5 md:col-start-2">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl text-paper leading-tight mb-8">
            WHERE CRAFT <br />
            <span className="text-accent italic">MEETS</span> CULTURE
          </h2>
          <div className="w-12 h-[2px] bg-accent mb-8"></div>
        </FadeIn>
      </div>
      <div className="md:col-span-5">
        <FadeIn delay={0.2}>
          <p className="text-paper/70 font-sans text-lg leading-relaxed mb-6">
            Veloworx is a family-run, owner-operated boutique where deep
            expertise meets neighborhood warmth. We believe a bicycle is more
            than a machine; it's an extension of the rider.
          </p>
          <p className="text-paper/70 font-sans text-lg leading-relaxed">
            From high-end road and gravel machines to characterful beach
            cruisers, we curate, build, and service with the meticulous
            precision of a fine watch atelier and the relentless passion of a
            pro peloton.
          </p>
        </FadeIn>
      </div>
    </div>
  </section>
)

const BikesRange = () => {
  const categories = [
    {
      title: "Road",
      desc: "Precision speed machines",
      img: "/assets/venti-views-tA43SkziQYI-unsplash.jpg",
    },
    {
      title: "Gravel",
      desc: "For the roads less traveled",
      img: "/assets/venti-views-S-tyJJKWCyU-unsplash.jpg",
    },
    {
      title: "Mountain",
      desc: "Conquer the trails",
      img: "/assets/tim-foster-jhovC0t8f-8-unsplash.jpg",
    },
    {
      title: "E-Bikes",
      desc: "Electrified commutes & joyrides",
      img: "/assets/ebike-commuter.jpg",
    },
    {
      title: "Cruisers",
      desc: "Classic beach cruisers & vintage rides",
      img: "/assets/lalo-zepeda-IHiBr7jUu-8-unsplash.jpg",
      objectPos: "object-[center_80%]",
    },
  ]

  const handleCardClick = () => {
    const galleryElem = document.getElementById("gallery")
    if (galleryElem) {
      galleryElem.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="bikes" className="py-24 bg-paper text-ink">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex justify-between items-end mb-16 border-b border-ink/20 pb-8">
            <h2 className="text-5xl md:text-7xl">THE MACHINES</h2>
            <a
              href="#gallery"
              className="group flex items-center gap-2 font-display uppercase tracking-widest text-sm hover:text-accent transition-colors"
            >
              <span>View Showcase</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.1}>
              <div
                onClick={handleCardClick}
                className="group relative aspect-[4/3] overflow-hidden bg-ink cursor-pointer"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className={`w-full h-full object-cover ${cat.objectPos || 'object-center'} opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out grayscale group-hover:grayscale-0`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-paper text-4xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {cat.title}
                  </h3>
                  <p className="text-paper/70 font-sans uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

const Service = ({ onOpenBookService }: { onOpenBookService: (service?: string) => void }) => (
  <section id="service" className="py-32 container mx-auto px-6 md:px-12">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <FadeIn>
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src="/assets/Image-mech-bike.jpg"
            alt="Mechanic working on bike"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 w-16 h-16 rounded-full border border-paper/30 flex items-center justify-center backdrop-blur-sm">
            <span className="font-display text-2xl text-accent">01</span>
          </div>
        </div>
      </FadeIn>
      <div>
        <FadeIn>
          <h4 className="text-accent uppercase tracking-widest text-sm mb-4 font-sans">
            The Workshop
          </h4>
          <h2 className="text-4xl md:text-6xl text-paper mb-8">
            PRECISION ENGINEERING
          </h2>
          <p className="text-paper/70 font-sans text-lg mb-8 leading-relaxed">
            Our service department is the heart of Veloworx. Led by master
            mechanics, we approach every tune-up, custom build, and vintage
            restoration with uncompromising standards. We don't just fix bikes;
            we elevate them.
          </p>
          <ul className="space-y-4 mb-12">
            {[
              "Pro-Level Tune-Ups",
              "Custom Wheel Building",
              "Vintage Component Sourcing",
              "E-Bike Diagnostics",
            ].map((item) => (
              <li
                key={item}
                onClick={() => onOpenBookService(item)}
                className="flex items-center justify-between text-paper/90 font-sans text-sm uppercase tracking-wide border-b border-paper/10 pb-4 cursor-pointer group hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                  {item}
                </div>
                <span className="text-xs text-paper/40 group-hover:text-accent font-mono">Book →</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onOpenBookService()}
            className="magnetic-btn px-8 py-4 cursor-pointer"
          >
            <span>Book a Service</span>
          </button>
        </FadeIn>
      </div>
    </div>
  </section>
)

const Heritage = () => (
  <section id="heritage" className="py-32 bg-accent text-ink overflow-hidden">
    <div className="container mx-auto px-6 md:px-12 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[30rem] text-ink/5 font-display leading-none select-none z-0 mix-blend-multiply">
        RACE
      </div>
      <div className="grid md:grid-cols-12 relative z-10">
        <div className="md:col-span-8 md:col-start-3 text-center">
          <FadeIn>
            <div className="w-16 h-16 mx-auto border-2 border-ink rounded-full flex items-center justify-center mb-8">
              <span className="font-display text-3xl mt-1">S</span>
            </div>
            <h2 className="text-5xl md:text-7xl mb-8 uppercase">
              Decades of Pedigree
            </h2>
            <p className="font-sans text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
              Founded by Sukeun, whose decades of knowledge span from working
              alongside professional racing teams to guiding first-time riders.
              It's elite expertise delivered with genuine, no-hard-sell
              neighborhood warmth. Two shop dogs included.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
)

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<{ src: string; title: string; tag: string; objectPos?: string } | null>(null)

  const galleryItems = [
    { src: "/assets/lalo-zepeda-IHiBr7jUu-8-unsplash.jpg", title: "Venice Surf & Cruise", tag: "BEACH & SURF", objectPos: "object-[center_80%]" },
    { src: "/assets/mike-von-ZtqK2T7LJis-unsplash.jpg", title: "Custom Track & Fixed-Gear", tag: "URBAN FIXIE", objectPos: "object-[center_80%]" },
    { src: "/assets/rachel-martin-YZEGtY07jG0-unsplash.jpg", title: "Topanga Mountain Overlook", tag: "TRAIL SUMMIT", objectPos: "object-[center_80%]" },
    { src: "/assets/rafael-garcin-o8vKaWK_k4g-unsplash.jpg", title: "Pacific Coast Highway Ride", tag: "COASTAL PACIFIC", objectPos: "object-[center_80%]" },
    { src: "/assets/rafael-garcin-wgELNcDK49Q-unsplash.jpg", title: "Santa Monica Pier Ride", tag: "PIER SILHOUETTE", objectPos: "object-[center_80%]" },
    { src: "/assets/raul-de-los-santos-hwdbmbL2Duo-unsplash.jpg", title: "Santa Monica Palm Avenue", tag: "PALM PROMENADE", objectPos: "object-[center_80%]" },
    { src: "/assets/travis-yewell-43ScFMWx2xY-unsplash.jpg", title: "Venice Skate & Bike Culture", tag: "BEACH CULTURE", objectPos: "object-[center_80%]" },
    { src: "/assets/linda-pomerantz-zhang-Ab6SE0LSNGE-unsplash.jpg", title: "Criterium Race Motion", tag: "HIGH SPEED" },
    { src: "/assets/venti-views-D21SWrnHof8-unsplash.jpg", title: "City Lights Night Sprint", tag: "NIGHT RIDE" },
    { src: "/assets/venti-views-EEZRG2acqgQ-unsplash.jpg", title: "Pro Team Rider & Kit", tag: "PRO ATHLETE" },
    { src: "/assets/venti-views-S-tyJJKWCyU-unsplash.jpg", title: "Golden Hour Hill Climb", tag: "SUNSET CLIMB" },
    { src: "/assets/venti-views-tA43SkziQYI-unsplash.jpg", title: "Pro Peloton Cornering", tag: "PELOTON" },
    { src: "/assets/ebike-commuter.jpg", title: "Santa Monica Pier E-Commuter", tag: "E-BIKES" },
    { src: "/assets/derailleur-detail.jpg", title: "Precision Drivetrain Tuning", tag: "WORKSHOP" },
  ]

  return (
    <section id="gallery" className="py-32 bg-ink border-t border-paper/10">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h4 className="text-accent uppercase tracking-widest text-sm mb-3 font-sans">
                Atelier Showcase
              </h4>
              <h2 className="text-4xl md:text-6xl text-paper">
                CULTURE & CRAFT IN MOTION
              </h2>
            </div>
            <p className="text-paper/60 font-sans max-w-md text-sm">
              Explore moments from our workshop, custom builds, and rides along the Southern California coast.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <FadeIn key={item.title + index} delay={(index % 4) * 0.1}>
              <div
                onClick={() => setSelectedImg(item)}
                className="group relative aspect-[4/5] overflow-hidden bg-ink/50 cursor-pointer border border-paper/10 rounded-sm"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${item.objectPos || 'object-center'} grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-accent text-[10px] font-sans uppercase tracking-widest mb-1">
                    {item.tag}
                  </span>
                  <div className="flex justify-between items-center">
                    <h3 className="text-paper font-display text-lg tracking-wide">
                      {item.title}
                    </h3>
                    <Maximize2 size={16} className="text-paper/60 group-hover:text-accent group-hover:scale-110 transition-all" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-3 text-paper/70 hover:text-accent transition-colors z-10 cursor-pointer"
              aria-label="Close image preview"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-sm border border-paper/20"
            >
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
              <div className="bg-ink p-6 border-t border-paper/10 flex justify-between items-center">
                <div>
                  <span className="text-accent text-xs font-sans uppercase tracking-widest block mb-1">
                    {selectedImg.tag}
                  </span>
                  <h3 className="text-paper font-display text-2xl">
                    {selectedImg.title}
                  </h3>
                </div>
                <span className="text-paper/40 text-xs uppercase tracking-widest font-sans">
                  Veloworx Atelier
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

const Brands = () => {
  const brands = [
    "SPECIALIZED",
    "TREK",
    "CERVELO",
    "PINARELLO",
    "SRAM",
    "SHIMANO",
    "RAPHA",
  ]

  return (
    <section className="py-24 border-b border-paper/10">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <FadeIn>
          <h4 className="text-center text-paper/50 font-sans uppercase tracking-widest text-xs">
            Premium Partners
          </h4>
        </FadeIn>
      </div>
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 px-6">
        {brands.map((brand, i) => (
          <FadeIn key={brand} delay={i * 0.1}>
            <span className="font-display text-2xl md:text-4xl text-paper uppercase tracking-wider">
              {brand}
            </span>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

const Footer = ({ onOpenBookService }: { onOpenBookService: () => void }) => (
  <footer id="visit" className="pt-32 pb-12 bg-ink border-t border-paper/20">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-4 gap-12 mb-24">
        <div className="md:col-span-2">
          <h2 className="text-6xl md:text-8xl text-paper mb-6">VELOWORX</h2>
          <p className="text-paper/50 font-sans max-w-md mb-8">
            The Westside's premier destination for cycling culture, craft, and
            community.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-paper/20 flex items-center justify-center text-paper hover:bg-accent hover:border-accent hover:text-white transition-all"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-paper/20 flex items-center justify-center text-paper hover:bg-accent hover:border-accent hover:text-white transition-all"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl text-paper mb-6 uppercase tracking-wide">
            Visit Us
          </h4>
          <ul className="space-y-4 font-sans text-sm text-paper/70">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-accent shrink-0" />
              <a
                href="https://maps.google.com/?q=3106+Lincoln+Blvd,+Santa+Monica,+CA+90405"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                3106 Lincoln Blvd
                <br />
                Santa Monica, CA 90405
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-accent shrink-0" />
              <a href="tel:3105849797" className="hover:text-accent transition-colors">
                310-584-9797
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl text-paper mb-6 uppercase tracking-wide">
            Hours
          </h4>
          <ul className="space-y-2 font-sans text-sm text-paper/70">
            <li className="flex justify-between border-b border-paper/10 pb-2">
              <span>Tue &ndash; Sun</span>
              <span>11am &ndash; 5pm</span>
            </li>
            <li className="flex justify-between pt-2 text-paper/40">
              <span>Monday</span>
              <span>Closed</span>
            </li>
          </ul>
          <button
            onClick={onOpenBookService}
            className="magnetic-btn px-6 py-2.5 mt-6 text-xs"
          >
            <span>Book Service</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-paper/10 text-paper/40 font-sans text-xs uppercase tracking-widest gap-4 text-center">
        <p>&copy; {new Date().getFullYear()} Veloworx. All rights reserved.</p>
        <p>Est. Santa Monica, California</p>
      </div>
    </div>
  </footer>
)

export default function App() {
  const [isBookServiceOpen, setIsBookServiceOpen] = useState(false)
  const [initialService, setInitialService] = useState<string>("Pro-Level Tune-Up")

  const handleOpenBookService = (service?: string) => {
    if (service) {
      setInitialService(service)
    }
    setIsBookServiceOpen(true)
  }

  return (
    <div className="bg-ink min-h-screen text-paper font-sans">
      <NavBar onOpenBookService={handleOpenBookService} />
      <Hero onOpenBookService={() => handleOpenBookService()} />
      <Marquee />
      <Ethos />
      <BikesRange />
      <Service onOpenBookService={handleOpenBookService} />
      <Heritage />
      <Gallery />
      <Brands />
      <Footer onOpenBookService={() => handleOpenBookService()} />

      {/* Book Service Modal */}
      <BookServiceModal
        isOpen={isBookServiceOpen}
        onClose={() => setIsBookServiceOpen(false)}
        initialService={initialService}
      />
    </div>
  )
}
