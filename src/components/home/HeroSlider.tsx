import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/homeData';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  /** Réinitialisé à chaque slide : si l’image manque ou erreur 404, retomber sur le dégradé seul. */
  const [bgImageOk, setBgImageOk] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    setBgImageOk(true);
  }, [current]);

  const slide = heroSlides[current];
  const isBlue = slide.accent === 'blue';
  const hasPhoto = Boolean(slide.image) && bgImageOk;

  const solidGradient = isBlue
    ? 'bg-gradient-to-br from-coris-blue via-coris-blue-dark to-coris-navy'
    : 'bg-gradient-to-br from-coris-red via-coris-red-dark to-coris-navy';

  return (
    <section className="relative overflow-hidden bg-coris-navy">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="min-h-[540px] md:min-h-[620px] flex items-center relative"
        >
          {/* Fond : photo + fusion couleurs Coris, ou dégradé seul */}
          {hasPhoto && slide.image ? (
            <>
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.03] contrast-[1.02]"
                onError={() => setBgImageOk(false)}
              />
              {/* Teinte marque très légère (sans multiply — les campagnes restent lisibles) */}
              <div
                className={`pointer-events-none absolute inset-0 ${
                  isBlue ? 'bg-coris-blue/18' : 'bg-coris-red/15'
                }`}
              />
              {/* Lisibilité du texte : assombrissement surtout à gauche ; droite de l’image reste claire */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-[min(92vw,46rem)] bg-gradient-to-r from-coris-navy/[0.82] via-coris-navy/40 to-transparent sm:from-coris-navy/[0.78] sm:via-coris-navy/25"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent md:from-black/15" />
              {/* Vignette bas légère (ne pas masquer le visuel) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coris-navy/35 via-transparent to-black/5" />
              {/* Liseré bas couleur d’accent */}
              <div
                className={`pointer-events-none absolute bottom-0 left-0 right-0 h-1.5 ${
                  isBlue ? 'bg-coris-red/90' : 'bg-coris-blue/90'
                }`}
              />
            </>
          ) : (
            <div className={`absolute inset-0 ${solidGradient}`}>
              <div
                className={`absolute -bottom-px left-0 right-0 h-1.5 ${isBlue ? 'bg-coris-red' : 'bg-coris-blue'}`}
              />
            </div>
          )}

          {/* Décor géométrique — plus discret sur photo pour ne pas gêner le visuel */}
          <div
            className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${hasPhoto ? 'opacity-[0.35]' : ''}`}
          >
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border border-white/[0.06] rounded-full" />
            <div className="absolute -top-16 -right-16 w-[400px] h-[400px] border border-white/[0.08] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/10 rounded-full" />
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-white/15 rounded-full" />
            <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-white/5 rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 py-16">
            <div className="max-w-xl lg:max-w-2xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mb-5"
              >
                <span
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border ${
                    isBlue
                      ? 'bg-white/10 border-white/15 text-white/90'
                      : 'bg-white/10 border-white/15 text-white/90'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-coris-red' : 'bg-white'}`} />
                  Coris Meso Finance
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-5 leading-[1.1] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed max-w-lg drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to={slide.cta.href}
                  className={`inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                    isBlue
                      ? 'bg-coris-red text-white hover:bg-coris-red-light'
                      : 'bg-white text-coris-red hover:bg-gray-50'
                  }`}
                >
                  {slide.cta.label}
                  <ArrowRight size={16} />
                </Link>
                {slide.secondaryCta && (
                  <Link
                    to={slide.secondaryCta.href}
                    className="inline-flex items-center gap-2 border-2 border-white/25 text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-white/10 transition-all"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
        aria-label="Précédent"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
        aria-label="Suivant"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-8 h-2' : 'bg-white/30 w-2 h-2 hover:bg-white/50'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
