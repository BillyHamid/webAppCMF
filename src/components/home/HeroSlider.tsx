import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/homeData';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

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

  const slide = heroSlides[current];
  const isBlue = slide.accent === 'blue';

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
          className={`min-h-[540px] md:min-h-[620px] flex items-center relative ${
            isBlue
              ? 'bg-gradient-to-br from-coris-blue via-coris-blue-dark to-coris-navy'
              : 'bg-gradient-to-br from-coris-red via-coris-red-dark to-coris-navy'
          }`}
        >
          {/* Geometric decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] border border-white/[0.04] rounded-full" />
            <div className="absolute -top-16 -right-16 w-[400px] h-[400px] border border-white/[0.06] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/10 rounded-full" />
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-white/15 rounded-full" />
            <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-white/5 rounded-full" />
            {/* Diagonal accent line */}
            <div className={`absolute -bottom-px left-0 right-0 h-1.5 ${isBlue ? 'bg-coris-red' : 'bg-coris-blue'}`} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 py-16">
            <div className="max-w-xl lg:max-w-2xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mb-5"
              >
                <span className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full border ${
                  isBlue
                    ? 'bg-white/10 border-white/15 text-white/90'
                    : 'bg-white/10 border-white/15 text-white/90'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-coris-red' : 'bg-white'}`} />
                  Coris Meso Finance
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-5 leading-[1.1] tracking-tight"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed max-w-lg"
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

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
        aria-label="Précédent"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
        aria-label="Suivant"
      >
        <ChevronRight size={20} />
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
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
