import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import gambar dari folder src/assets
import buibu from '../../assets/buibu_HD.png';
import moremix from '../../assets/moremix_HD.png';
import posyandu from '../../assets/ssan.jpeg';

export default function WelcomeCard({ nama, role }) {
  const displayName =
    nama || (role === 'ADMIN' ? 'Pengurus RT 10' : 'Warga RT 10');

  // =========================
  // DATA GAMBAR
  // =========================
  const slides = [
    {
      url: buibu,
      title: 'Kegiatan Gotong Royong Warga',
      desc: 'Menjaga kebersihan dan keasrian lingkungan RT 10 / RW 06 Sukaleueur Dalam.',
    },
    {
      url: moremix,
      title: 'Silaturahmi & Musyawarah RT',
      desc: 'Mewujudkan warga yang rukun, harmonis, dan penuh rasa kekeluargaan.',
    },
    {
      url: posyandu,
      title: 'Perlombaan 17 Agustus 1945',
      desc: 'Rangkaian kegiatan pesta rakyat untuk memperingati Hari Kemerdekaan Republik Indonesia.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // =========================
  // JUMLAH PERGESERAN
  // =========================
  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 3;

    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;

    return 3;
  };

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

  // =========================
  // RESPONSIVE
  // =========================
  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // =========================
  // BATAS SLIDE
  // =========================
  const maxIndex = Math.max(
    0,
    slides.length - visibleSlides
  );

  // =========================
  // AUTO SLIDE
  // =========================
  useEffect(() => {
    if (slides.length <= visibleSlides) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        }

        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [maxIndex, visibleSlides, slides.length]);

  // =========================
  // SLIDE SEBELUMNYA
  // =========================
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return maxIndex;
      }

      return prevIndex - 1;
    });
  };

  // =========================
  // SLIDE BERIKUTNYA
  // =========================
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0;
      }

      return prevIndex + 1;
    });
  };

  return (
    <div className="w-full overflow-hidden px-1">

      {/* =========================
          HEADER
      ========================= */}
      <div className="text-center pt-3 pb-5 sm:pt-5 sm:pb-7">

        {/* WELCOME */}
        <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-slate-700 flex items-center justify-center gap-2 mb-2 sm:mb-3">
          Wilujeung Sumping,{' '}

          <span className="text-orange-600 font-bold not-italic">
            {displayName}
          </span>

          <span className="text-lg sm:text-2xl">
            🙋‍♂️
          </span>
        </p>

        {/* JUDUL */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Sistem Informasi{' '}

          <span className="bg-gradient-to-r from-orange-500 to-cyan-500 bg-clip-text text-transparent">
            RT 10 / RW 06
          </span>
        </h1>

        {/* SUB JUDUL */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-800 mt-1">
          Sukaleueur Dalam
        </h2>

        {/* SLOGAN */}
        <p className="text-xs sm:text-sm md:text-base font-serif italic text-slate-500 mt-2 sm:mt-3 px-2">
          “Ngamumule Gotong Royong, Ngawangun Warga anu Sauyunan”
        </p>

      </div>


      {/* =========================
          CAROUSEL GALERI
      ========================= */}
      <div className="relative w-full max-w-6xl mx-auto">

        {/* AREA SLIDE */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleSlides)
              }%)`,
            }}
          >

            {slides.map((slide, index) => (

              <div
                key={index}
                className="flex-shrink-0 px-1.5"
                style={{
                  width: `${100 / visibleSlides}%`,
                }}
              >

                {/* =========================
                    CARD GAMBAR
                ========================= */}
                <div className="relative h-[190px] sm:h-[220px] md:h-[250px] rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm group">

                  {/* GAMBAR */}
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* =========================
                      TEXT
                  ========================= */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">

                    <span className="inline-flex bg-orange-500 text-white text-[8px] sm:text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wider mb-2">
                      Dokumentasi
                    </span>

                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight line-clamp-2">
                      {slide.title}
                    </h3>

                    <p className="hidden sm:block text-[10px] md:text-xs text-slate-200 mt-1 line-clamp-2 leading-relaxed">
                      {slide.desc}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =========================
            TOMBOL KIRI
        ========================= */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-1 sm:left-3 -translate-y-1/2 z-10
          w-8 h-8 sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-full
          bg-white/80 hover:bg-white
          text-slate-700 hover:text-orange-600
          shadow-md
          backdrop-blur-sm
          transition-all"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>


        {/* =========================
            TOMBOL KANAN
        ========================= */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-1 sm:right-3 -translate-y-1/2 z-10
          w-8 h-8 sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-full
          bg-white/80 hover:bg-white
          text-slate-700 hover:text-orange-600
          shadow-md
          backdrop-blur-sm
          transition-all"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

      </div>


      {/* =========================
          INDICATOR
      ========================= */}
      <div className="flex justify-center items-center gap-1.5 mt-4">

        {Array.from({
          length: maxIndex + 1,
        }).map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${
                index === currentIndex
                  ? 'w-6 bg-orange-500'
                  : 'w-1.5 bg-slate-300 hover:bg-orange-300'
              }
            `}
          />

        ))}

      </div>

    </div>
  );
}